import { Controller } from '@nestjs/common';
import { IUserService } from './interfaces/IUserService';

@Controller('user')
export class UserController {
  constructor(private readonly userService: IUserService) {}
}
