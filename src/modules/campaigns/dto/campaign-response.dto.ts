import { ApiProperty } from '@nestjs/swagger';

class MessageDto {
  @ApiProperty() uuid: string;
  @ApiProperty() phone: string;
  @ApiProperty() text: string;
  @ApiProperty() shipping_status: number;
  @ApiProperty() process_date: Date;
  @ApiProperty() process_hour: string;
}

class UserDto {
  @ApiProperty() uuid: string;
  @ApiProperty() username: string;
  @ApiProperty() status: boolean;
}

export class CampaignResponseDto {
  @ApiProperty() uuid: string;
  @ApiProperty() name: string;
  @ApiProperty() process_date: Date;
  @ApiProperty() process_hour: string;
  @ApiProperty() process_status: number;
  @ApiProperty() phone_list: string;
  @ApiProperty() message_text: string;
  @ApiProperty() created_at: Date;
  @ApiProperty() deleted_at: Date | null;
  @ApiProperty({ type: [MessageDto] }) messages: MessageDto[];
  @ApiProperty({ type: UserDto }) user: UserDto;
}
