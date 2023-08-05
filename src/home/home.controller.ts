import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Query,
  UseInterceptors,
  Body,
  Param,
  ParseIntPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { Home } from './home.entity';
import { ResponseInterceptor } from './response.interceptor';
import { CreateHomeDto, updateHomeDto } from './dto/home.dto';
import { UserType } from 'src/users/user.entity';
import { User, userInfo } from 'src/users/decorators/user.decorator';
import { AuthGuard } from 'src/users/guards/auth.gaurd';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // Fetch all Homes
  @Get()
  @UseInterceptors(ResponseInterceptor)
  getAllHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('propertyType') property_type?: string,
  ): Promise<Home[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { minPrice }),
            ...(maxPrice && { maxPrice }),
          }
        : undefined;

    const filter = {
      ...(city && { city }),
      ...(price && { price }),
      ...(property_type && { property_type }),
    };

    return this.homeService.getHomes(filter);
  }

  // Fetch single Home
  @Get(':id')
  // @UseInterceptors(ResponseInterceptor)
  async getHomeById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.homeService.getHomeById(id);
    return result;
  }

  // Add new Home
  @Roles(UserType.Admin)
  @UseGuards(AuthGuard)
  @Post()
  // @UseInterceptors(ResponseInterceptor)
  createHome(@Body() body: CreateHomeDto, @User() userId: userInfo) {
    return this.homeService.createHome(body, userId.id);
  }

  // Update existing home details
  @Put(':id')
  async updateHome(
    @Body() body: updateHomeDto,
    @Param('id', ParseIntPipe) id: number,
    @User() userId: userInfo,
  ) {
    // validating whether requesting user can perform operation on it or not
    const home = await this.homeService.getUserIdByHomeId(id);
    if (home.user_id !== userId.id) {
      throw new UnauthorizedException(
        'Not authorized to perform action on this home',
      );
    }
    return await this.homeService.updateHomeById(id, body);
  }

  // Delete record
  @Delete(':id')
  async deleteHomeById(
    @Param('id', ParseIntPipe) id: number,
    @User() userId: userInfo,
  ) {
    // validating whether requesting user can perform operation on it or not
    const home = await this.homeService.getUserIdByHomeId(id);
    if (home.user_id !== userId.id) {
      throw new UnauthorizedException(
        'Not authorized to perform action on this home',
      );
    }
    return this.homeService.deleteHomeById(id);
  }
}
