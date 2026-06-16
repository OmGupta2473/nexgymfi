import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService, // Inject Prisma
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwtAccessSecret')!,
    });
  }

  async validate(payload: any) {
    // CRITICAL: Check database to see if session was revoked (tokenVersion incremented)
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, gymId: true, email: true, role: true, tokenVersion: true, isActive: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User no longer active');
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException('Session expired or revoked');
    }

    return {
      userId: user.id,
      gymId: user.gymId,
      email: user.email,
      role: user.role,
    };
  }
}