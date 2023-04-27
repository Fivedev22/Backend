import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BookingService } from "../booking/booking.service";
import { CreateBookingDto, UpdateBookingDto } from "src/modules/booking/dto";

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createBooking(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.createBooking(createBookingDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAllBookings() {
        return this.bookingService.findAllBookings();
    }

    @Get('/archived')
    @HttpCode(HttpStatus.OK)
    findAllArchived() {
        return this.bookingService.findAllBookingsArchived();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOneBooking(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.findOneBooking(+id_booking);
    }

    @Get('/archived/:id')
    @HttpCode(HttpStatus.OK)
    findOneArchived(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.findOneBookingArchived(+id_booking);
    }


    @Patch('/edit/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateBooking(@Param('id', ParseIntPipe) id_booking: number, @Body() updateBookingDto: UpdateBookingDto) {
        return this.bookingService.updateBooking(+id_booking, updateBookingDto);
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

    @Get('/search/:booking_number')
    @HttpCode(HttpStatus.OK)
    searchByNumber(@Param('booking_number', ParseIntPipe) booking_number: number) {
        return this.bookingService.findByBookingNumber(+booking_number);
    }

    @Get('get-last-number/:')
    @HttpCode(HttpStatus.OK)
    async getNumber(): Promise<number> {
        return this.bookingService.GetLastNumber();
    }

    @Get(':id/booking_number')
    @HttpCode(HttpStatus.OK)
    async getBookingNumber(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.bookingService.GetBookingNumber(id);
    }

}
