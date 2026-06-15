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

import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @Public()
  @Post('register-owner')
  async registerOwner(
    @Body() body: RegisterOwnerDto,
  ) {
    return this.authService.registerOwner(body);
  }

  @Public()
  @Post('login')
  async login(
    @Body() body: LoginDto,
  ) {
    return this.authService.login(body);
  }

  @Get('me')
  getMe(
    @CurrentUser() user: any,
  ) {
    return user;
  }

  @Get('owner-only')
    @Roles('OWNER')
    ownerOnly() {
    return {
    message: 'Owner access granted',
  };
}
  
}