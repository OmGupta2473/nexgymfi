import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuditAction, Role } from '../../generated/prisma/enums';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Roles(Role.OWNER) // High security: Only owners can see logs
  @Get()
  async findAll(
    @CurrentUser() user: any,
    @Query('action') action?: AuditAction,
    @Query('entity') entity?: string,
    @Query('userId') userId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.auditService.findAll(user.gymId, {
      action,
      entity,
      userId,
      page,
      limit,
    });
  }
}