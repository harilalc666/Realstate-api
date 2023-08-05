import {
  Injectable,
  Inject,
  NotAcceptableException,
  HttpException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../user.entity';
import { USER_REPOSITORY } from 'src/core/constants';

interface signupParamas {
  user_id?: number;
  name: string;
  email: string;
  password: string;
  phone_num: string;
  user_type: string;
}

interface singinParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  // New user
  async signup(body: signupParamas) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (existUser) {
      throw new NotAcceptableException('User with email ID already Exist');
    }

    const hashpassword = await bcrypt.hash(body.password, 10);

    const user = await this.userRepository.create<User>({
      name: body.name,
      email: body.email,
      phone_num: body.phone_num,
      password: hashpassword,
      user_type: body.user_type,
    });
    const { name, email } = user;
    const token = await this.generateJWT(user.name, user.user_id);
    return { name, email, token };
  }

  // login validation
  async signin(body: singinParams) {
    const userExist = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (!userExist) {
      throw new HttpException('Invalid credentials', 400);
    }

    const isValidPassword = await bcrypt.compare(
      body.password,
      userExist.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    return this.generateJWT(userExist.email, userExist.user_id);
  }

  // token generation
  private async generateJWT(name: string, id: number) {
    return jwt.sign({ name, id }, process.env.JSON_TOKEN_KEY, {
      expiresIn: '1h',
    });
  }

  // generate Product key
  async generateProductKey(email: string, user_type: string) {
    const token = `${email}-${user_type}-${process.env.PRODUCT_KEY_SECRET}`;
    return await bcrypt.hash(token, 10);
  }
}
