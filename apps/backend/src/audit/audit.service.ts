import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditAction } from '../../generated/prisma/enums';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createLog(data: {
    gymId: string;
    userId: string;
    action: AuditAction;
    entity: string;
    entityId: string;
    ipAddress?: string;
  }) {
    try {
      await this.prisma.auditLog.create({
        data: {
          gymId: data.gymId,
          userId: data.userId,
          action: data.action,
          entity: data.entity,
          entityId: data.entityId,
          ipAddress: data.ipAddress,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create audit log', error instanceof Error ? error.stack : undefined);
    }
  }

  async findAll(
    gymId: string,
    query: {
      action?: AuditAction;
      entity?: string;
      userId?: string;
      page?: number;
      limit?: number;
    },
  ) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      gymId,
      ...(query.action && { action: query.action }),
      ...(query.entity && { entity: query.entity }),
      ...(query.userId && { userId: query.userId }),
    };

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: { name: true, email: true, role: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}