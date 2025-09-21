import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto, UserData } from './dto/user-response.dto';
import { Role } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

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
