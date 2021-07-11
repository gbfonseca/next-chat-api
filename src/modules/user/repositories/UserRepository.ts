import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from './../interfaces/IUserRepository';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.status === '23505') {
        throw new ConflictException('E-mail já está em uso.');
      }
      throw new BadRequestException('Erro ao cadastrar usuário');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
