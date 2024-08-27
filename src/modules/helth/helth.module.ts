import { Module } from '@nestjs/common';
import { HealthController } from './helth.controller';
import { HealthService } from './helth.service';
import { ImportHistoryModule } from '../import-history/import-history.module';

@Module({
  imports: [ImportHistoryModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
