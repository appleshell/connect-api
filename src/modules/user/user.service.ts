import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
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

  async update(data) {
    const { _id, user_name } = data;
    console.log(data);
    await this.userModel.updateOne({ _id }, { user_name }).exec();
    return this.findOne(_id);
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByPage(data) {
    const {
      page_size = 10,
      current = 1,
      created_start,
      created_end,
      ...restParams
    } = data;
    const r = await this.userModel
      .find({
        ...restParams,
        // createdAt: { $gt: created_end, $lt: created_start },
      })
      .skip((current - 1) * page_size)
      .limit(page_size)
      .select(['user_name', 'email', 'status', 'type', 'createdAt']);

    return r;
  }

  async findOne(id: string) {
    const r = await this.userModel
      .findById(id, { _id: 1, user_name: 1, type: 1, status: 1, email: 1 })
      .exec();
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
