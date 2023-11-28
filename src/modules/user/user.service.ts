import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { RegisterDto, UserDto } from './dto/user.dto';
import { isEmpty } from 'lodash';
import { md5 } from 'src/utils/crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserData: UserDto) {
    const createdUser = new this.userModel(createUserData);
    return createdUser.save();
  }

  update() {
    return 'update';
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const r = await this.userModel.findById(id).exec();
    return r;
  }

  async findUserByUserName(user_name: string): Promise<User> {
    return this.userModel.findOne({ user_name }).exec();
  }

  async register({ user_name, password, ...userData }: RegisterDto) {
    const exists = await this.userModel.findOne({ user_name }).exec();

    if (!isEmpty(exists)) {
      throw new BadRequestException('用户名已存在!');
    }

    const pwd = md5(password ?? '123456');

    return this.create({ user_name, password: pwd, status: 1, ...userData });
  }
}
