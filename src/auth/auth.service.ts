import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { UserResponseDto, UserData } from '../users/dto/user-response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const savedUser = await this.usersService.create(createUserDto);

      const payload = {
        sub: savedUser.id,
        username: savedUser.name,
        email: savedUser.email,
      };
      const accessToken = this.jwtService.sign(payload);

      await this.usersService.updateToken(savedUser.id, accessToken);

      const user = {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        profession: savedUser.profession,
        description: savedUser.description,
      };

      return {
        user,
        token: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(userData: UserData): Promise<UserResponseDto> {
    const payload = {
      sub: userData.id,
      username: userData.name,
      email: userData.email,
    };
    const accessToken = this.jwtService.sign(payload);

    try {
      await this.usersService.updateToken(userData.id, accessToken);

      const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profession: userData.profession,
        description: userData.description,
      };

      return { user, token: accessToken };
    } catch (error) {
      throw error;
    }
  }

  async logout(userId: number) {
    await this.usersService.updateToken(userId, '');
  }

  async getCurrentUser(userId: number): Promise<UserData | null> {
    try {
      const currentUser = await this.usersService.findOneUserId(userId);
      return currentUser;
    } catch (error) {
      throw error;
    }
  }
}
