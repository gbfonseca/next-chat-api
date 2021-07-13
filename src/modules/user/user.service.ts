import { IUserRepository } from './interfaces/IUserRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/IUserService';
import { UserRepository } from './repositories/UserRepository';
import { CredentialsDto } from '../auth/dto/credentials.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    return await this.userRepository.checkCredentials(credentialsDto);
  }
}
