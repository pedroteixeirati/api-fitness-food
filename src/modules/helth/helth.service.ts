import { Injectable } from '@nestjs/common';
import { ImportHistoryService } from '../import-history/entities/import-history.service';
import { GenericResponse } from 'src/common/generic-response.interface';
import { IHealthStatus } from './helth.interface';

@Injectable()
export class HealthService {
  constructor(private readonly importHistoryService: ImportHistoryService) {}

  async getHealthStatus(): Promise<GenericResponse<IHealthStatus>> {
    const lastImport = await this.importHistoryService.getLastImportHistory();

    return {
      status: 'sucess',
      data: {
        status: 'OK',
        database: 'connected',
        lastCronExecution: lastImport?.importedAt,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },
    };
  }
}
