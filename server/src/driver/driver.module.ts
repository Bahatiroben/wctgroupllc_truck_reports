import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { driverProviders } from './driver.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DriverController],
  providers: [DriverService, ...driverProviders],
})
export class DriverModule {}
