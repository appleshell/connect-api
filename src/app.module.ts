import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppDataModule } from './modules/appData/appData.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AppDataModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: 'connects' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
