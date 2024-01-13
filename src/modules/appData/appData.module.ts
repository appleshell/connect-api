import { Module } from '@nestjs/common';
import { AppDataController } from './appData.controller';
import { AppDataService } from './appData.service';
import { MongooseModule } from '@nestjs/mongoose';
import { App, AppSchema } from './schema/appData.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: App.name, schema: AppSchema }])],
  controllers: [AppDataController],
  providers: [AppDataService],
})
export class AppDataModule {}
