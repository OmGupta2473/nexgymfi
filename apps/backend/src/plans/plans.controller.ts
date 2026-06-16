import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PlansService } from './plans.service';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

import { Audit } from '../audit/decorators/audit.decorator';

import { AuditAction, Role } from '../../generated/prisma/enums';

@Controller('plans')
export class PlansController {
  constructor(
    private readonly plansService: PlansService,
  ) {}

  @Roles(Role.OWNER, Role.MANAGER)
  @Audit('Plan', AuditAction.CREATE)
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() data: CreatePlanDto,
  ) {
    return this.plansService.create(
      user.gymId,
      data,
    );
  }

  @Get()
  async findAll(
    @CurrentUser() user: any,
  ) {
    return this.plansService.findAll(
      user.gymId,
    );
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.plansService.findOne(
      user.gymId,
      id,
    );
  }

  @Roles(Role.OWNER, Role.MANAGER)
  @Audit('Plan', AuditAction.UPDATE)
  @Patch(':id')
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() data: UpdatePlanDto,
  ) {
    return this.plansService.update(
      user.gymId,
      id,
      data,
    );
  }

  @Roles(Role.OWNER)
  @Audit('Plan', AuditAction.DELETE)
  @Delete(':id')
  async archive(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.plansService.archive(
      user.gymId,
      id,
    );
  }
}