import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CampaignEntity } from '../../campaigns/entities/campaign.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'tinyint', default: 1 })
  shipping_status: number;

  @Column({ type: 'date' })
  process_date: Date;

  @Column({ type: 'time' })
  process_hour: string;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.uuid)
  @JoinColumn({ name: 'campaign_uuid' })
  campaign: CampaignEntity;
}
