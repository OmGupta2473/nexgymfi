import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';

import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ExtendMembershipDto } from './dto/extend-membership.dto';
import { AuditAction, Role } from '../../generated/prisma/enums';
import { Audit } from '../audit/decorators/audit.decorator';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Roles(Role.OWNER, Role.MANAGER, Role.RECEPTIONIST)
  @Audit('Membership', AuditAction.CREATE)
  @Post()
  async create(@CurrentUser() user: any, @Body() data: CreateMembershipDto) {
    return this.membershipsService.create(user.gymId, user.userId, data);
  }

  @Roles(Role.OWNER, Role.MANAGER, Role.RECEPTIONIST)
  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.membershipsService.findAll(user.gymId);
  }

  @Roles(Role.OWNER, Role.MANAGER)
  @Audit('Membership', AuditAction.UPDATE)
  @Post(':id/freeze')
  async freeze(
    @CurrentUser() user: any, 
    @Param('id') id: string
    // Removed: @Body() data: FreezeMembershipDto
  ) {
    // Service only needs gymId and id now
    return this.membershipsService.freeze(user.gymId, id);
  }

  @Roles(Role.OWNER, Role.MANAGER)
  @Audit('Membership', AuditAction.UPDATE)
  @Post(':id/resume')
  async resume(@CurrentUser() user: any, @Param('id') id: string) {
    return this.membershipsService.resume(user.gymId, id);
  }

  @Roles(Role.OWNER)
  @Audit('Membership', AuditAction.UPDATE)
  @Post(':id/cancel')
  async cancel(@CurrentUser() user: any, @Param('id') id: string) {
    return this.membershipsService.cancel(user.gymId, id);
  }

  @Roles(Role.OWNER, Role.MANAGER)
  @Audit('Membership', AuditAction.UPDATE)
  @Post(':id/extend')
  async extend(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() data: ExtendMembershipDto,
  ) {
    return this.membershipsService.extend(user.gymId, id, data.days);
  }
}