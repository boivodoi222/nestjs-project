// device/device.service.ts
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) { }

  // Lấy toàn bộ thiết bị + dữ liệu liên quan
  async getDevices() {
    const devices = await this.prisma.device.findMany({
      select: {
        deviceCode: true, deviceName: true, serialNumber: true, assetTag: true, location: true, purchasePrice: true,

        // Loại thiết bị
        deviceType: {
          select: { typeName: true, },
        },

        // Trạng thái mới nhất
        StatusHistories: {
          take: 1,
          orderBy: { updatedAt: 'desc', },
          select: { status: { select: { statusName: true, }, }, },
        },

        // Thiết bị đang được cấp phát
        Assignments: {
          where: { returneddate: null, },
          select: {
            user: { select: { fullName: true, }, },
            department: { select: { departmentName: true, }, },
          },
        },
      },
    });
    if (!devices) throw new NotFoundException(`Không tìm thấy thiết bị nào cả`);
    return devices
  }

  // Lấy thiết bị theo keyword
  async search(keyword: string) {
    const devices = await this.prisma.device.findMany({
      where: {
        OR: [
          { deviceCode: { contains: keyword, mode: 'insensitive' } },
          { deviceName: { contains: keyword, mode: 'insensitive' } },
          { serialNumber: { contains: keyword, mode: 'insensitive' } },
          { assetTag: { contains: keyword, mode: 'insensitive' } },
          { location: { contains: keyword, mode: 'insensitive' } },
          { deviceType: { typeName: { contains: keyword, mode: 'insensitive' } } },
          { StatusHistories: { some: { status: { statusName: { contains: keyword, mode: 'insensitive', } } } } },
          {
            Assignments: {
              some: {
                user: { fullName: { contains: keyword, mode: 'insensitive', } },
                department: { departmentName: { contains: keyword, mode: 'insensitive', } },
              },
            },
          },
        ],
      },
      select: {
        deviceCode: true, deviceName: true, serialNumber: true, assetTag: true, location: true, purchasePrice: true,

        // Loại thiết bị
        deviceType: {
          select: { typeName: true, },
        },

        // Trạng thái mới nhất
        StatusHistories: {
          take: 1,
          orderBy: { updatedAt: 'desc', },
          select: { status: { select: { statusName: true, }, }, },
        },

        // Thiết bị đang được cấp phát
        Assignments: {
          where: { returneddate: null, },
          select: {
            user: { select: { fullName: true, }, },
            department: { select: { departmentName: true, }, },
          },
        },
      },
    });
    if (devices.length === 0) throw new NotFoundException(`Không tìm thấy thiết bị nào cả`);
    return devices
  }


  async getDevice(id: number): Promise<any> {
    const device = await this.prisma.device.findUnique({ where: { deviceId: id } });
    if (!device) throw new NotFoundException(`Không tìm thấy thiết bị`);
    return device;
  }

  async create(@Body() body: CreateDeviceDto): Promise<any> {
    const device = await this.prisma.device.create({ data: body });
    await this.prisma.deviceStatusHistory.create({
      data: {
        deviceId: device.deviceId,
        statusId: 1,
        note: "chờ cấp phát",
      },
    });
    if (!device) throw new NotFoundException(`Không tìm thấy thiết bị`);
    return device;
  }

  async update(id: number, body: UpdateDeviceDto): Promise<any> {

    const device = await this.prisma.device.findUnique({ where: { deviceId: id } });
    if (!device) throw new NotFoundException(`Không tìm thấy thiết bị`);
    return this.prisma.device.update({
      where: { deviceId: id },
      data: body,
    });
  }

  async delete(id: number) {

    const device = await this.prisma.device.findUnique({ where: { deviceId: id } });
    if (!device) throw new NotFoundException(`Thiết bị thiết bị không tồn tại`);

    return this.prisma.device.delete({ where: { deviceId: id } });
  }
}
