import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';

@Schema({ timestamps: true })
export class App {
  @Prop()
  app_name: string;

  @Prop()
  traffic_type: number;

  @Prop()
  app_package: string;

  @Prop({ min: 0, default: 0 })
  dau: number;

  @Prop({ min: 0, default: 0 })
  request_daily: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const AppSchema = SchemaFactory.createForClass(App);
