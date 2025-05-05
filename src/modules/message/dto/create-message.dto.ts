import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Número de teléfono al que se enviará el mensaje',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: 'UUID de la campaña a la que pertenece el mensaje',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  campaign_uuid: string;

  @ApiPropertyOptional({
    description:
      'Estado de envío del mensaje (1: pendiente, 2: enviado, 3: fallido)',
    example: 1,
    enum: [1, 2, 3],
  })
  @IsOptional()
  @IsIn([1, 2, 3])
  shipping_status?: number;
}
