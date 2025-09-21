import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto, UserData } from './dto/user-response.dto';
import { Role } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.usersRepository.save(newUser);

      const payload = {
        sub: savedUser.id,
        username: savedUser.name,
        email: savedUser.email,
      };
      const accessToken = this.jwtService.sign(payload);

      await this.usersRepository.update(savedUser.id, {
        token: accessToken,
      });

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

  async findAll(): Promise<UserData[]> {
    return this.usersRepository.find({
      select: ['id', 'name', 'email', 'role', 'profession', 'description'],
    });
  }

  async findAllUserRole(role: Role): Promise<UserData[]> {
    return this.usersRepository.find({
      where: { role },
      select: ['id', 'name', 'email', 'role', 'profession', 'description'],
    });
  }

  async findOneUserId(id: number): Promise<UserData | null> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'role', 'profession', 'description'],
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    await this.usersRepository.update(id, updateUserDto);
    const options: FindOneOptions<User> = { where: { id } };

    const user = await this.usersRepository.findOne(options);

    if (!user) {
      return null;
    }
    const {
      id: userId,
      name,
      email,
      role,
      profession,
      description,
      token,
    } = user;
    return {
      user: { id: userId, name, email, role, profession, description },
      token,
    };
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
