import { CreateUserDto } from './../dto/create-user.dto';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';

export interface IUserRepository extends Repository<User> {
  createUser(createUserDto: CreateUserDto): Promise<User>;
}
