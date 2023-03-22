import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityStatusController } from './availability_status.controller';
import { AvailabilityStatus } from './availability_status.entity';
import { AvailabilityStatusService } from './availability_status.service';

@Module({
  imports: [TypeOrmModule.forFeature([AvailabilityStatus])],
  controllers: [AvailabilityStatusController],
  providers: [AvailabilityStatusService]
})
export class AvailabilityStatusModule {}
