import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';
import { createHash, randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterOwnerDto } from './dto/register-owner.dto';
import { LoginDto } from './dto/login.dto';
import {
  Role,
  SubscriptionPlan,
  SubscriptionStatus,
} from '../../generated/prisma/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async registerOwner(data: RegisterOwnerDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const slug = slugify(data.gymName, { lower: true, strict: true });
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    return this.prisma.$transaction(async (tx) => {
      const gym = await tx.gym.create({
        data: {
          name: data.gymName,
          slug,
          phone: data.phone,
          subscriptionPlan: SubscriptionPlan.FREE,
          subscriptionStatus: SubscriptionStatus.TRIAL,
          trialEndsAt,
        },
      });

      const owner = await tx.user.create({
        data: {
          gymId: gym.id,
          name: data.ownerName,
          email: data.email,
          phone: data.phone,
          passwordHash: hashedPassword,
          role: Role.OWNER,
        },
      });

      return { gym, owner };
    });
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      gymId: user.gymId,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    const refreshTokenHash = this.hashToken(refreshToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokenHash,
        lastLoginAt: new Date(),
      },
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get<string>('jwtRefreshSecret'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.refreshTokenHash) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (user.tokenVersion !== payload.tokenVersion) {
        throw new UnauthorizedException('Session invalidated');
      }

      const incomingHash = this.hashToken(refreshToken);
      if (incomingHash !== user.refreshTokenHash) {
        throw new UnauthorizedException('Refresh token expired or already used');
      }

      const newPayload = {
        sub: user.id,
        gymId: user.gymId,
        email: user.email,
        role: user.role,
        tokenVersion: user.tokenVersion,
      };

      const accessToken = await this.generateAccessToken(newPayload);
      const newRefreshToken = await this.generateRefreshToken(newPayload);
      const newRefreshTokenHash = this.hashToken(newRefreshToken);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshTokenHash: newRefreshTokenHash },
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (err) {
      // Re-throw if it's already an UnauthorizedException with a specific message
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshTokenHash: null,
        tokenVersion: { increment: 1 }, // This kills ALL active access and refresh tokens
      },
    });
    return { message: 'Logged out successfully' };
  }

  private async generateAccessToken(payload: any) {
    return this.jwtService.signAsync(
      { ...payload, jti: randomUUID() },
      {
        secret: this.config.get<string>('jwtAccessSecret')!,
        expiresIn: (this.config.get<string>('jwtAccessExpiresIn') ??
          '1h') as any,
      },
    );
  }

  private async generateRefreshToken(payload: any) {
    return this.jwtService.signAsync(
      { ...payload, jti: randomUUID() },
      {
        secret: this.config.get<string>('jwtRefreshSecret')!,
        expiresIn: (this.config.get<string>('jwtRefreshExpiresIn') ??
          '7d') as any,
      },
    );
  }
}
