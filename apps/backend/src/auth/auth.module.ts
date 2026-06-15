import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          secret:
              config.get<string>('jwtAccessSecret') ??
              'dev-secret',
        signOptions: {
          expiresIn: (
            config.get<string>('jwtAccessExpiresIn') ?? '15m'
          ) as unknown as number,  // ← double cast, no import needed
        },
      }),
    }),
  ],
  controllers: [AuthController],
    providers: [AuthService,
        JwtStrategy,],
})
export class AuthModule {}