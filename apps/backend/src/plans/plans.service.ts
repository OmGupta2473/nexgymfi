import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create or Restore a Plan
   */
  async create(gymId: string, data: CreatePlanDto) {
    const planName = data.name.trim();

    // 1. Check for ANY plan with this name (even archived ones)
    const existingPlan = await this.prisma.plan.findFirst({
      where: {
        gymId,
        name: { equals: planName, mode: 'insensitive' },
      },
    });

    if (existingPlan) {
      // Scenario A: Plan exists and is ACTIVE
      if (!existingPlan.archivedAt) {
        throw new BadRequestException('A plan with this name already exists.');
      }

      // Scenario B: Plan exists but is ARCHIVED -> RESTORE IT
      // This is the "Smart SaaS" move. We update the old record instead of failing.
      return this.prisma.plan.update({
        where: { id: existingPlan.id },
        data: {
          ...data,
          name: planName,
          isActive: true,
          archivedAt: null, // Bring it back to life
        },
      });
    }

    // 2. Scenario C: No plan exists -> CREATE NEW
    try {
      return await this.prisma.plan.create({
        data: {
          gymId,
          name: planName,
          durationDays: data.durationDays,
          price: data.price,
          description: data.description,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Plan name conflict detected.');
      }
      throw error;
    }
  }

  async findAll(gymId: string) {
    return this.prisma.plan.findMany({
      where: { gymId, archivedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(gymId: string, planId: string) {
    return this.prisma.plan.findFirst({
      where: { id: planId, gymId, archivedAt: null },
    });
  }

  async update(gymId: string, planId: string, data: UpdatePlanDto) {
    const plan = await this.findOne(gymId, planId);
    if (!plan) throw new BadRequestException('Plan not found');

    try {
      return await this.prisma.plan.update({
        where: { id: planId },
        data: {
          ...data,
          name: data.name ? data.name.trim() : undefined,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Another plan already uses this name.');
      }
      throw error;
    }
  }

  async archive(gymId: string, planId: string) {
    const plan = await this.findOne(gymId, planId);
    if (!plan) throw new BadRequestException('Plan not found');

    // Soft delete: keep the record but hide it from the UI
    return this.prisma.plan.update({
      where: { id: planId },
      data: {
        archivedAt: new Date(),
        isActive: false,
      },
    });
  }
}