import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { PaymentsService } from './payments.service';

import { CreatePaymentDto } from './dto/create-payment.dto';

import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

import { Audit } from '../audit/decorators/audit.decorator';
import { AuditAction, Role } from '../../generated/prisma/enums';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Roles(
    Role.OWNER,
    Role.MANAGER,
    Role.RECEPTIONIST,
  )
  @Audit('Payment', AuditAction.CREATE)
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() data: CreatePaymentDto,
  ) {
    return this.paymentsService.create(
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
    return this.paymentsService.findAll(
      user.gymId,
    );
  }

  @Roles(
    Role.OWNER,
    Role.MANAGER,
    Role.RECEPTIONIST,
  )
  @Get(':id')
  async findOne(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.paymentsService.findOne(
      user.gymId,
      id,
    );
  }
}