import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    async findByBookingNumber(booking_number: number) {
      const numberFound = await this.bookingRepository.findOne({ where: { booking_number } });
      return numberFound;
    }

    public async findAllBookings() {
        return await this.bookingRepository.find({
          relations: ['booking_type', 'booking_origin', 'client', 'property'],
          where: {is_active: true},
          order: { id_booking: 'ASC'}
        })
      }
    
      public async findOneBooking(id_booking: number) {
        return await this.bookingRepository.findOne({
          relations: ['booking_type', 'booking_origin', 'client', 'property'],
          where: {
            id_booking: id_booking,
            is_active: true
          },
        });
      }
    
      public async createBooking(createBookingDto: CreateBookingDto) {
        const {booking_number} = createBookingDto;
        if (await this.findByBookingNumber(booking_number)) throw new HttpException('Repeating booking', HttpStatus.NOT_ACCEPTABLE);
        try {
          await this.bookingRepository.save(createBookingDto);
          return {
            statusCode: 200,
            msg: 'Booking Saved Successfully',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async updateBooking(id_booking: number, updateBookingDto: UpdateBookingDto) {
        if (!await this.findOneBooking(id_booking)) throw new HttpException(`Booking with id ${id_booking} does not exist`, HttpStatus.NOT_FOUND);
        const booking = await this.bookingRepository.preload({ id_booking, ...updateBookingDto});
        try {
          await this.bookingRepository.update(id_booking, booking);
        } catch (error) {
          throw new HttpException('A problem occurred while updating the booking', HttpStatus.NOT_FOUND);
        }
      }
    
      public async removeBooking(id_booking: number) {
        if (!await this.findOneBooking(id_booking)) throw new HttpException(`Booking with id ${id_booking} does not exist`, HttpStatus.NOT_FOUND);
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

    async archive(id_booking: number) {
      const booking = await this.findOneBooking(id_booking);
      if (!booking) throw new HttpException(`Booking with id ${id_booking} does not exist`, HttpStatus.NOT_FOUND);
      try {
        booking.is_active = false;
        await this.bookingRepository.update(id_booking, booking);
      } catch {
        throw new HttpException('A problem occurred while archiving the booking', HttpStatus.NOT_FOUND);
      }
    }

    async unarchive(id_booking: number) {
      const booking = await this.findOneBooking(id_booking);
      if (!booking) throw new HttpException(`Booking with id ${id_booking} does not exist`, HttpStatus.NOT_FOUND);
      try {
        booking.is_active = true;
        await this.bookingRepository.update(id_booking, booking);
      } catch {
        throw new HttpException('A problem occurred while archiving the booking', HttpStatus.NOT_FOUND);
      }
    }

}
