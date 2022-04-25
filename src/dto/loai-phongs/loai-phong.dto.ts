import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class LoaiPhongDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly type: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cost: number;
}
