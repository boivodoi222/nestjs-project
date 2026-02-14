import { DisposalService } from './disposal.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateDisposalDto } from './dto/create-disposal.dto';
import { UpdateDisposalDto } from './dto/update-disposal.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/disposal')
export class DisposalController {
    constructor(private readonly disposalService: DisposalService) { }
    @Get()@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR)
    getDisposals() {return this.disposalService.getAll();}

    @Get('liquidation')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR)
    getDevicesNeedDisposal() {
        return this.disposalService.getDevicesNeedDisposal();
    }
    @Get(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR)
     getDisposal(@Param('id') id: string) {
        return this.disposalService.getById(+id);}
    @Post()@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    createRequest(@Body() body: CreateDisposalDto) {
        return this.disposalService.create(body);
    }
    @Put(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    updateUser(@Param('id') id: string, @Body() body: UpdateDisposalDto, @Req() req: any): Promise<any> {
        return this.disposalService.approveDisposal(+id, body, req.user.userId);       
    }
    @Delete(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    deleteRequest(@Param('id') id: string) {
        return this.disposalService.delete(+id);
    }
}
