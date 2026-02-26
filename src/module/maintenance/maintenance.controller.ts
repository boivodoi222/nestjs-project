import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/maintenance')
export class MaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) { }

    @Get()@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async getMaintenances() {
        const data = await this.maintenanceService.getMaintenances();
        return { success: true, data };
    }
        
    @Get(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async getMaintenance(@Param('id') id: string): Promise<any> {
        const data = await this.maintenanceService.getMaintenance(+id);
        return { success: true, data };
    }

    @Post()@Roles(Role.ADMIN, Role.MANAGER)
    async createAssignment(@Body() body: CreateMaintenanceDto) {
        const data = await this.maintenanceService.createMaintenance(body);
        return { success: true, data };
    }

    @Put(':id')@Roles(Role.ADMIN, Role.MANAGER)
    async Maintenance(@Param('id') id: string, @Body() body: UpdateMaintenanceDto) {
        const data = await this.maintenanceService.updateMaintenance(+id, body);
        return { success: true, data };
    }

    @Delete(':id')@Roles(Role.ADMIN, Role.MANAGER)
    async deleteAssignment(@Param('id') id: string) {
        const data = await this.maintenanceService.deleteMaintenance(+id);
        return { success: true, data };
    }
}
