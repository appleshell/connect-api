import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, tap } from 'rxjs';

@Injectable()
export class AuthLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Before Login...');
    const now = Date.now();

    return next
      .handle()
      .pipe(
        map((data) => ({
          userInfo: data,
        })),
      )
      .pipe(tap(() => console.log(`After ... ${Date.now() - now}ms`)));
  }
}
