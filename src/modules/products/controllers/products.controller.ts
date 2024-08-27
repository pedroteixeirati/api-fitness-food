import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { UpdateProductsto } from '../dtos/create-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Put('/:code')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductsto,
  ) {
    return await this.productsService.updateProduct(code, updateProductDto);
  }

  @Delete('/:code')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('code') code: string) {
    return await this.productsService.removeProduct(code);
  }

  @Get('/:code')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('code') code: string) {
    return await this.productsService.getProduct(code);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.productsService.getAllProducts(page, limit);
  }
}
