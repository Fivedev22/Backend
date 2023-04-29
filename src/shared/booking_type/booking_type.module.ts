import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingTypeController } from './booking_type.controller';
import { BookingType } from './booking_type.entity';
import { BookingTypeService } from './booking_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingType])],
  controllers: [BookingTypeController],
  providers: [BookingTypeService]
})
export class BookingTypeModule {}
