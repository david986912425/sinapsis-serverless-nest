import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MessageEntity } from '../../message/entities/message.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('campaigns')
export class CampaignEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'date' })
  process_date: Date;

  @Column({ type: 'time' })
  process_hour: string;

  @Column({ type: 'tinyint', default: 1 })
  process_status: number;

  @Column({ length: 255 })
  phone_list: string;

  @Column({ type: 'text' })
  message_text: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => MessageEntity, (message) => message.campaign)
  messages: MessageEntity[];

  @ManyToOne(() => UserEntity, (user) => user.uuid)
  @JoinColumn({ name: 'user_uuid' })
  user: UserEntity;
}
