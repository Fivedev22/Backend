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
        //createBooking.inmueble=body.inmueble;
        createBooking.adults_number=body.adults_number;
        createBooking.kids_number=body.kids_number;
        createBooking.cant_mascotas=body.cant_mascotas;
        createBooking.fecha_check_in=body.fecha_check_in;
        createBooking.fecha_check_out=body.fecha_check_out;
        createBooking.hora_check_in=body.hora_check_in;
        createBooking.hora_check_out=body.hora_check_out;
        createBooking.precio_incial=body.precio_incial;
        createBooking.descuento=body.descuento;
        createBooking.monto_seña=body.monto_seña;
        createBooking.monto_estimado_seña=body.monto_estimado_seña;
        createBooking.monto_reserva=body.monto_reserva;
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
          //EditBooking.inmueble=body.inmueble;
          EditBooking.adults_number=body.adults_number;
          EditBooking.kids_number=body.kids_number;
          EditBooking.cant_mascotas=body.cant_mascotas;
          EditBooking.fecha_check_in=body.fecha_check_out;
          EditBooking.fecha_check_out=body.fecha_check_out;
          EditBooking.hora_check_in=body.hora_check_in;
          EditBooking.hora_check_out=body.hora_check_out;
          EditBooking.precio_incial=body.precio_incial;
          EditBooking.descuento=body.descuento;
          EditBooking.monto_seña=body.monto_seña;
          EditBooking.monto_estimado_seña=body.monto_estimado_seña;
          EditBooking.monto_reserva=body.monto_reserva;
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
