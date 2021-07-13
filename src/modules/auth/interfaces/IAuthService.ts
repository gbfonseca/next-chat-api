import { CredentialsDto } from './../dto/credentials.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from './../../user/dto/create-user.dto';
export abstract class IAuthService {
  abstract signUp(createUserDto: CreateUserDto): Promise<User>;
  abstract signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ user: User; token: string }>;
}
