import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';

@Controller('payment-status')
export class PaymentStatusController {
    constructor(
        private readonly paymentStatusService: PaymentStatusService
    ) { }

    @Get('/')
    findAll() {
        return this.paymentStatusService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id_payment_status: number) {
        return this.paymentStatusService.findOne(+id_payment_status);
    }
}
