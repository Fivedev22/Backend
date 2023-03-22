import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingType } from './booking_type.entity';

@Injectable()
export class BookingTypeService {
    constructor(
        @InjectRepository(BookingType)
        private readonly bookingTypeRepository: Repository<BookingType>
      ) { }
    
      async findAll() {
        const booking_types = await this.bookingTypeRepository.find({ order: { booking_type_name: 'ASC' } });
        return booking_types;
      }
    
      async findOne(id: number) {
        const booking_type = await this.bookingTypeRepository.findOne({ where: { id } });
        return booking_type;
      }
}
