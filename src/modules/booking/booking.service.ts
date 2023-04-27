import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
      const numberFound = await this.bookingRepository.findOne({
        relations: ['booking_type', 'booking_origin', 'client', 'property'], 
        where: { booking_number: booking_number } });
      return numberFound;
    }

    public async findAllBookings() {
        const bookings = await this.bookingRepository.find({
          relations: ['booking_type', 'booking_origin', 'client', 'property'],
          where: {is_active: true},
          order: { id_booking: 'ASC'}
        });
        return bookings;
      }

      public async findAllBookingsArchived() {
        const bookings = await this.bookingRepository.find({
          relations: ['booking_type', 'booking_origin', 'client', 'property'],
          where: {is_active: false},
          order: { id_booking: 'ASC'}
        });
        return bookings;
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

      public async findOneBookingArchived(id_booking: number) {
        return await this.bookingRepository.findOne({
          relations: ['booking_type', 'booking_origin', 'client', 'property'],
          where: {
            id_booking: id_booking,
            is_active: false
          },
        });
      }
    
      public async createBooking(createBookingDto: CreateBookingDto) {
        const {check_in_date} = createBookingDto;
      
        if (!await this.checkAvailability(check_in_date)) {
          throw new HttpException('The check-in date is not available', HttpStatus.NOT_ACCEPTABLE);
        }
      
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
      
      private async checkAvailability(check_in_date: string): Promise<boolean> {
        const bookings = await this.bookingRepository.find();
        return !bookings.some(booking => booking.check_in_date === check_in_date);
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
      const booking = await this.bookingRepository.findOne({
        where: { id_booking: id_booking}
      });
      if (!booking) throw new HttpException(`Booking with id ${id_booking} does not exist`, HttpStatus.NOT_FOUND);
      try {
        booking.is_active = false;
        await this.bookingRepository.update(id_booking, booking);
      } catch {
        throw new HttpException('A problem occurred while archiving the booking', HttpStatus.NOT_FOUND);
      }
    }

    async unarchive(id_booking: number) {
      const booking = await this.bookingRepository.findOne({
        where: { 
          id_booking: id_booking, 
          is_active: false}
      });
      if (!booking) throw new HttpException(`Booking with id ${id_booking} does not exist`, HttpStatus.NOT_FOUND);
      try {
        booking.is_active = true;
        await this.bookingRepository.update(id_booking, booking);
      } catch {
        throw new HttpException('A problem occurred while archiving the booking', HttpStatus.NOT_FOUND);
      }
    }

    async GetLastNumber(): Promise<number> {
      const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .orderBy('booking.booking_number', 'DESC')
      .getOne();

      return  booking ? booking.booking_number:1;
    }

    async GetBookingNumber(id_booking: number): Promise<number> {
      const booking = await this.bookingRepository.findOne({
        where: {id_booking: id_booking},
      })
      if (!booking) {
        throw new NotFoundException(`Reservation with id ${id_booking} not found`);
      }
      return booking.booking_number;
    }
}
