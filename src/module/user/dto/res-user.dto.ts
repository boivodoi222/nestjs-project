import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class UserResDto {
    @IsNotEmpty()
    @MinLength(3)
    fullName: string
    @IsEmail()
    email: string;
    @IsNotEmpty()
    username: string;

    @IsEnum(Role)
    role: Role;

    constructor(user: any) {
  
        this.fullName = user.fullName;
        this.email = user.email;
        this.username = user.username;
        this.role = user.role;

    }
}