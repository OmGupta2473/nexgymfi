import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckInDto } from './dto/check-in.dto';
import { AttendanceSource, MembershipStatus } from '../../generated/prisma/enums';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);

  constructor(private readonly prisma: PrismaService) {}

  async autoCheckIn(data: { deviceToken: string; gymSlug: string; fingerprint: string }) {
    const gym = await this.prisma.gym.findUnique({
      where: { slug: data.gymSlug },
    });
    if (!gym) throw new BadRequestException('Invalid gym code');

    const device = await this.prisma.memberDevice.findFirst({
      where: {
        deviceToken: data.deviceToken,
        gymId: gym.id,
        isActive: true,
      },
      include: { member: true },
    });

    if (!device) throw new BadRequestException('DEVICE_NOT_LINKED');

    await this.prisma.memberDevice.update({
      where: { id: device.id },
      data: {
        lastSeenAt: new Date(),
        fingerprint: data.fingerprint,
      },
    });

    return this.processCheckInLogic(gym.id, device.memberId, AttendanceSource.QR_AUTO);
  }

  async registerDevice(data: {
    memberId: string;
    gymSlug: string;
    deviceToken: string;
    fingerprint: string;
    label: string;
  }) {
    const gym = await this.prisma.gym.findUnique({ where: { slug: data.gymSlug } });
    if (!gym) throw new BadRequestException('Gym not found');

    const activeDevices = await this.prisma.memberDevice.count({
      where: { memberId: data.memberId, gymId: gym.id, isActive: true },
    });

    if (activeDevices >= 2) {
      const oldest = await this.prisma.memberDevice.findFirst({
        where: { memberId: data.memberId, gymId: gym.id, isActive: true },
        orderBy: { createdAt: 'asc' },
      });
      if (oldest) {
        await this.prisma.memberDevice.update({ where: { id: oldest.id }, data: { isActive: false } });
      }
    }

    return this.prisma.memberDevice.create({
      data: {
        gymId: gym.id,
        memberId: data.memberId,
        deviceToken: data.deviceToken,
        fingerprint: data.fingerprint,
        label: data.label,
        lastSeenAt: new Date(),
      },
    });
  }

  private async processCheckInLogic(gymId: string, memberId: string, source: AttendanceSource) {
    const membership = await this.prisma.membership.findFirst({
      where: {
        memberId,
        gymId,
        status: MembershipStatus.ACTIVE,
        endDate: { gte: new Date() },
      },
    });

    if (!membership) throw new BadRequestException('MEMBERSHIP_INACTIVE_OR_EXPIRED');

    // Fix: Daily deduplication now uses IST Midnight (Patna/India Time)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    istNow.setHours(0, 0, 0, 0);
    const todayStartInIST = new Date(istNow.getTime() - istOffset);

    const alreadyCheckedIn = await this.prisma.attendance.findFirst({
      where: { memberId, gymId, checkedInAt: { gte: todayStartInIST } },
    });

    if (alreadyCheckedIn) throw new BadRequestException('ALREADY_CHECKED_IN');

    // Note: Manual AuditLog write removed to prevent FK Violations with system UUIDs.
    // The Attendance record itself serves as the check-in audit trail.
    return this.prisma.attendance.create({
      data: { gymId, memberId, source },
      include: { member: true },
    });
  }

  async checkIn(gymId: string, data: CheckInDto) {
    return this.processCheckInLogic(gymId, data.memberId, AttendanceSource.ADMIN);
  }

  async findToday(gymId: string) {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    istNow.setHours(0, 0, 0, 0);
    const todayStartInIST = new Date(istNow.getTime() - istOffset);

    return this.prisma.attendance.findMany({
      where: { gymId, checkedInAt: { gte: todayStartInIST } },
      include: { member: true },
      orderBy: { checkedInAt: 'desc' },
    });
  }

  async findMemberAttendance(gymId: string, memberId: string) {
    return this.prisma.attendance.findMany({
      where: { gymId, memberId },
      orderBy: { checkedInAt: 'desc' },
    });
  }

  async getPublicMemberList(gymSlug: string) {
    return this.prisma.member.findMany({
      where: { gym: { slug: gymSlug }, deletedAt: null },
      select: { id: true, name: true, photoUrl: true },
    });
  }
}