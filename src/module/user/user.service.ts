import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResDto } from './dto/res-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    // 1. Lấy danh sách user
    async getUsers(): Promise<any> {
        const users = await this.prisma.user.findMany();
        if (!users) {
            throw new HttpException('Userss không tồn tại', HttpStatus.NOT_FOUND);
        }
        return users
    }

    // 2. Lấy user theo ID
    async getUser(id: number): Promise<UserResDto> {
        const user = await this.prisma.user.findFirst({ where: { userId: id } });
        if (!user) {
            throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
        }
        return new UserResDto(user);
    }

    // 3. Tạo mới user
    async createUser(body: CreateUserDto) {
        // Kiểm tra trùng email hoặc username
        const existedUser = await this.prisma.user.findFirst({ where: { username: body.username } });

        if (existedUser) {
            throw new HttpException('Username đã tồn tại', HttpStatus.BAD_REQUEST);
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);
        return this.prisma.user.create({ data: { ...body, password: hashedPassword, } });
    }

    // 4. Cập nhật user
    async updateUser(id: number, body: UpdateUserDto) {
        const user = await this.prisma.user.findFirst({
            where: { userId: id },
        });

        if (!user) {
            throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
        }
        return this.prisma.user.update({
            where: { userId: id },
            data: body

        })
    }

    // 5. Xóa user
    async deleteUser(id: number) {
        const user = await this.prisma.user.findFirst({
            where: { userId: id },
        });

        if (!user) {
            throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
        }

        return this.prisma.user.delete({
            where: { userId: id },
        });
    }

    // 6. Tìm user theo username (dùng cho Auth)
    async findByUsername(username: string) {
        return this.prisma.user.findFirst({
            where: { username },
        });
    }
}
