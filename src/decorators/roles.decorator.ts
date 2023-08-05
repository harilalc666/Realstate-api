import { UserInfo } from 'os';
import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/users/user.entity';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
