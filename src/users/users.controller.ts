import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto, UserData } from './dto/user-response.dto';
import { Role } from './entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserData[]> {
    return this.usersService.findAll();
  }

  @Get('role/:role')
  findAllRole(@Param('role') role: Role): Promise<UserData[]> {
    return this.usersService.findAllUserRole(role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserData | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const user = await this.usersService.findOneUserId(parsedId);

    if (!user) {
      throw new NotFoundException(`User with ID ${parsedId} not found`);
    }

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const userUpdated = await this.usersService.update(parsedId, updateUserDto);

    if (!userUpdated) {
      throw new NotFoundException(`User with ID ${parsedId} not found`);
    }

    return userUpdated;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
