import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { numberTransformer } from 'src/utils/transform';

export class UserPageDto {
  @Transform(numberTransformer)
  @IsNumber()
  @IsNotEmpty()
  page_size: number;

  @Transform(numberTransformer)
  @IsNumber()
  @IsNotEmpty()
  current: number;
}

export class UserSearchDto extends UserPageDto {
  @IsString()
  @MaxLength(20)
  @IsOptional()
  user_name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsDate()
  @IsOptional()
  created_start: Date;

  @IsDate()
  @IsOptional()
  created_end: Date;
}
