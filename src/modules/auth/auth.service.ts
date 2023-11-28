import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { isEmpty } from 'lodash';
import { md5 } from 'src/utils/crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn({ user_name, password }: LoginDto) {
    const user: any = await this.userService.findUserByUserName(user_name);
    if (isEmpty(user)) {
      throw new BadRequestException('用户不存在');
    }

    const comparePwd = md5(password);
    if (user.password !== comparePwd) {
      throw new BadRequestException('登录信息输入有误');
    }

    const payload = { sub: user._id, user_name };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user_type: user.type,
      user_name,
      user_id: user._id,
    };
  }
}
