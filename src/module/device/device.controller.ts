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
  create(@Body() createDeviceDto: CreateDeviceDto) { return this.deviceService.create(createDeviceDto); }

  @Get() @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
  getDevices() { return this.deviceService.getDevices(); }

  @Get('search/:keyword') @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
  getDeviceByKeyword(@Param('keyword') keyword: string) { return this.deviceService.search(keyword); }

  @Get(':id') @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
  getDevice(@Param('id') id: string) {return this.deviceService.getDevice(+id); }

  @Put(':id') @Roles(Role.ADMIN, Role.MANAGER)
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {return this.deviceService.update(+id, updateDeviceDto);}

  @Delete(':id') @Roles(Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) { return this.deviceService.delete(+id); }

}

