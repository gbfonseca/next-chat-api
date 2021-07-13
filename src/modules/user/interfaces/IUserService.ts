import { CredentialsDto } from './../../auth/dto/credentials.dto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './../dto/create-user.dto';
export abstract class IUserService {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract checkCredentials(credentialsDto: CredentialsDto): Promise<User>;
}
