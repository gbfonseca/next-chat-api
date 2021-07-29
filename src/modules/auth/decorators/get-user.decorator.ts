import { User } from 'src/modules/user/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type RequestType = {
  user: User;
};

export const GetUser = createParamDecorator(
  (_, req: ExecutionContext): User => {
    const request = req.switchToHttp().getRequest<RequestType>();

    return request.user;
  },
);
