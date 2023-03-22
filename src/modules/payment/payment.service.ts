import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
      ) {}

      public async findAll() {
        return await this.paymentRepository
          .createQueryBuilder('payment')
          .select()
          .getMany();
      }
    
      public async findOne(id_payment) {
        return await this.paymentRepository.findOne({
          where: {
            id_payment: id_payment,
          },
        });
      }
    
      public async create(body) {
        const CreatePayment = new Payment();
        CreatePayment.payment_number = body.payment_number;
        CreatePayment.booking = body.booking;
        CreatePayment.client = body.client;
        CreatePayment.property = body.property;
        CreatePayment.payment_status= body.payment_status;
        CreatePayment.check_in_date = body.check_in_date;
        CreatePayment.check_out_date = body.check_out_date;
        CreatePayment.booking_amount = body.booking_amount;
        CreatePayment.booking_discount = body.booking_discount;
        CreatePayment.deposit_amount = body.deposit_amount;
        CreatePayment.payment_amount_subtotal = body.payment_amount_subtotal;
        CreatePayment.payment_amount_total = body.payment_amount_total;
        CreatePayment.payment_type = body.payment_type;
        try {
          const PaymentSaved = await this.paymentRepository.save(CreatePayment);
          return {
            statusCode: 200,
            msg: 'Payment Saved Successfully',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async update(id_payment, body: Payment) {
        try {
          const EditPayment = await this.paymentRepository.findOne({
            where: {
              id_payment: id_payment,
            },
          });
          EditPayment.payment_number = body.payment_number;
          EditPayment.booking = body.booking;
          EditPayment.client = body.client;
          EditPayment.property = body.property;
          EditPayment.payment_status= body.payment_status;
          EditPayment.check_in_date = body.check_in_date;
          EditPayment.check_out_date = body.check_out_date;
          EditPayment.booking_amount = body.booking_amount;
          EditPayment.booking_discount = body.booking_discount;
          EditPayment.deposit_amount = body.deposit_amount;
          EditPayment.payment_amount_subtotal = body.payment_amount_subtotal;
          EditPayment.payment_amount_total = body.payment_amount_total;
          EditPayment.payment_type = body.payment_type;
          EditPayment.payment_type = body.payment_type;
          await this.paymentRepository.save(EditPayment);
          return {
            statusCode: 200,
            msg: 'Payment Updated Successfully.',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async remove(id_payment: number) {
        try {
          await this.paymentRepository.delete({
            id_payment: id_payment,
          });
          return {
            statusCode: 200,
            msg: 'Payment Removed Successfully.',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
}
