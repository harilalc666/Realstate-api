import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { imageProviders } from './image.provider';

@Module({
  providers: [ImageService, ...imageProviders],
  exports:[ImageService]
})
export class ImageModule {}
