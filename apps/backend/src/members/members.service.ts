import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    gymId: string,
    data: CreateMemberDto,
  ) {
    const existingMember =
      await this.prisma.member.findFirst({
        where: {
          gymId,
          phone: data.phone,
          deletedAt: null,
        },
      });

    if (existingMember) {
      throw new BadRequestException(
        'Member with this phone already exists',
      );
    }

    return this.prisma.member.create({
      data: {
        gymId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        emergencyContact:
          data.emergencyContact,
      },
    });
  }

  async findAll(gymId: string) {
    return this.prisma.member.findMany({
      where: {
        gymId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async findOne(
  gymId: string,
  memberId: string,
) {
  return this.prisma.member.findFirst({
    where: {
      id: memberId,
      gymId,
      deletedAt: null,
    },
  });
}
async update(
  gymId: string,
  memberId: string,
  data: UpdateMemberDto,
) {
  return this.prisma.member.updateMany({
    where: {
      id: memberId,
      gymId,
      deletedAt: null,
    },
    data,
  });
}
async remove(
  gymId: string,
  memberId: string,
) {
  return this.prisma.member.updateMany({
    where: {
      id: memberId,
      gymId,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
}