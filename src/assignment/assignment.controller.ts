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

    @Get()@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    getAssignments() {return this.assignmentService.getAssignments();}

    @Get(':id')
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    getAssignment(@Param('id') id: string) {return this.assignmentService.getAssignment(+id);}

    @Post()@Roles(Role.ADMIN, Role.MANAGER)
    createAssignment(@Body() body: AssignDto) {return this.assignmentService.createAssignment(body);}

    @Put(':id')@Roles(Role.ADMIN, Role.MANAGER)
    updateAssignment(@Param('id') id: string, @Body() body: ReturnDto) {return this.assignmentService.unAssignAssignment(+id, body);}


    @Delete(':id')@Roles(Role.ADMIN, Role.MANAGER)
    deleteAssignment(@Param('id') id: string) {return this.assignmentService.deleteAssignment(+id);}

}
