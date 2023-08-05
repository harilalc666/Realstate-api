import {
  CanActivate,
  Injectable,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/user.entity';

interface payLoadType {
  name: string;
  id: number;
  iat: number;
  exp: number;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
  async canActivate(context: ExecutionContext) {
    // 1) Determine the userType that can execute the called endpoint
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles.length) {
      // 2) Grab the JWT from the request header and verify it
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization?.split('Bearer ')[1];

      try {
        const payload = (await jwt.verify(
          token,
          process.env.JSON_TOKEN_KEY,
        )) as payLoadType;

        const user = await this.userRepository.findByPk(payload.id);

        if (!user) {
          return false;
        }

        if (roles.includes(user.user_type)) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    }

    return true;
  }
}
