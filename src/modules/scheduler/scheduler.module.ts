import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { ProductsModule } from '../products/products.module';
import { ImportHistoryModule } from '../import-history/import-history.module';

@Module({
  imports: [ScheduleModule.forRoot(), ProductsModule, ImportHistoryModule],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
