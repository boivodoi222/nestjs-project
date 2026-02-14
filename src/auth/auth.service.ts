import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpException('Sai mật khẩu', HttpStatus.UNAUTHORIZED);
    return user;
  }
  async login(user: any) {
    const payload = { userId: user.userId, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
