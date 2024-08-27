import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { mockProduct } from '../tests/mocks/product.mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const productsArray = [mockProduct];
      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValue([[mockProduct], 1]);

      const result = await service.getAllProducts();
      expect(result.data).toEqual(productsArray);
    });
  });

  describe('getProduct', () => {
    it('should return a product if found', async () => {
      const product = mockProduct;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockProduct);

      const result = await service.getProduct('123');
      expect(result.data).toEqual(product);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.getProduct('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
