import { CredentialsDto } from './../../auth/dto/credentials.dto';
import { CreateUserDto } from './../dto/create-user.dto';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';

export interface IUserRepository extends Repository<User> {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  checkCredentials(credentialsDto: CredentialsDto): Promise<User>;
}
