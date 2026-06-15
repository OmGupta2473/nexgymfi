import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import slugify from 'slugify';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterOwnerDto } from './dto/register-owner.dto';

import {
  Role,
  SubscriptionPlan,
  SubscriptionStatus,
} from '../../generated/prisma/enums';

import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
  private readonly prisma: PrismaService,
  private readonly jwtService: JwtService,
) {}

  async registerOwner(data: RegisterOwnerDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Email already registered',
      );
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    const slug = slugify(data.gymName, {
      lower: true,
      strict: true,
    });

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

      return {
        gym,
        owner,
      };
    });
  }
  async login(data: LoginDto) {
  const user = await this.prisma.user.findFirst({
    where: {
      email: data.email,
      isActive: true,
    },
  });

  if (!user) {
    throw new UnauthorizedException(
      'Invalid credentials',
    );
  }

  const validPassword = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!validPassword) {
    throw new UnauthorizedException(
      'Invalid credentials',
    );
  }

  const payload = {
    sub: user.id,
    gymId: user.gymId,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: await this.jwtService.signAsync(
      payload,
    ),
  };
}
}
