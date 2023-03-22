import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { BookingType } from './entities/booking_type.entity';
import { Booking_Origin } from './entities/origin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,BookingType,Booking_Origin])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
