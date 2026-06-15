import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterOwnerDto } from './dto/register-owner.dto';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register-owner')
  async registerOwner(
    @Body() body: RegisterOwnerDto,
  ) {
    return this.authService.registerOwner(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
  ) {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(
    @CurrentUser() user: any,
  ) {
    return user;
  }
}