import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserPageDto {
  @IsNumber()
  @IsNotEmpty()
  page_size: number;

  @IsNumber()
  @IsNotEmpty()
  current: number;
}

export class UserSearchDto extends UserPageDto {
  @IsString()
  @MaxLength(20)
  user_name: string;

  @IsEmail()
  email: string;

  @IsDate()
  created_start: Date;

  @IsDate()
  created_end: Date;
}
