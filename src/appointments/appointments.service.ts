import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentResponseDto } from './dto/appointment-response.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new appointment';
  }

  async findAll(): Promise<AppointmentResponseDto[]> {
    return this.appointmentRepository.find({
      select: [
        'id',
        'appointment_date',
        'duration',
        'status',
        'clientId',
        'businessId',
      ],
    });
  }

  async findAllUserClientAppointment(
    userId: number,
  ): Promise<AppointmentResponseDto[]> {
    return this.appointmentRepository.find({
      where: { clientId: userId },
      select: [
        'id',
        'appointment_date',
        'duration',
        'status',
        'clientId',
        'businessId',
      ],
    });
  }

  async findAllUserBusinessAppointment(
    userId: number,
  ): Promise<AppointmentResponseDto[]> {
    return this.appointmentRepository.find({
      where: { businessId: userId },
      select: [
        'id',
        'appointment_date',
        'duration',
        'status',
        'clientId',
        'businessId',
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
