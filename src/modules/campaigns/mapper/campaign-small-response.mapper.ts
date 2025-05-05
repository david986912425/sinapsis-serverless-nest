import { CampaignSmallResponseDto } from '../dto/campaign-small-response.dto';
import { CampaignEntity } from '../entities/campaign.entity';

export class CampaignSmallResponseMapper {
  static fromEntity(entity: CampaignEntity): CampaignSmallResponseDto {
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
    };
  }
}
