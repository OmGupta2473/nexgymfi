import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/register-owner.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
}