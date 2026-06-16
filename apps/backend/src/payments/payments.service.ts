import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreatePaymentDto } from './dto/create-payment.dto';

import {
  PaymentStatus,
} from '../../generated/prisma/enums';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    gymId: string,
    userId: string,
    data: CreatePaymentDto,
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

    if (data.membershipId) {
      const membership =
        await this.prisma.membership.findFirst({
          where: {
            id: data.membershipId,
            gymId,
          },
        });

      if (!membership) {
        throw new BadRequestException(
          'Membership not found',
        );
      }
    }

    const receiptNumber =
      `PAY-${Date.now()}`;

    return this.prisma.payment.create({
      data: {
        gymId,
        memberId: data.memberId,
        membershipId: data.membershipId,
        recordedById: userId,

        amount: Number(data.amount),

        type: data.type,
        method: data.method,

        status: PaymentStatus.COMPLETED,

        receiptNumber,

        notes: data.notes,
      },
    });
  }

  async findAll(gymId: string) {
    return this.prisma.payment.findMany({
      where: {
        gymId,
      },
      include: {
        member: true,
        membership: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    gymId: string,
    paymentId: string,
  ) {
    return this.prisma.payment.findFirst({
      where: {
        id: paymentId,
        gymId,
      },
      include: {
        member: true,
        membership: true,
      },
    });
  }
}