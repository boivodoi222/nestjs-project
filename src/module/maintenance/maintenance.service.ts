import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
    constructor(private prisma: PrismaService) { }

    async getMaintenances() {
        return this.prisma.maintenance.findMany();
    }

    async getMaintenance(id: number): Promise<any> {
        const maintenance = await this.prisma.maintenance.findFirst({
            where: { maintenanceId: id },
        });
        if (!maintenance) {
            throw new HttpException('Maintenance not found', HttpStatus.NOT_FOUND);
        }
        return maintenance;
    }

    async createMaintenance(body: CreateMaintenanceDto): Promise<any> {
        const maintenance = await this.prisma.maintenance.create({ data: body });
        if (!maintenance) {
            throw new HttpException('Failed to create maintenance', HttpStatus.BAD_REQUEST);
        }
        return maintenance;
    }

    async updateMaintenance(id: number, body: UpdateMaintenanceDto): Promise<any> {
        const maintenance = await this.prisma.maintenance.findFirst({
            where: { maintenanceId: id },
        });;
        if (!maintenance) {
            throw new HttpException('Maintenance not found', HttpStatus.NOT_FOUND);
        }
        const nextDate = new Date();
        nextDate.setFullYear(nextDate.getFullYear() + 1);

        return this.prisma.maintenance.update({
            where: { maintenanceId: id },
            data: {
                ...body,
                nextMaintenancedate: nextDate
            },
        });
    }
    async deleteMaintenance(id: number): Promise<any> {
        const maintenance = await this.prisma.maintenance.findFirst({
            where: { maintenanceId: id },
        });
        if (!maintenance) {
            throw new HttpException('Maintenance not found', HttpStatus.NOT_FOUND);
        }
        return this.prisma.maintenance.delete({
            where: { maintenanceId: id },
        });
    }
}
