import { Module } from '@nestjs/common';
import { LoadController } from './load.controller';
import { LoadService } from './load.service';
import { loadProviders } from './load.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LoadController],
  providers: [LoadService, ...loadProviders],
})
export class LoadModule {}
