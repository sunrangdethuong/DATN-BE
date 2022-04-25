import { Role } from './../../config/role.enum';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
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
  @IsBoolean()
  readonly status: boolean;
}
