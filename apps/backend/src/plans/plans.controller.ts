import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { PlansService } from './plans.service';

import { CreatePlanDto } from './dto/create-plan.dto';

import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('plans')
export class PlansController {
  constructor(
    private readonly plansService: PlansService,
  ) {}

  @Roles('OWNER', 'MANAGER')
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
}