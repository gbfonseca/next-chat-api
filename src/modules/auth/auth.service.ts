import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { IUserService } from '../user/interfaces/IUserService';
import { CredentialsDto } from './dto/credentials.dto';
import { IAuthService } from './interfaces/IAuthService';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userService.checkCredentials(credentialsDto);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    const jwtPayload = {
      id: user.id,
    };

    const token = await this.jwtService.sign(jwtPayload);

    return {
      user,
      token,
    };
  }
}
