import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    public async findAllBookings() {
        return await this.bookingRepository
          .createQueryBuilder('booking')
          .select()
          .getMany();
      }
    
      public async findOneBooking(id_booking) {
        return await this.bookingRepository.findOne({
          where: {
            id_booking: id_booking,
          },
        });
      }
    
      public async createBooking(body) {
        const createBooking = new Booking();
        createBooking.booking_number = body.booking_number;
        createBooking.booking_type = body.booking_type;
        createBooking.booking_origin = body.booking_origin;
        createBooking.client=body.client;
        createBooking.property=body.property;
        createBooking.adults_number=body.adults_number;
        createBooking.kids_number=body.kids_number;
        createBooking.pets_number=body.pets_number;
        createBooking.check_in_date=body.check_in_date;
        createBooking.check_out_date=body.check_out_date;
        createBooking.check_in_hour=body.check_in_hour;
        createBooking.check_out_hour=body.check_out_hour;
        createBooking.starting_price=body.starting_price;
        createBooking.discount=body.discount;
        createBooking.deposit_amount=body.deposit_amount;
        createBooking.estimated_amount_deposit=body.estimated_amount_deposit;
        createBooking.booking_amount=body.booking_amount;
        try {
          const BookingSaved = await this.bookingRepository.save(createBooking);
          return {
            statusCode: 200,
            msg: 'Booking Saved Successfully',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async updateBooking(id_booking, body: Booking) {
        try {
          const EditBooking = await this.bookingRepository.findOne({
            where: {
              id_booking: id_booking,
            },
          });
          EditBooking.booking_number = body.booking_number;
          EditBooking.booking_type = body.booking_type;
          EditBooking.booking_origin = body.booking_origin;
          EditBooking.client=body.client;
          EditBooking.property=body.property;
          EditBooking.adults_number=body.adults_number;
          EditBooking.kids_number=body.kids_number;
          EditBooking.pets_number=body.pets_number;
          EditBooking.check_in_date=body.check_in_date;
          EditBooking.check_out_date=body.check_out_date;
          EditBooking.check_in_hour=body.check_in_hour;
          EditBooking.check_out_hour=body.check_out_hour;
          EditBooking.starting_price=body.starting_price;
          EditBooking.discount=body.discount;
          EditBooking.deposit_amount=body.deposit_amount;
          EditBooking.estimated_amount_deposit=body.estimated_amount_deposit;
          EditBooking.booking_amount=body.booking_amount;
          await this.bookingRepository.save(EditBooking);
          return {
            statusCode: 200,
            msg: 'Booking Updated Successfully.',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async removeBooking(id_booking: number) {
        try {
          await this.bookingRepository.delete({
            id_booking: id_booking,
          });
          return {
            statusCode: 200,
            msg: 'Booking removed successfully.',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
    }

}
