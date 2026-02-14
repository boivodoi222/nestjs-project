import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    fullName: string
    @IsEmail()
    email: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    username: string;
    @MinLength(6)
    password: string;
    @IsEnum(Role)
    role: Role;

}