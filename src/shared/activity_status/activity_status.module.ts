import { Module } from '@nestjs/common';
import { ActivityStatusService } from './activity_status.service';
import { ActivityStatusController } from './activity_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityStatus } from './activity_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityStatus])],
  providers: [ActivityStatusService],
  controllers: [ActivityStatusController]
})
export class ActivityStatusModule {}
