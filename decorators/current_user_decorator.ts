import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const currentUser = createParamDecorator(
  (data: never, contect: ExecutionContext) => {
    const request = contect.switchToHttp().getRequest() as Request;
    return request.user && request.user.id;
  },
);
