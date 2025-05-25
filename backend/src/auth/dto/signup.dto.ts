import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  role: 'admin' | 'warehouse' | 'port' | 'agent' | 'user';
}
