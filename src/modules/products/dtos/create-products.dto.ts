import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class UpdateProductsto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;

  @IsNotEmpty()
  @IsString()
  brands: string;

  @IsNotEmpty()
  @IsString()
  categories: string;

  @IsNotEmpty()
  @IsString()
  labels: string;

  @IsOptional()
  @IsString()
  cities?: string;

  @IsNotEmpty()
  @IsString()
  purchase_places: string;

  @IsNotEmpty()
  @IsString()
  stores: string;

  @IsNotEmpty()
  @IsString()
  ingredients_text: string;

  @IsNotEmpty()
  @IsString()
  traces: string;

  @IsNotEmpty()
  @IsString()
  serving_size: string;

  @IsNotEmpty()
  @IsNumber()
  serving_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  nutriscore_score: number;

  @IsNotEmpty()
  @IsString()
  nutriscore_grade: string;

  @IsNotEmpty()
  @IsString()
  main_category: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;
}
