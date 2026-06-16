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
          gymId,
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
  async freeze(
  gymId: string,
  membershipId: string,
  days: number,
) {
  const membership =
    await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
      },
    });

  if (!membership) {
    throw new BadRequestException(
      'Membership not found',
    );
  }

  if (
    membership.status !==
    MembershipStatus.ACTIVE
  ) {
    throw new BadRequestException(
      'Only active memberships can be frozen',
    );
  }

  return this.prisma.membership.update({
    where: {
      id: membershipId,
    },
    data: {
      status: MembershipStatus.FROZEN,
      frozenAt: new Date(),
      freezeDays: days,
    },
  });
}
async resume(
  gymId: string,
  membershipId: string,
) {
  const membership =
    await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
      },
    });

  if (!membership) {
    throw new BadRequestException(
      'Membership not found',
    );
  }

  if (
    membership.status !==
    MembershipStatus.FROZEN
  ) {
    throw new BadRequestException(
      'Membership is not frozen',
    );
  }

  const newEndDate = new Date(
    membership.endDate,
  );

  newEndDate.setDate(
    newEndDate.getDate() +
      membership.freezeDays,
  );

  return this.prisma.membership.update({
    where: {
      id: membershipId,
    },
    data: {
      status: MembershipStatus.ACTIVE,
      endDate: newEndDate,
      frozenAt: null,
      freezeDays: 0,
    },
  });
}
async cancel(
  gymId: string,
  membershipId: string,
) {
  const membership =
    await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
      },
    });

  if (!membership) {
    throw new BadRequestException(
      'Membership not found',
    );
  }

  return this.prisma.membership.update({
    where: {
      id: membershipId,
    },
    data: {
      status:
        MembershipStatus.CANCELLED,
    },
  });
}
async extend(
  gymId: string,
  membershipId: string,
  days: number,
) {
  const membership =
    await this.prisma.membership.findFirst({
      where: {
        id: membershipId,
        gymId,
      },
    });

  if (!membership) {
    throw new BadRequestException(
      'Membership not found',
    );
  }

  const newEndDate = new Date(
    membership.endDate,
  );

  newEndDate.setDate(
    newEndDate.getDate() + days,
  );

  return this.prisma.membership.update({
    where: {
      id: membershipId,
    },
    data: {
      endDate: newEndDate,
      extendedUntil: newEndDate,
    },
  });
}
}