import { Home } from 'src/home/home.entity';

export const homeProviders = [
  {
    provide: 'HOME_REPOSITORY',
    useValue: Home,
  },
];
