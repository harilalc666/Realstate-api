import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum PropertyType {
  'Residential',
  'Commercial',
}

class Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  number_of_bedrooms: number;

  @IsNumber()
  @IsPositive()
  number_of_bathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  property_type: string;

  @IsNumber()
  @IsPositive()
  land_size: number;

  @IsArray()
  @ValidateNested({ each: true })
  images: Image;
}

export class updateHomeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number_of_bedrooms?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number_of_bathrooms?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(PropertyType)
  property_type?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  land_size?: number;
}
