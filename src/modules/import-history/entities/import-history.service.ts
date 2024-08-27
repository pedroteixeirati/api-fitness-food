import { InjectRepository } from '@nestjs/typeorm';
import { ImportHistory } from './import-history.entity';
import { Repository } from 'typeorm';

export class ImportHistoryService {
  constructor(
    @InjectRepository(ImportHistory)
    private readonly importHistoryRepository: Repository<ImportHistory>,
  ) {}

  async create(
    importHistoryData: Partial<ImportHistory>,
  ): Promise<ImportHistory> {
    try {
      const importHistory =
        this.importHistoryRepository.create(importHistoryData);
      return await this.importHistoryRepository.save(importHistory);
    } catch (error) {
      throw new Error(`Error creating import history: ${error}`);
    }
  }

  async getLastImportHistory(): Promise<ImportHistory | null> {
    const [lastImport] = await this.importHistoryRepository.find({
      order: { importedAt: 'DESC' },
      take: 1,
    });

    return lastImport || null;
  }
}
