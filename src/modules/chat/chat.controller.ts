import { CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/create')
  async create(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.create(createChatDto);
  }
}
