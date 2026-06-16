import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
} from '@nestjs/common';

import { MembersService } from './members.service';

import { CreateMemberDto } from './dto/create-member.dto';

import { CurrentUser } from '../auth/current-user.decorator';

import { Roles } from '../auth/decorators/roles.decorator';

import { AuditAction, Role } from '../../generated/prisma/enums';
import { UpdateMemberDto } from './dto/update-member.dto';

import { Audit } from '../audit/decorators/audit.decorator';


@Controller('members')
export class MembersController {
    constructor(
        private readonly membersService: MembersService,
    ) { }

    @Roles(
        Role.OWNER,
        Role.MANAGER,
        Role.RECEPTIONIST,
    )
    @Audit('Member', AuditAction.CREATE)
    @Post()
    async create(
        @CurrentUser() user: any,
        @Body() data: CreateMemberDto,
    ) {
        return this.membersService.create(
            user.gymId,
            data,
        );
    }

    @Roles(
        Role.OWNER,
        Role.MANAGER,
        Role.RECEPTIONIST,
    )
    @Get()
    async findAll(
        @CurrentUser() user: any,
    ) {
        return this.membersService.findAll(
            user.gymId,
        );
    }
    @Roles(
        Role.OWNER,
        Role.MANAGER,
        Role.RECEPTIONIST,
    )
    @Get(':id')
    async findOne(
        @CurrentUser() user: any,
        @Param('id') id: string,
    ) {
        return this.membersService.findOne(
            user.gymId,
            id,
        );
    }
    @Roles(
        Role.OWNER,
        Role.MANAGER,
    )
    @Audit('Member', AuditAction.UPDATE)
    @Patch(':id')
    async update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() data: UpdateMemberDto,
    ) {
        return this.membersService.update(
            user.gymId,
            id,
            data,
        );
    }
    @Roles(Role.OWNER)
    @Audit('Member', AuditAction.DELETE)
    @Delete(':id')
    async remove(
        @CurrentUser() user: any,
        @Param('id') id,
    ) {
        return this.membersService.remove(
            user.gymId,
            id,
        );
    }
}