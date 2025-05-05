import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageEntity } from '../message/entities/message.entity';
import { CampaignController } from './controller/camapign.controller';
import { CampaignEntity } from './entities/campaign.entity';
import { CampaignService } from './service/campaig.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, CampaignEntity])],
  providers: [CampaignService],
  controllers: [CampaignController],
})
export class CampaignsModule {}
