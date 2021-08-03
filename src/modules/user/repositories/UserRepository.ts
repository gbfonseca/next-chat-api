import { CredentialsDto } from './../../auth/dto/credentials.dto';
import { User } from './../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { IUserRepository } from './../interfaces/IUserRepository';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
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
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está em uso.');
      }
      throw new BadRequestException('Erro ao cadastrar usuário');
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne(
      { email },
      {
        select: this.getCols(this),
      },
    );

    if (user && (await user.checkPassword(password))) {
      delete user.salt;
      delete user.password;

      return user;
    } else {
      return null;
    }
  }

  private getCols<T>(repository: Repository<T>): (keyof T)[] {
    return repository.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof T)[];
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
