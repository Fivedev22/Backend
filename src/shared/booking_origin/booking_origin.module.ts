import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingOriginController } from './booking_origin.controller';
import { BookingOriginService } from './booking_origin.service';
import { Booking_Origin } from './origin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking_Origin])],
  controllers: [BookingOriginController],
  providers: [BookingOriginService]
})
export class BookingOriginModule {}
