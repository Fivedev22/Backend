import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AvailabilityStatus } from './availability_status.entity';

@Injectable()
export class AvailabilityStatusService {
    constructor(
        @InjectRepository(AvailabilityStatus)
        private readonly availabilityStatusRepository: Repository<AvailabilityStatus>
      ) { }
    
      async findAll() {
        const availability_statuses = await this.availabilityStatusRepository.find({
          relations: ['properties'], 
          order: { availability_status_name: 'ASC' } });
        return availability_statuses;
      }
    
      async findOne(id: number) {
        const availability_status = await this.availabilityStatusRepository.findOne({
          relations: ['properties'],  
          where: { id } });
        return availability_status;
      }      
}
