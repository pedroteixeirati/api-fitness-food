import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductStatus } from '../enums/products-status.enum';
import { GenericResponse } from 'src/common/generic-response.interface';
import * as fs from 'fs/promises';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getAllProducts(
    page: number = 1,
    limit: number = 10,
  ): Promise<GenericResponse<Product[]>> {
    const [products] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!products) throw new Error(`Products not found`);
    return { status: 'success', data: products };
  }

  async getProduct(code: string): Promise<GenericResponse<Product>> {
    const product = await this.productsRepository.findOne({
      where: { code },
    });
    if (!product) throw new NotFoundException(`Product ${code} not found`);
    return { status: 'success', data: product };
  }

  async updateProduct(
    code: string,
    updateProductDto: Partial<Product>,
  ): Promise<GenericResponse<Product>> {
    const product = await this.productsRepository.findOne({
      where: { code },
    });
    if (!product) {
      throw new NotFoundException(`Product with code ${code} not found.`);
    }

    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productsRepository.save(product);
    return {
      status: 'success',
      data: updatedProduct,
    };
  }

  async removeProduct(code: string): Promise<GenericResponse<Product>> {
    const product = await this.productsRepository.findOne({
      where: { code },
    });
    if (!product) {
      throw new NotFoundException(`Product with code ${code} not found.`);
    }

    product.status = ProductStatus.TRASH;
    await this.productsRepository.save(product);
    return { status: 'removed' };
  }

  async importDataFromFile(filePath: string): Promise<GenericResponse<string>> {
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      const products: Product[] = JSON.parse(fileData);
      if (!Array.isArray(products)) {
        throw new Error('Os dados do arquivo não são um array.');
      }
      const validatedProducts = products.map((product) => ({
        ...product,
        status: ProductStatus.PUBLISHED,
      }));

      await Promise.all(
        validatedProducts.map(async (product) => {
          await this.productsRepository.save(product);
        }),
      );

      console.log('Dados importados com sucesso.');
      return {
        status: 'success',
        data: 'Dados importados com sucesso..',
      };
    } catch (error) {
      console.error('Erro ao importar dados do arquivo:', error);
      throw new Error('Falha na importação de dados.');
    }
  }
}
