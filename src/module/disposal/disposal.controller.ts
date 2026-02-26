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
    async getDisposals() { const data = await this.disposalService.getAll(); return { success: true, data } }

    @Get('liquidation')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR)
    getDevicesNeedDisposal() {
        return this.disposalService.getDevicesNeedDisposal().then(data => ({ success: true, data }));
    }
    @Get(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR)
     async getDisposal(@Param('id') id: string) {
        const data = await this.disposalService.getById(+id);
        return { success: true, data };
    }
    @Post()@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    createRequest(@Body() body: CreateDisposalDto) {
        return this.disposalService.create(body).then(data => ({ success: true, data }));
    }
    @Put(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async updateUser(@Param('id') id: string, @Body() body: UpdateDisposalDto, @Req() req: any): Promise<any> {
        const data = await this.disposalService.approveDisposal(+id, body, req.user.userId);
        return { success: true, data };
    }
    @Delete(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async deleteRequest(@Param('id') id: string) {
        const data = await this.disposalService.delete(+id);
        return { success: true, data };
    }
}
