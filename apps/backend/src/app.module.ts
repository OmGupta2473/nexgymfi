import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

import { RolesGuard } from './auth/guards/roles.guard';

import { ThrottlerModule } from '@nestjs/throttler';

import { PlansModule } from './plans/plans.module';

import { MembersModule } from './members/members.module';

import { MembershipsModule } from './memberships/memberships.module';

import { PaymentsModule } from './payments/payments.module';

import { AttendanceModule } from './attendance/attendance.module';

import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    validationSchema: envValidationSchema,
    
  }),

  ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 100,
  },
]),
  PrismaModule,
  UsersModule,
  AuthModule,
  PlansModule,
  MembersModule,
  MembershipsModule,
  PaymentsModule,
  AttendanceModule,
  DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
})
export class AppModule {}