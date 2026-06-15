import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(config: ConfigService) {
    console.log(
      'JWT STRATEGY SECRET:',
      config.get('jwtAccessSecret'),
    );

    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey:
        config.get<string>('jwtAccessSecret') ??
        'dev-secret',
    });
  }

  async validate(payload: any) {
    console.log('JWT PAYLOAD:', payload);

    return {
      userId: payload.sub,
      gymId: payload.gymId,
      email: payload.email,
      role: payload.role,
    };
  }
}