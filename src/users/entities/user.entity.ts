import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';

export enum Role {
  CLIENT = 'client',
  BUSINESS = 'business',
}

@Entity()
@Unique('UQ_user_email', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
  role: Role;

  @Column({ nullable: true })
  profession?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  clientAppointments: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.business)
  businessAppointments: Appointment[];
}
