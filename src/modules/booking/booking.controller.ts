import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BookingService } from "../booking/booking.service";

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Get() 
    findAllBookings() {
        return this.bookingService.findAllBookings();
    }

    @Get('/:id')
    findOneBooking(@Param('id') id_booking) {
        return this.bookingService.findOneBooking(parseInt(id_booking));
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createBooking(@Body() body) {
        return this.bookingService.createBooking(body);
    }

    @Patch('/edit/:id')
    updateBooking(@Param('id') id_booking, @Body() body) {
        return this.bookingService.updateBooking(id_booking, body);
    }

    /*
    @Patch('/archive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    archiveBooking(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.archive(+id_booking);
    }

    @Patch('unarchive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    unarchiveBooking(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.unarchive(+id_booking);
    }
    Falta Completar el servicio primero 
    */


    @Delete('/delete/:id')
    removeBooking(@Param('id') id) {
      return this.bookingService.removeBooking(id);
    }
}
