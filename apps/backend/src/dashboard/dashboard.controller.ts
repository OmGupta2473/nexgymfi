import {
  Controller,
  Get,
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { CurrentUser } from '../auth/current-user.decorator';

import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '../../generated/prisma/enums';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Roles(
    Role.OWNER,
    Role.MANAGER,
    Role.RECEPTIONIST,
  )
  @Get('summary')
  async summary(
    @CurrentUser() user: any,
  ) {
    return this.dashboardService.summary(
      user.gymId,
    );
  }

  @Roles(
    Role.OWNER,
    Role.MANAGER,
  )
  @Get('revenue')
  async revenue(
    @CurrentUser() user: any,
  ) {
    return this.dashboardService.revenue(
      user.gymId,
    );
  }

  @Roles(
    Role.OWNER,
    Role.MANAGER,
    Role.RECEPTIONIST,
  )
  @Get('memberships-expiring')
  async membershipsExpiring(
    @CurrentUser() user: any,
  ) {
    return this.dashboardService.membershipsExpiring(
      user.gymId,
    );
  }
}