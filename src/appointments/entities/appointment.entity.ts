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

  @ManyToOne(() => User, (user) => user.clientAppointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id', foreignKeyConstraintName: 'FK_clientId' })
  client: User;

  @Column({ name: 'client_id' })
  clientId: number;

  @ManyToOne(() => User, (user) => user.businessAppointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'business_id',
    foreignKeyConstraintName: 'FK_businessId',
  })
  business: User;

  @Column({ name: 'business_id' })
  businessId: number;
  @Column()
  appointment_date: Date;

  @Column()
  duration: number;

  @Column({ default: 'pending' })
  status: string;
}

// pending | confirmed | cancelled | completed | modified
