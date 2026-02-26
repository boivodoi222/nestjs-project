// device/device.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Res } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';

import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateDeviceDto } from './dto/update-device.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post() @Roles(Role.ADMIN, Role.MANAGER)
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const data = await this.deviceService.create(createDeviceDto);
    return { success: true, data };
  }

  @Get() @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
  async getDevices() {
    const data = await this.deviceService.getDevices();
    return { success: true, data };
  }

  @Get('search/:keyword') @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
  async getDeviceByKeyword(@Param('keyword') keyword: string) {
    const data = await this.deviceService.search(keyword);
    return { success: true, data };
  }

  @Get(':id') @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
  async getDevice(@Param('id') id: string) {
    const data = await this.deviceService.getDevice(+id);
    return { success: true, data };
  }

  @Put(':id') @Roles(Role.ADMIN, Role.MANAGER)
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    const data = await this.deviceService.update(+id, updateDeviceDto);
    return { success: true, data };
  }

  @Delete(':id') @Roles(Role.ADMIN, Role.MANAGER)
  async remove(@Param('id') id: string) {
    const data = await this.deviceService.delete(+id);
    return { success: true, data };
  }

}

