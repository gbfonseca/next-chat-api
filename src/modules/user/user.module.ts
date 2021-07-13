import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/UserRepository';
import { IUserService } from './interfaces/IUserService';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [{ provide: IUserService, useClass: UserService }],
  exports: [{ provide: IUserService, useClass: UserService }],
})
export class UserModule {}
