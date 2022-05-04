import { Role } from './../../config/role.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  readonly phone: string;

  @IsEnum(Role)
  readonly role: number;

  @IsNotEmpty()
  @IsNumber()
  readonly status: number;
}
