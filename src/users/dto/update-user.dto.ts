import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../entities/user.entity';

export class UpdateUserDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  role: Role;

  profession?: string;

  description?: string;
}
