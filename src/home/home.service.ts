import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Home } from './home.entity';
import { PropertyType } from './dto/home.dto';
import { Image } from 'src/image/image.entity';
import { HOME_REPOSITORY, IMAGE_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/user.entity';

interface getHomeParams {
  city?: string;
  price?: {
    minPrice?: number;
    maxPrice?: number;
  };
  property_type?: string;
}

interface createHomeParams {
  address: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  city: string;
  price: number;
  property_type: string;
  land_size: number;
}

interface updateHomeParams {
  address?: string;
  number_of_bedrooms?: number;
  number_of_bathrooms?: number;
  city?: string;
  price?: number;
  property_type?: string;
  land_size?: number;
}

@Injectable()
export class HomeService {
  constructor(
    @Inject(HOME_REPOSITORY) private readonly homeRepository: typeof Home,
    @Inject(IMAGE_REPOSITORY) private readonly imageRepository: typeof Image,
  ) {}

  // fetching records from Home table based on filter or all
  async getHomes(filter: getHomeParams): Promise<Home[]> {
    const whereClause: any = {};

    if (filter.city) {
      whereClause.city = filter.city;
    }

    if (filter.price) {
      const { minPrice, maxPrice } = filter.price;
      whereClause.price = {};
      ('undefined');

      if ('undefined' == undefined) {
        whereClause.price[Op.gte] = minPrice;
      }

      if (maxPrice !== undefined) {
        whereClause.price[Op.lte] = maxPrice;
      }
    }

    if (filter.property_type) {
      whereClause.property_type = filter.property_type;
    }

    const homes = await this.homeRepository.findAll({
      where: whereClause,
    });

    if (!homes.length) {
      throw new NotFoundException();
    }
    return homes;
  }

  // adding new records in Home table
  async createHome(data: any, userId: number): Promise<Home> {
    try {
      const newhomes = await this.homeRepository.create({
        address: data.address,
        price: data.price,
        land_size: data.land_size,
        property_type: data.property_type,
        number_of_bathrooms: data.number_of_bathrooms,
        number_of_bedrooms: data.number_of_bedrooms,
        city: data.city,
        user_id: userId,
      });

      const homeImages = data.images.map((image) => {
        return { ...image, home_id: newhomes.home_id };
      });

      await this.imageRepository.bulkCreate(homeImages);

      return newhomes;
    } catch (error) {
      throw new error();
    }
  }

  // get single home
  async getHomeById(id: number) {
    const result = await this.homeRepository.findOne({
      where: {
        home_id: id,
      },
    });
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  // update Home
  async updateHomeById(id: number, data: updateHomeParams) {
    try {
      return await this.homeRepository.update(data, {
        where: {
          home_id: id,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // delete home

  async deleteHomeById(id: number) {
    const existRecord = await this.homeRepository.findByPk(id);
    if (!existRecord) {
      throw new NotFoundException();
    }
    const result = this.homeRepository.destroy({
      where: {
        home_id: id,
      },
    });
    return result;
  }

  async getUserIdByHomeId(id: number) {
    const home = await this.homeRepository.findOne({
      where: {
        home_id: id,
      },
    });
    if (!home) {
      throw new NotFoundException('No records found to delete');
    }

    return home;
  }
}
