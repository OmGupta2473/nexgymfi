import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CheckInDto } from './dto/check-in.dto';

import {
  AttendanceSource,
  MembershipStatus,
} from '../../generated/prisma/enums';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async checkIn(
    gymId: string,
    data: CheckInDto,
  ) {
    const member =
      await this.prisma.member.findFirst({
        where: {
          id: data.memberId,
          gymId,
          deletedAt: null,
        },
      });

    if (!member) {
      throw new BadRequestException(
        'Member not found',
      );
    }

    const membership =
      await this.prisma.membership.findFirst({
        where: {
          gymId,
          memberId: data.memberId,
          status: MembershipStatus.ACTIVE,
        },
      });

    if (!membership) {
      throw new BadRequestException(
        'Member has no active membership',
      );
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const alreadyCheckedIn =
      await this.prisma.attendance.findFirst({
        where: {
          gymId,
          memberId: data.memberId,
          checkedInAt: {
            gte: today,
          },
        },
      });

    if (alreadyCheckedIn) {
      throw new BadRequestException(
        'Already checked in today',
      );
    }

    return this.prisma.attendance.create({
      data: {
        gymId,
        memberId: data.memberId,
        source: AttendanceSource.ADMIN,
      },
    });
  }

  async findToday(gymId: string) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return this.prisma.attendance.findMany({
      where: {
        gymId,
        checkedInAt: {
          gte: today,
        },
      },
      include: {
        member: true,
      },
      orderBy: {
        checkedInAt: 'desc',
      },
    });
  }

  async findMemberAttendance(
    gymId: string,
    memberId: string,
  ) {
    return this.prisma.attendance.findMany({
      where: {
        gymId,
        memberId,
      },
      orderBy: {
        checkedInAt: 'desc',
      },
    });
  }
}