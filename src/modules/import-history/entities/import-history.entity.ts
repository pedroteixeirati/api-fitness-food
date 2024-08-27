import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('import_history')
export class ImportHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  status: string;

  @Column()
  importedAt: Date;

  @Column({ type: 'text', nullable: true })
  details?: string;
}
