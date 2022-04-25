import { IsNumber } from 'class-validator';
import { Status } from './../../config/status.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PhongDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEnum(Status)
  readonly status: number;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsString()
  readonly detail: string;

  @IsNotEmpty()
  @IsNumber()
  readonly loaiPhongId: number;
}
