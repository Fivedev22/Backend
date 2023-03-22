import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BookingTypeService } from './booking_type.service';

@Controller('booking-type')
export class BookingTypeController {

    constructor(
        private readonly bookingTypeService: BookingTypeService
    ) { }

    @Get('/')
    findAll() {
        return this.bookingTypeService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookingTypeService.findOne(+id);
    }
}
