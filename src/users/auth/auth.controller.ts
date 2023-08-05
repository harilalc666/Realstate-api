import {
  Controller,
  Body,
  Post,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { SignupDto, singinDto, generateProductKeyDto } from '../dtos/auth.dto';
import { UserType } from '../user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userType')
  async signup(@Body() body: SignupDto, @Param('userType') userType: UserType) {
    if (userType !== UserType.Buyer) {
      if (!body.productkey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.email}-${body.user_type}-${process.env.PRODUCT_KEY_SECRET}`;

      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productkey,
      );

      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }
    return this.authService.signup(body);
  }

  // login existing user
  @Post('/signin')
  async signin(@Body() body: singinDto) {
    return this.authService.signin(body);
  }

  @Post('key')
  generateProductKey(@Body() { email, user_type }: generateProductKeyDto) {
    return this.authService.generateProductKey(email, user_type);
  }
}
