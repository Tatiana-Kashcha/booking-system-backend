import { Role } from '../entities/user.entity';

class UserData {
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
