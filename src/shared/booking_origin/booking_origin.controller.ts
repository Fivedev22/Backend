import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BookingOriginService } from './booking_origin.service';

@Controller('booking-origin')
export class BookingOriginController {

    constructor(
        private readonly bookingOriginService: BookingOriginService
    ) { }

    @Get('/')
    findAll() {
        return this.bookingOriginService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookingOriginService.findOne(+id);
    }
}
