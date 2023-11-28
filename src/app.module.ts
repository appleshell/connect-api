import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(
      // 'mongodb+srv://lvps:330088@cluster0.ktj7cgx.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
      process.env.MONGODB_URI,
      { dbName: 'connects' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
