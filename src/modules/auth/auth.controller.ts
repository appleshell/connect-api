import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AuthLoggingInterceptor } from './interceptors/auth.interceptor';

@Controller('auth')
// @UseInterceptors(AuthLoggingInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  signIn(@Body() data: LoginDto) {
    return this.authService.signIn(data);
  }
}
