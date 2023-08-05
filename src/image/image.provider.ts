import { Image } from './image.entity';

export const imageProviders = [
  {
    provide: 'IMAGE_REPOSITORY',
    useValue: Image,
  },
];
