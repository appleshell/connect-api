import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppDataService } from './appData.service';
import { AppDataDto } from './dto/appData.dto';

@Controller('app')
export class AppDataController {
  constructor(private appDataService: AppDataService) {}

  @Get('list')
  findAppLists() {
    return this.appDataService.findPageList();
  }

  @Post()
  createAppData(@Body() appData: AppDataDto) {
    return this.appDataService.createApp(appData);
  }
}
