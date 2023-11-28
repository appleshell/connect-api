import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  user_name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  status: number;

  @Prop()
  type: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
