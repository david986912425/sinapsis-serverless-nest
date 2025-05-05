import { ApiProperty } from '@nestjs/swagger';

export class CampaignSmallResponseDto {
  @ApiProperty() uuid: string;
  @ApiProperty() name: string;
  @ApiProperty() process_date: Date;
  @ApiProperty() process_hour: string;
  @ApiProperty() process_status: number;
  @ApiProperty() phone_list: string;
  @ApiProperty() message_text: string;
  @ApiProperty() created_at: Date;
  @ApiProperty() deleted_at: Date | null;
}
