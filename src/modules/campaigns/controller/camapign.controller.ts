import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FilterCampaignDto } from '../../message/dto/filter-campaign.dto';
import { CampaignResponseDto } from '../dto/campaign-response.dto';
import { CampaignSmallResponseDto } from '../dto/campaign-small-response.dto';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { CampaignResponseMapper } from '../mapper/campaign-response.mapper';
import { CampaignSmallResponseMapper } from '../mapper/campaign-small-response.mapper';
import { CampaignService } from '../service/campaig.service';

@ApiTags('Campañas')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva campaña' })
  @ApiCreatedResponse({ type: CampaignSmallResponseDto })
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    try {
      const campaign = await this.campaignService.create(createCampaignDto);

      return CampaignSmallResponseMapper.fromEntity(campaign);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error creating campaign',
          error:
            error instanceof Error ? error.message : 'Error creating campaign',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las campañas' })
  @ApiOkResponse({ type: [CampaignSmallResponseDto] })
  async findAll(@Query() filterDto: FilterCampaignDto) {
    try {
      const campaigns = await this.campaignService.findAll(filterDto);

      return campaigns.map((campaign) =>
        CampaignSmallResponseMapper.fromEntity(campaign),
      );
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al obtener campañas',
          error: error instanceof Error ? error.message : 'Error desconocido',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una campaña' })
  @ApiOkResponse({ type: CampaignResponseDto })
  async getCampaign(@Param('uuid') uuid: string) {
    try {
      if (!uuid) {
        throw new HttpException('UUID is required', HttpStatus.BAD_REQUEST);
      }
      const campaign = await this.campaignService.findByUuid(uuid);

      if (!campaign) {
        throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
      }

      return CampaignResponseMapper.fromEntity(campaign);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error finding campaign',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('process')
  @HttpCode(HttpStatus.OK)
  async processPendingCampaigns(): Promise<void> {
    return this.campaignService.processPendingCampaigns();
  }
}
