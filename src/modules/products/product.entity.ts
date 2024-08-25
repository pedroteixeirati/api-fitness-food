import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'code', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', name: 'status', length: 50 })
  status: string;

  @Column({ type: 'timestamp', name: 'imported_t', default: () => 'CURRENT_TIMESTAMP' })
  imported_t: Date;

  @Column({ type: 'varchar', name: 'url', length: 255 })
  url: string;

  @Column({ type: 'varchar', name: 'creator', length: 50 })
  creator: string;

  @Column({ type: 'timestamp', name: 'created_t', default: () => 'CURRENT_TIMESTAMP' })
  created_t: Date;

  @Column({ type: 'timestamp', name: 'last_modified_t', default: () => 'CURRENT_TIMESTAMP' })
  last_modified_t: Date;

  @Column({ type: 'varchar', name: 'product_name', length: 100 })
  product_name: string;

  @Column({ type: 'varchar', name: 'quantity', length: 50 })
  quantity: string;

  @Column({ type: 'varchar', name: 'brands', length: 50 })
  brands: string;

  @Column({ type: 'text', name: 'categories' })
  categories: string;

  @Column({ type: 'text', name: 'labels' })
  labels: string;

  @Column({ type: 'varchar', name: 'cities', length: 255, nullable: true })
  cities?: string;

  @Column({ type: 'varchar', name: 'purchase_places', length: 255 })
  purchase_places: string;

  @Column({ type: 'varchar', name: 'stores', length: 255 })
  stores: string;

  @Column({ type: 'text', name: 'ingredients_text' })
  ingredients_text: string;

  @Column({ type: 'text', name: 'traces' })
  traces: string;

  @Column({ type: 'varchar', name: 'serving_size', length: 50 })
  serving_size: string;

  @Column({ type: 'decimal', name: 'serving_quantity', precision: 5, scale: 2 })
  serving_quantity: number;

  @Column({ type: 'int', name: 'nutriscore_score' })
  nutriscore_score: number;

  @Column({ type: 'varchar', name: 'nutriscore_grade', length: 1 })
  nutriscore_grade: string;

  @Column({ type: 'varchar', name: 'main_category', length: 50 })
  main_category: string;

  @Column({ type: 'varchar', name: 'image_url', length: 255 })
  image_url: string;
}