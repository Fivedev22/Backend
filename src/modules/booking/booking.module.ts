import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { Car } from './entities/car.entity';
import { Contract } from './entities/contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,Contract,Car])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
