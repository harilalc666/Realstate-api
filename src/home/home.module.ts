import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { homeProviders } from './home.provider';
import { ImageModule } from 'src/image/image.module';
import { imageProviders } from 'src/image/image.provider';
import { UsersModule } from 'src/users/users.module';
import { userProviders } from 'src/users/user.provider';

@Module({
  imports: [ImageModule, UsersModule],
  controllers: [HomeController],
  providers: [HomeService, ...homeProviders, ...imageProviders, ...userProviders],
})
export class HomeModule {}
