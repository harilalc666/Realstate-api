import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsOptional,
} from 'class-validator';

export class SignupDto {
  @IsOptional()
  user_id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^(\+91)?[6-9]\d{9}$/)
  phone_num: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  user_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productkey?: string;
}

export class singinDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class generateProductKeyDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  user_type: string;
}
