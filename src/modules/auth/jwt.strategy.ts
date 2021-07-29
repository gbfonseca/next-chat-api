import { IUserRepository } from './../user/interfaces/IUserRepository';
import { UserRepository } from './../user/repositories/UserRepository';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mdrPACqQ_JHQb9HXpvRf%Oe]{m7~e)',
    });
  }

  async validate(payload: { id: string }) {
    const { id } = payload;
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }
}
