import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { MembershipStatus } from '../../generated/prisma/enums';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new membership for a member.
   */
  async create(gymId: string, userId: string, data: CreateMembershipDto) {
    const member = await this.prisma.member.findFirst({
      where: {
        id: data.memberId,
        gymId,
        deletedAt: null,
      },
    });

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    const plan = await this.prisma.plan.findFirst({
      where: {
        id: data.planId,
        gymId,
        archivedAt: null,
      },
    });

    if (!plan) {
      throw new BadRequestException('Plan not found');
    }

    const activeMembership = await this.prisma.membership.findFirst({
      where: {
        gymId,
        memberId: data.memberId,
        status: MembershipStatus.ACTIVE,
      },
    });

    if (activeMembership) {
      throw new BadRequestException('Member already has an active membership');
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationDays);

    return this.prisma.membership.create({
      data: {
        gymId,
        memberId: data.memberId,
        planId: data.planId,
        startDate,
        endDate,
        status: MembershipStatus.ACTIVE,
        createdById: userId,
      },
    });
  }

  async findAll(gymId: string) {
    return this.prisma.membership.findMany({
      where: {
        gymId,
      },
      include: {
        member: true,
        plan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Freeze a membership. 
   * We record the timestamp of the freeze.
   */
  async freeze(gymId: string, membershipId: string) {
    const membership = await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
        status: MembershipStatus.ACTIVE,
      },
    });

    if (!membership) {
      throw new BadRequestException('Active membership not found');
    }

    return this.prisma.membership.update({
      where: { id: membershipId },
      data: {
        status: MembershipStatus.FROZEN,
        frozenAt: new Date(), // Mark the start of the freeze
      },
    });
  }

  /**
   * Resume a membership.
   * Logic: Calculate the ACTUAL time elapsed since frozenAt and extend the endDate.
   */
  async resume(gymId: string, membershipId: string) {
    const membership = await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
        status: MembershipStatus.FROZEN,
      },
    });

    if (!membership || !membership.frozenAt) {
      throw new BadRequestException('Membership is not frozen or already active');
    }

    // 1. Calculate actual days spent in frozen state
    const frozenMs = Date.now() - membership.frozenAt.getTime();
    const actualDaysFrozen = Math.ceil(frozenMs / (1000 * 60 * 60 * 24));

    // 2. Extend the original end date by the actual days frozen
    const newEndDate = new Date(membership.endDate);
    newEndDate.setDate(newEndDate.getDate() + actualDaysFrozen);

    // 3. Update the record
    return this.prisma.membership.update({
      where: { id: membershipId },
      data: {
        status: MembershipStatus.ACTIVE,
        endDate: newEndDate,
        frozenAt: null, // Clear the freeze timestamp
        // Update the cumulative freeze counter for historical reference
        freezeDays: membership.freezeDays + actualDaysFrozen,
      },
    });
  }

  async cancel(gymId: string, membershipId: string) {
    const membership = await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
      },
    });

    if (!membership) {
      throw new BadRequestException('Membership not found');
    }

    return this.prisma.membership.update({
      where: { id: membershipId },
      data: {
        status: MembershipStatus.CANCELLED,
      },
    });
  }

  async extend(gymId: string, membershipId: string, days: number) {
    const membership = await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
      },
    });

    if (!membership) {
      throw new BadRequestException('Membership not found');
    }

    const newEndDate = new Date(membership.endDate);
    newEndDate.setDate(newEndDate.getDate() + days);

    return this.prisma.membership.update({
      where: { id: membershipId },
      data: {
        endDate: newEndDate,
        extendedUntil: newEndDate,
      },
    });
  }
}