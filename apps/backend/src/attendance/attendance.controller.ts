import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator'; // Ensure this is imported
import { Role } from '../../generated/prisma/enums';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // --- PUBLIC QR SCAN ROUTES ---

  @Public() // No login required to scan the wall QR
  @Post('auto')
  async autoCheckIn(@Body() data: { deviceToken: string; gymSlug: string; fingerprint: string }) {
    return this.attendanceService.autoCheckIn(data);
  }

  @Public()
  @Post('register-device')
  async register(@Body() data: { 
    memberId: string; 
    gymSlug: string; 
    deviceToken: string; 
    fingerprint: string; 
    label: string 
  }) {
    return this.attendanceService.registerDevice(data);
  }

  @Public()
  @Get('public-list/:slug')
  async getPublicList(@Param('slug') slug: string) {
    return this.attendanceService.getPublicMemberList(slug);
  }

  // --- PRIVATE ADMIN ROUTES ---

  @Roles(Role.OWNER, Role.MANAGER, Role.RECEPTIONIST)
  @Post('check-in')
  async checkIn(@CurrentUser() user: any, @Body() data: CheckInDto) {
    return this.attendanceService.checkIn(user.gymId, data);
  }

  @Roles(Role.OWNER, Role.MANAGER, Role.RECEPTIONIST)
  @Get('today')
  async findToday(@CurrentUser() user: any) {
    return this.attendanceService.findToday(user.gymId);
  }

  @Roles(Role.OWNER, Role.MANAGER, Role.RECEPTIONIST)
  @Get('member/:id')
  async findMemberAttendance(@CurrentUser() user: any, @Param('id') memberId: string) {
    return this.attendanceService.findMemberAttendance(user.gymId, memberId);
  }
}