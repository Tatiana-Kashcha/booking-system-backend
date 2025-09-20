import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.clientAppointments)
  @JoinColumn({
    name: 'client_id',
    foreignKeyConstraintName: 'FK_clientId',
  })
  client: User;

  @ManyToOne(() => User, (user) => user.businessAppointments)
  @JoinColumn({
    name: 'business_id',
    foreignKeyConstraintName: 'FK_businessId',
  })
  business: User;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column({ default: 'pending' })
  status: string; // pending | confirmed | cancelled
}
