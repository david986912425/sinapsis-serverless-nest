import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsUUID()
  @IsNotEmpty()
  campaign_uuid: string;

  @IsOptional()
  @IsIn([1, 2, 3])
  shipping_status?: number;
}
