import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { userProviders } from './user.provider';


@Module({
  controllers: [AuthController],
  providers: [AuthService, ...userProviders],
  
})
export class UsersModule {}
