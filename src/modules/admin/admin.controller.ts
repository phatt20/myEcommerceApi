import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../users/entity/user.entity';
import { Token } from 'src/general-dto/general.dto';
import { AdminLogin, AdminSignUp } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('login')
  @ApiCreatedResponse({ type: Token })
  async login(@Body() data: AdminLogin) {
    return this.adminService.login(data);
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body(new ValidationPipe()) data: AdminSignUp) {
    return this.adminService.create(data);
  }
}
