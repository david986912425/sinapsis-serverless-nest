import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampaignEntity } from '../campaigns/entities/campaign.entity';
import { MessageController } from './controller/message.controller';
import { MessageEntity } from './entities/message.entity';
import { MessageService } from './service/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, CampaignEntity])],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
