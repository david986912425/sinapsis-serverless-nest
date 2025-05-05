import { CampaignResponseDto } from '../dto/campaign-response.dto';
import { CampaignEntity } from '../entities/campaign.entity';

export class CampaignResponseMapper {
  static fromEntity(entity: CampaignEntity): CampaignResponseDto {
    return {
      uuid: entity.uuid,
      name: entity.name,
      process_date: entity.process_date,
      process_hour: entity.process_hour,
      process_status: entity.process_status,
      phone_list: entity.phone_list,
      message_text: entity.message_text,
      created_at: entity.created_at,
      deleted_at: entity.deleted_at,
      messages:
        entity.messages?.map((msg) => ({
          uuid: msg.uuid,
          phone: msg.phone,
          text: msg.text,
          shipping_status: msg.shipping_status,
          process_date: msg.process_date,
          process_hour: msg.process_hour,
        })) || [],
      user: entity.user,
    };
  }
}
