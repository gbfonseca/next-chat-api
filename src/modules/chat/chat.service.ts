import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const { users } = createChatDto;
    const chat = this.chatRepository.create();
    chat.users = users;

    try {
      await chat.save();
      return chat;
    } catch (error) {
      console.log(error);
    }
  }
}
