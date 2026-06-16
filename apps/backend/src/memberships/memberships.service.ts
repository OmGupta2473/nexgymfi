import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMembershipDto } from './dto/create-membership.dto';

import { MembershipStatus } from '../../generated/prisma/enums';

@Injectable()
export class MembershipsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    gymId: string,
    userId: string,
    data: CreateMembershipDto,
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

    const plan =
      await this.prisma.plan.findFirst({
        where: {
          id: data.planId,
          gymId,
          archivedAt: null,
        },
      });

    if (!plan) {
      throw new BadRequestException(
        'Plan not found',
      );
    }

    const activeMembership =
      await this.prisma.membership.findFirst({
        where: {
          memberId: data.memberId,
          status: MembershipStatus.ACTIVE,
        },
      });

    if (activeMembership) {
      throw new BadRequestException(
        'Member already has an active membership',
      );
    }

    const startDate = new Date(
      data.startDate,
    );

    const endDate = new Date(startDate);

    endDate.setDate(
      endDate.getDate() + plan.durationDays,
    );

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
}