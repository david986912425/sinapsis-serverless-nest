import { Body, Controller, Post } from '@nestjs/common';

import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageService } from '../service/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
}
