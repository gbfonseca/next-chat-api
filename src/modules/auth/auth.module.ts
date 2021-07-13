import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthService } from './interfaces/IAuthService';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'mdrPACqQ_JHQb9HXpvRf%Oe]{m7~e)',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UserModule,
  ],
  providers: [{ provide: IAuthService, useClass: AuthService }],
  controllers: [AuthController],
})
export class AuthModule {}
