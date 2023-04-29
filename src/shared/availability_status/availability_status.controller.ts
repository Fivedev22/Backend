import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AvailabilityStatusService } from './availability_status.service';

@Controller('availability-status')
export class AvailabilityStatusController {
    constructor(
        private readonly availabilityStatusService: AvailabilityStatusService
    ) { }

    @Get('/')
    findAll() {
        return this.availabilityStatusService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.availabilityStatusService.findOne(+id);
    }
}
