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

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentClientDto> {
    const newAppointment = this.appointmentRepository.create({
      ...createAppointmentDto,
    });
    const savedAppointment =
      await this.appointmentRepository.save(newAppointment);

    return this.appointmentRepository.findOne({
      where: { id: savedAppointment.id },
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
      relations: ['business'],
    }) as Promise<AppointmentClientDto>;
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
      order: {
        id: 'DESC',
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
      order: {
        id: 'DESC',
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
