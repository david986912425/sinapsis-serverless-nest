import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ManyToOne(() => CustomerEntity, (customer) => customer.uuid)
  @JoinColumn({ name: 'customer_uuid' })
  customer: CustomerEntity;
}
