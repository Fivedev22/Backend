import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreatePaymentDTO } from './dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor (private paymentService: PaymentService) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createPayment(@Body() createPaymentDto: CreatePaymentDTO) {
        return this.paymentService.create(createPaymentDto);
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAllPayments() {
        return this.paymentService.findAll();
    }

    @Get('/paid')
    @HttpCode(HttpStatus.OK)
    findAllPaymentsPaid() {
        return this.paymentService.findAllCobrados();
    }

    @Get('/archived')
    @HttpCode(HttpStatus.OK)
    findAllPaymentsArchived() {
        return this.paymentService.findAllArchived();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOnePayment(@Param('id', ParseIntPipe) id_payment: number) {
        return this.paymentService.findOne(+id_payment);
    }

    @Get('/archived/:id')
    @HttpCode(HttpStatus.OK)
    findOnePaymentArchived(@Param('id', ParseIntPipe) id_payment: number) {
        return this.paymentService.findOneArchived(+id_payment);
    }

    @Patch('/update/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updatePayment(@Param('id', ParseIntPipe) id_payment: number, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentService.update(+id_payment,updatePaymentDto);
    }

    @Patch('/archive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    archivePayment(@Param('id', ParseIntPipe) id_payment: number) {
        return this.paymentService.archive(+id_payment);
    }

    @Patch('unarchive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    unarchivePayment(@Param('id', ParseIntPipe) id_payment: number) {
        return this.paymentService.unarchive(+id_payment);
    }

    @Delete('/remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removePayment(@Param('id') id_payment) {
        return this.paymentService.remove(id_payment);
    }

    @Get('/search/:payment_number')
    @HttpCode(HttpStatus.OK)
    searchByNumber(@Param('payment_number', ParseIntPipe) payment_number: number) {
        return this.paymentService.findByPaymentNumber(+payment_number);
    }

    @Get('get-last-number/:')
    @HttpCode(HttpStatus.OK)
    async getNumber(): Promise<number> {
        return this.paymentService.GetLastNumber();
    }
}
