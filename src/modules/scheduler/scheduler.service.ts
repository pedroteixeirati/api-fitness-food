import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProductsService } from '../products/services/products.service';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ImportHistoryService } from '../import-history/entities/import-history.service';

@Injectable()
export class SchedulerService {
  private readonly baseUrl = 'https://challenges.coode.sh/food/data/json/';
  private readonly tmpDir = path.join(__dirname, '../../tmp');

  constructor(
    private readonly productsService: ProductsService,
    private readonly importHistoryService: ImportHistoryService,
  ) {}

  @Cron('0 0 * * *')
  async handleCron() {
    try {
      if (!(await this.directoryExists(this.tmpDir))) {
        await fs.mkdir(this.tmpDir, { recursive: true });
      }

      const fileListResponse = await axios.get(`${this.baseUrl}index.txt`);
      const fileList = fileListResponse.data
        .split('\n')
        .filter((line) => line.trim() !== '');

      for (const file of fileList) {
        const fileUrl = `${this.baseUrl}${file}`;
        const response = await axios.get(fileUrl);
        const data = response.data;

        const filePath = path.join(this.tmpDir, file);
        await fs.writeFile(filePath, JSON.stringify(data));

        await this.productsService.importDataFromFile(filePath);

        await this.importHistoryService.create({
          fileName: file,
          status: 'success',
          importedAt: new Date(),
          details: 'Importação concluída com sucesso.',
        });

        await fs.unlink(filePath);
      }

      console.log('Importação concluída com sucesso.');
    } catch (error) {
      console.error('Erro ao importar dados:', error);
    }
  }

  private async directoryExists(directoryPath: string): Promise<boolean> {
    try {
      await fs.access(directoryPath);
      return true;
    } catch {
      return false;
    }
  }
}
