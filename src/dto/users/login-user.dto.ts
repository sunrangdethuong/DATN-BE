import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly password: string;
}
