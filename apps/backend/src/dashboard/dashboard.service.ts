import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  MembershipStatus,
  PaymentStatus,
} from '../../generated/prisma/enums';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async summary(gymId: string) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const [
      totalMembers,
      activeMemberships,
      todayCheckins,
      todayRevenue,
    ] = await Promise.all([
      this.prisma.member.count({
        where: {
          gymId,
          deletedAt: null,
        },
      }),

      this.prisma.membership.count({
        where: {
          gymId,
          status: MembershipStatus.ACTIVE,
        },
      }),

      this.prisma.attendance.count({
        where: {
          gymId,
          checkedInAt: {
            gte: today,
          },
        },
      }),

      this.prisma.payment.aggregate({
        where: {
          gymId,
          status: PaymentStatus.COMPLETED,
          paidAt: {
            gte: today,
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return {
      totalMembers,
      activeMemberships,
      todayCheckins,
      todayRevenue:
        todayRevenue._sum.amount ?? 0,
    };
  }

  async revenue(gymId: string) {
    const startOfMonth = new Date();

    startOfMonth.setDate(1);

    startOfMonth.setHours(
      0,
      0,
      0,
      0,
    );

    const revenue =
      await this.prisma.payment.aggregate({
        where: {
          gymId,
          status: PaymentStatus.COMPLETED,
          paidAt: {
            gte: startOfMonth,
          },
        },
        _sum: {
          amount: true,
        },
      });

    return {
      monthRevenue:
        revenue._sum.amount ?? 0,
    };
  }

  async membershipsExpiring(
    gymId: string,
  ) {
    const today = new Date();

    const nextWeek = new Date();

    nextWeek.setDate(
      nextWeek.getDate() + 7,
    );

    return this.prisma.membership.findMany({
      where: {
        gymId,
        status: MembershipStatus.ACTIVE,
        endDate: {
          gte: today,
          lte: nextWeek,
        },
      },

      include: {
        member: true,
        plan: true,
      },

      orderBy: {
        endDate: 'asc',
      },
    });
  }
}