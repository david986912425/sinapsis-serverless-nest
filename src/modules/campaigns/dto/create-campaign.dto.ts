import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'Nombre de la campaña',
    example: 'Campaña de Promoción',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'UUID del usuario que crea la campaña',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;

  @ApiProperty({
    description: 'Lista de números de teléfono',
    example: ['+1234567890', '+1987654321'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phone_list: string[];

  @ApiProperty({
    description: 'Texto del mensaje a enviar',
    example: '¡Hola! Esta es una campaña de prueba.',
  })
  @IsNotEmpty()
  @IsString()
  message_text: string;

  @ApiProperty({
    description: 'Fecha de procesamiento en formato ISO 8601',
    example: '2025-05-05',
  })
  @IsNotEmpty()
  @IsDateString()
  process_date: string;

  @ApiProperty({
    description: 'Hora de procesamiento en formato HH:MM (24 horas)',
    example: '14:30',
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'process_hour must be in HH:MM format',
  })
  process_hour: string;
}
