import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()@Roles(Role.ADMIN, Role.MANAGER)
    async getUsers() { const data = await this.userService.getUsers(); return { success: true, data } }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async getUserById(@Param('id') id: string){ const data = await this.userService.getUser(+id); return { success: true, data } }

    @Post('register')
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async createUser(@Body() body: CreateUserDto) { const data = await this.userService.createUser(body); return { success: true, data } }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto,  @Req() req: any){ const data = await this.userService.updateUser(+id, body, req); return { success: true, data } }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')@Roles(Role.ADMIN, Role.MANAGER)
    async deleteUser(@Param('id') id: string) { const data = await this.userService.deleteUser(+id); return { success: true, data } }
}