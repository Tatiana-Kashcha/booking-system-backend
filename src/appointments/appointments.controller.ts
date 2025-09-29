import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentClientDto> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll(): Promise<AppointmentResponseDto[]> {
    return this.appointmentsService.findAll();
  }

  @Get('client')
  async findAllClientAppointment(
    @Request() req,
  ): Promise<AppointmentClientDto[]> {
    return this.appointmentsService.findAllUserClientAppointment(req.user.id);
  }

  @Get('business')
  async findAllBusinessAppointment(
    @Request() req,
  ): Promise<AppointmentBusinessDto[]> {
    return this.appointmentsService.findAllUserBusinessAppointment(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.appointmentsService.updateAppointmentStatus(+id, body.status);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentsService.remove(+id);
  }
}
