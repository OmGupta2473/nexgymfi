import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    gymId: string,
    data: CreatePlanDto,
  ) {
    const existingPlan =
      await this.prisma.plan.findFirst({
        where: {
          gymId,
          name: data.name,
        },
      });

    if (existingPlan) {
      throw new BadRequestException(
        'Plan already exists',
      );
    }

    return this.prisma.plan.create({
      data: {
        gymId,
        name: data.name,
        durationDays: data.durationDays,
        price: data.price,
        description: data.description,
      },
    });
  }
}