import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsDateCheckOut } from './CustomValidateCheckOut';

export class DonDatPhongDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly tenKhachHang: string;

  @IsNotEmpty()
  @IsNumber()
  readonly soCMT: number;

  @Type(() => Date)
  @IsDate()
  readonly checkIn: Date;

  @Type(() => Date)
  @IsDate()
  @IsDateCheckOut('checkIn', { message: 'CheckOut phải lớn hơn CheckIn' })
  readonly checkOut: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly cost: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

  @IsNotEmpty()
  @IsString()
  readonly note: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phongId: number;
}
