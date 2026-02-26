import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { AssignDto } from './dto/assign.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ReturnDto } from './dto/return.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/assignment')
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }

    @Get() @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async getAssignments() { const data = await this.assignmentService.getAssignments(); return { success: true, data } }

    @Get(':id')
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async getAssignment(@Param('id') id: string) { const data = await this.assignmentService.getAssignment(+id); return { success: true, data } }

    @Post() @Roles(Role.ADMIN, Role.MANAGER)
    async createAssignment(@Body() body: AssignDto) { const data = await this.assignmentService.createAssignment(body); return { success: true, data } }

    @Put(':id') @Roles(Role.ADMIN, Role.MANAGER)
    async updateAssignment(@Param('id') id: string, @Body() body: ReturnDto) { const data = await this.assignmentService.unAssignAssignment(+id, body); return { success: true, data } }


    @Delete(':id') @Roles(Role.ADMIN, Role.MANAGER)
    async deleteAssignment(@Param('id') id: string) { const data = await this.assignmentService.deleteAssignment(+id); return { success: true, data } }

}
