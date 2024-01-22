import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
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
  createAppData(
    @Req() req: Request & { user: any },
    @Body() appData: AppDataDto,
  ) {
    const { user } = req;
    return this.appDataService.createApp({ ...appData, user: user.sub });
  }

  @Put()
  updateAppData(
    @Req() req: Request & { user: any },
    @Body() appData: AppDataDto,
  ) {
    const { user } = req;
    return this.appDataService.updateApp({ ...appData, user });
  }
}
