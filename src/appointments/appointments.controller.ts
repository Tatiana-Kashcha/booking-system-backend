import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  AppointmentResponseDto,
  AppointmentClientDto,
  AppointmentBusinessDto,
} from './dto/appointment-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll(): Promise<AppointmentResponseDto[]> {
    return this.appointmentsService.findAll();
  }

  @Get('client/:userId')
  findAllClientAppointment(
    @Param('userId') userId: number,
  ): Promise<AppointmentClientDto[]> {
    return this.appointmentsService.findAllUserClientAppointment(userId);
  }

  @Get('business/:userId')
  findAllBusinessAppointment(
    @Param('userId') userId: number,
  ): Promise<AppointmentBusinessDto[]> {
    return this.appointmentsService.findAllUserBusinessAppointment(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
