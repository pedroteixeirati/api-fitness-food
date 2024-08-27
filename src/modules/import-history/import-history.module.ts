import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportHistory } from './entities/import-history.entity';
import { ImportHistoryService } from './entities/import-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImportHistory])],
  providers: [ImportHistoryService],
  exports: [ImportHistoryService],
})
export class ImportHistoryModule {}
