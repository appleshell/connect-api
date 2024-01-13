import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import {
  RegisterDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  UserDto,
} from './dto/user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { UserSearchDto } from './dto/page.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userData: UserDto) {
    return this.userService.create(userData);
  }

  @Post('register')
  @Public()
  register(@Body() userData: RegisterDto) {
    return this.userService.register(userData);
  }

  @Put()
  update(@Body() userData: UpdateUserDto) {
    return this.userService.update(userData);
  }

  @Put('status')
  updateStatus(@Body() userData: UpdateUserStatusDto) {
    return this.userService.updateStatus(userData);
  }

  @Get('lists')
  find(@Query() query: UserSearchDto) {
    const { current, page_size, ...restParams } = query;
    return this.userService.findByPage({
      ...restParams,
      current: Number(current),
      page_size: Number(page_size),
    });
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findUser(@Req() req: Request & { user: any }) {
    const { user } = req;
    return this.userService.findOne(user.sub);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get('n/:name')
  findByName(@Param('name') name: string) {
    return this.userService.findUserByUserName(name);
  }
}
