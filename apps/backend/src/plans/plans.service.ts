import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreatePlanDto } from './dto/create-plan.dto';

import { UpdatePlanDto } from './dto/update-plan.dto';
@Injectable()
export class PlansService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(
        gymId: string,
        data: CreatePlanDto,
    ) {
        const existingPlan =
            await this.prisma.plan.findFirst({
                where: {
                    gymId,
                    name: data.name,
                    archivedAt: null,
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
    async findAll(gymId: string) {
        return this.prisma.plan.findMany({
            where: {
                gymId,
                archivedAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(
        gymId: string,
        planId: string,
    ) {
        return this.prisma.plan.findFirst({
            where: {
                id: planId,
                gymId,
                archivedAt: null,
            },
        });
    }
    async update(
        gymId: string,
        planId: string,
        data: UpdatePlanDto,
    ) {
        return this.prisma.plan.updateMany({
            where: {
                id: planId,
                gymId,
                archivedAt: null,
            },
            data,
        });
    }
    async archive(
        gymId: string,
        planId: string,
    ) {
        return this.prisma.plan.updateMany({
            where: {
                id: planId,
                gymId,
                archivedAt: null,
            },
            data: {
                archivedAt: new Date(),
                isActive: false,
            },
        });
    }
    
}   