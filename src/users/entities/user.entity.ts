import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ type: 'enum', enum: ['client', 'business'] })
  role: 'client' | 'business';

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
