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

import { FilterCampaignDto } from '../../message/dto/filter-campaign.dto';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { CampaignService } from '../service/campaig.service';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    try {
      return await this.campaignService.create(createCampaignDto);
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
  async findAll(@Query() filterDto: FilterCampaignDto) {
    try {
      return this.campaignService.findAll(filterDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error creating campaign',
          error: error instanceof Error ? error.message : 'Error find campaign',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async getCampaign(@Param('uuid') uuid: string) {
    try {
      if (!uuid) {
        throw new HttpException('UUID is required', HttpStatus.BAD_REQUEST);
      }
      return this.campaignService.findByUuid(uuid);
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
