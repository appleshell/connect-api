import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  password: string;

  @IsIn([0, 1])
  status: number;

  @IsIn([0, 1, 2])
  @IsNotEmpty()
  type: number;
}

export class RegisterDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  password: string;

  @IsIn([0, 1, 2])
  @IsNotEmpty()
  type: number;
}

export class UpdateUserDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsIn([0, 1, 2])
  @IsNotEmpty()
  type: number;
}
