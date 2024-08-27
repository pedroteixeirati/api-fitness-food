import { Product } from '../../entities/product.entity';
import { ProductStatus } from '../../enums/products-status.enum';

export const mockProduct: Product = {
  id: 1,
  code: '123456789',
  status: ProductStatus.PUBLISHED,
  imported_t: new Date(),
  url: 'http://example.com/product',
  creator: 'creator_name',
  created_t: new Date(),
  last_modified_t: new Date(),
  product_name: 'Product Name',
  quantity: '500g',
  brands: 'Brand Name',
  categories: 'Category1,Category2',
  labels: 'Label1,Label2',
  cities: 'City Name',
  purchase_places: 'Store Name',
  stores: 'Store Name',
  ingredients_text: 'Ingredients',
  traces: 'Traces',
  serving_size: '50g',
  serving_quantity: 50,
  nutriscore_score: 10,
  nutriscore_grade: 'A',
  main_category: 'Main Category',
  image_url: 'http://example.com/image.jpg',
};
