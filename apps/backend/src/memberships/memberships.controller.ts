import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { MembershipsService } from './memberships.service';

import { CreateMembershipDto } from './dto/create-membership.dto';

import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '../../generated/prisma/enums';

@Controller('memberships')
export class MembershipsController {
  constructor(
    private readonly membershipsService: MembershipsService,
  ) {}

  @Roles(
    Role.OWNER,
    Role.MANAGER,
    Role.RECEPTIONIST,
  )
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() data: CreateMembershipDto,
  ) {
    return this.membershipsService.create(
      user.gymId,
      user.userId,
      data,
    );
  }

  @Roles(
    Role.OWNER,
    Role.MANAGER,
    Role.RECEPTIONIST,
  )
  @Get()
  async findAll(
    @CurrentUser() user: any,
  ) {
    return this.membershipsService.findAll(
      user.gymId,
    );
  }
}