import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking_Origin } from './origin.entity';

@Injectable()
export class BookingOriginService {
    constructor(
        @InjectRepository(Booking_Origin)
        private readonly bookingOriginRepository: Repository<Booking_Origin>
      ) { }
    
      async findAll() {
        const booking_origins = await this.bookingOriginRepository.find({
          relations: ['bookings'], 
          order: { origin_name: 'ASC' } });
        return booking_origins;
      }
    
      async findOne(id: number) {
        const booking_origin = await this.bookingOriginRepository.findOne({
          relations: ['bookings'],  
          where: { id } });
        return booking_origin;
      }
}
