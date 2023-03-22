import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityStatus } from './activity_status.entity';

@Injectable()
export class ActivityStatusService {
    constructor(
        @InjectRepository(ActivityStatus)
        private readonly activityStatusRepository: Repository<ActivityStatus>
      ) { }
    
      async findAll() {
        const activity_statuses = await this.activityStatusRepository.find({ order: { activity_status_name: 'ASC' } });
        return activity_statuses;
      }
    
      async findOne(id: number) {
        const activity_status = await this.activityStatusRepository.findOne({ where: { id } });
        return activity_status;
      }
}
