import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../auth/dto/register-owner.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
async createUser(data: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return this.prisma.user.create({
    data: {
      gymId: data.gymId,
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
      role: data.role,
    },
  });
}