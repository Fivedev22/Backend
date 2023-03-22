import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailabilityStatus } from './availability_status.entity';

@Injectable()
export class AvailabilityStatusService {
    constructor(
        @InjectRepository(AvailabilityStatus)
        private readonly availabilityStatusRepository: Repository<AvailabilityStatus>
      ) { }
    
      async findAll() {
        const availability_statuses = await this.availabilityStatusRepository.find({ order: { availability_status_name: 'ASC' } });
        return availability_statuses;
      }
    
      async findOne(id: number) {
        const gender_type = await this.availabilityStatusRepository.findOne({ where: { id } });
        return gender_type;
      }
}
