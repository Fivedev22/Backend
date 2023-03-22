import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BookingService } from "../booking/booking.service";

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createBooking(@Body() body) {
        return this.bookingService.createBooking(body);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAllBookings() {
        return this.bookingService.findAllBookings();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOneBooking(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.findOneBooking(+id_booking);
    }


    @Patch('/edit/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateBooking(@Param('id') id_booking, @Body() body) {
        return this.bookingService.updateBooking(id_booking, body);
    }

    
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

    @Delete('/remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeBooking(@Param('id') id_booking) {
      return this.bookingService.removeBooking(id_booking);
    }
}
