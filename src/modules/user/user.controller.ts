import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userData: UserDto) {
    return this.userService.create(userData);
  }

  @Post('register')
  register(@Body() userData: RegisterDto) {
    return this.userService.register(userData);
  }

  @Put(':id')
  update() {
    return this.userService.update();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get('n/:name')
  findByName(@Param('name') name: string) {
    return this.userService.findUserByUserName(name);
  }
}