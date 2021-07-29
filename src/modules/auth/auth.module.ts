import { JwtStrategy } from './jwt.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthService } from './interfaces/IAuthService';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/UserRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'mdrPACqQ_JHQb9HXpvRf%Oe]{m7~e)',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UserModule,
  ],
  providers: [{ provide: IAuthService, useClass: AuthService }, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
