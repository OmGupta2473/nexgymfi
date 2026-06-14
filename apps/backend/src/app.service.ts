import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return `Running on ${this.configService.get('nodeEnv')}`;
  }
}