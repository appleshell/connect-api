import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class AppDataDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  app_name: string;

  @IsNumber()
  @IsNotEmpty()
  traffic_type: number;

  @IsUrl()
  @IsNotEmpty()
  app_package: string;

  @IsNumber()
  @IsOptional()
  dau: number;

  @IsNumber()
  @IsOptional()
  request_daily: number;
}
