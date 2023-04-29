import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ActivityStatusService } from './activity_status.service';

@Controller('activity-status')
export class ActivityStatusController {
    constructor(
        private readonly activityStatusService: ActivityStatusService
    ) { }

    @Get('/')
    findAll() {
        return this.activityStatusService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.activityStatusService.findOne(+id);
    }
}
