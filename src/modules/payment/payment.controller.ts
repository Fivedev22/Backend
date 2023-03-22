import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor (private paymentService: PaymentService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAllPayments() {
        return this.paymentService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOnePayment(@Param('id') id_payment) {
        return this.paymentService.findOne(parseInt(id_payment));
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createPayment(@Body() body) {
        return this.paymentService.create(body);
    }

    @Patch('/edit/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updatePayment(@Param('id')id_payment, @Body() body) {
        return this.paymentService.update(id_payment,body);
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removePayment(@Param('id') id_payment) {
        return this.paymentService.remove(id_payment);
    }
}
