import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';

@Controller('payment-type')
export class PaymentTypeController {

    constructor(
        private readonly paymentTypeService: PaymentTypeService
    ) { }

    @Get('/')
    findAll() {
        return this.paymentTypeService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.paymentTypeService.findOne(+id);
    }
}
