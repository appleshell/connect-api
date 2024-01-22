import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { App } from './schema/appData.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppDataService {
  constructor(@InjectModel(App.name) private appModel: Model<App>) {}

  findPageList() {
    return this.appModel.find({}, { __v: 0 }).exec();
  }

  createApp(data) {
    const createApp = new this.appModel(data);
    return createApp.save();
  }

  async updateApp(data) {
    const { _id, user, ...rest } = data;
    const res = await this.appModel.updateOne({ _id }, rest).exec();
    return res;
  }
}
