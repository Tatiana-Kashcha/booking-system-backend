import { Role } from '../entities/user.entity';

export class UserData {
  id: number;
  name: string;
  email: string;
  role: Role;
  profession?: string;
  description?: string;
}

export class UserResponseDto {
  user: UserData;
  token: string;
}
