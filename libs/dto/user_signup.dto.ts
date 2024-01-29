import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
export class UserSignupDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  name: string;
}
