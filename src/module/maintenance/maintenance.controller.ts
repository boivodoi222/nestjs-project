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
    getMaintenances() {
        return this.maintenanceService.getMaintenances();}
        
    @Get(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    getMaintenance(@Param('id') id: string): Promise<any> {
        return this.maintenanceService.getMaintenance(+id);}

    @Post()@Roles(Role.ADMIN, Role.MANAGER)
    createAssignment(@Body() body: CreateMaintenanceDto) {
        return this.maintenanceService.createMaintenance(body);}

    @Put(':id')@Roles(Role.ADMIN, Role.MANAGER)
    Maintenance(@Param('id') id: string, @Body() body: UpdateMaintenanceDto) {
        return this.maintenanceService.updateMaintenance(+id, body);}

    @Delete(':id')@Roles(Role.ADMIN, Role.MANAGER)
    deleteAssignment(@Param('id') id: string) {
        return this.maintenanceService.deleteMaintenance(+id);}
}
