import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  AppointmentResponseDto,
  AppointmentClientDto,
  AppointmentBusinessDto,
} from './dto/appointment-response.dto';
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
  ): Promise<AppointmentClientDto[]> {
    return this.appointmentRepository.find({
      where: { clientId: userId },
      relations: { business: true },
      select: {
        id: true,
        appointment_date: true,
        duration: true,
        status: true,
        clientId: true,
        business: {
          id: true,
          name: true,
          email: true,
          profession: true,
        },
      },
    });
  }

  async findAllUserBusinessAppointment(
    userId: number,
  ): Promise<AppointmentBusinessDto[]> {
    return this.appointmentRepository.find({
      where: { businessId: userId },
      relations: { client: true },
      select: {
        id: true,
        appointment_date: true,
        duration: true,
        status: true,
        businessId: true,
        client: {
          id: true,
          name: true,
          email: true,
        },
      },
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
