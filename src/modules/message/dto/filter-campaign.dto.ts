import { IsISO8601, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterCampaignDto {
  @ApiPropertyOptional({
    description: 'Fecha de inicio para filtrar campañas (ISO 8601)',
    example: '2025-05-01',
  })
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Fecha de fin para filtrar campañas (ISO 8601)',
    example: '2025-05-31',
  })
  @IsOptional()
  @IsISO8601()
  endDate?: string;
}
