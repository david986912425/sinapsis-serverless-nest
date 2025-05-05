import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phone_list: string[];

  @IsNotEmpty()
  @IsString()
  message_text: string;

  @IsNotEmpty()
  @IsDateString()
  process_date: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'process_hour must be in HH:MM format',
  })
  process_hour: string;
}
