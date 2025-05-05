import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilterCampaignDto } from '../../message/dto/filter-campaign.dto';
import { MessageEntity } from '../../message/entities/message.entity';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { CampaignEntity } from '../entities/campaign.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<CampaignEntity> {
    const campaign = this.campaignRepository.create({
      ...createCampaignDto,
      phone_list: createCampaignDto.phone_list.join(','),
      process_status: 1,
      user: { uuid: createCampaignDto.user_uuid },
    });

    return await this.campaignRepository.save(campaign);
  }

  async processPendingCampaigns(): Promise<void> {
    const today = new Date();

    const processDate = new Date().toISOString().split('T')[0];
    const processHour = today.toTimeString().split(':').slice(0, 2).join(':');

    const pendingCampaigns = await this.findPendingCampaigns(
      processDate,
      processHour,
    );

    for (const campaign of pendingCampaigns) {
      await this.markCampaignAsProcessing(campaign);
      const phoneNumbers = this.getPhoneNumbers(campaign.phone_list);

      for (const phone of phoneNumbers) {
        await this.saveMessage(phone, campaign);
      }

      await this.markCampaignAsCompleted(campaign);
    }
  }

  private async findPendingCampaigns(processDate: string, processHour: string) {
    const datetime = `${processDate} ${processHour}`;

    return this.campaignRepository
      .createQueryBuilder('campaign')
      .where('campaign.process_status = :status', { status: 1 })
      .andWhere(
        "STR_TO_DATE(CONCAT(campaign.process_date, ' ', campaign.process_hour), '%Y-%m-%d %H:%i') <= STR_TO_DATE(:datetime, '%Y-%m-%d %H:%i')",
        { datetime },
      )
      .getMany();
  }

  private async markCampaignAsProcessing(
    campaign: CampaignEntity,
  ): Promise<void> {
    campaign.process_status = 2;
    await this.campaignRepository.save(campaign);
  }

  private async markCampaignAsCompleted(
    campaign: CampaignEntity,
  ): Promise<void> {
    campaign.process_status = 3;
    await this.campaignRepository.save(campaign);
  }

  private getPhoneNumbers(phoneList: string): string[] {
    return phoneList
      .split(',')
      .map((phone) => phone.trim())
      .filter(Boolean);
  }

  private async saveMessage(
    phone: string,
    campaign: CampaignEntity,
  ): Promise<void> {
    const randomStatus = Math.random() < 0.5 ? 2 : 3;

    await this.messageRepository.save({
      phone,
      text: campaign.message_text,
      shipping_status: randomStatus,
      process_date: new Date(),
      process_hour: new Date().toTimeString().split(' ')[0],
      campaign,
    });
  }

  async findAll(filterDto: FilterCampaignDto): Promise<CampaignEntity[]> {
    const { startDate, endDate } = filterDto;

    const query = this.campaignRepository.createQueryBuilder('campaign');

    if (startDate) {
      query.andWhere('campaign.created_at >= :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('campaign.created_at <= :endDate', { endDate });
    }

    return query.orderBy('campaign.created_at', 'DESC').getMany();
  }

  async findByUuid(uuid: string): Promise<CampaignEntity | null> {
    return this.campaignRepository.findOne({
      where: { uuid },
      relations: ['messages', 'user'],
    });
  }
}
