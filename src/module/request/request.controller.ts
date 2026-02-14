import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/request')
export class RequestController {
    constructor(private readonly requestService: RequestService) { }
    @Get()
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    getRequests() { return this.requestService.getRequests(); }

    @Get(':id')
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    getRequestById(@Param('id') id: string) { return this.requestService.getRequest(+id); }

    @Post()
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    createRequest(@Body() body: CreateRequestDto, @Req() req: any) {
        console.log('REQ.USER:', req.user);
        return this.requestService.createRequest(body, req.user.userId);
    }

    @Put(':id')
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    updateUser(@Param('id') id: string, @Body() body: UpdateRequestDto, @Req() req: any) {
        return this.requestService.updateRequest(+id, body, req.user.userId);
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    deleteRequest(@Param('id') id: string) { return this.requestService.deleteRequest(+id); }

}
