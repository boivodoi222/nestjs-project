import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    getUsers() { return this.userService.getUsers()}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    getUserById(@Param('id') id: string){ return this.userService.getUser(+id)}

    @Post('register')
    @Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    createUser(@Body() body: CreateUserDto) { return this.userService.createUser(body)}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')@Roles(Role.ADMIN, Role.MANAGER, Role.SUPERVISOR, Role.USER)
    updateUser(@Param('id') id: number, @Body() body: UpdateUserDto){return this.userService.updateUser(+id, body);}
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')@Roles(Role.ADMIN, Role.MANAGER)
    deleteUser(@Param('id') id: string) { return this.userService.deleteUser(+id)}

}