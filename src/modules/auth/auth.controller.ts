import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IAuthService } from './interfaces/IAuthService';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  async signIn(
    @Body() credentiaslsDto: CredentialsDto,
  ): Promise<{ token: string; user: User }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get('/logged-user')
  @UseGuards(AuthGuard())
  getUserLogged(@GetUser() user: User): User {
    return user;
  }
}
