import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDTO } from './dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>) {}

    async findByPaymentNumber(payment_number: number) {
      const paymentFound = await this.paymentRepository.findOne({ where: { payment_number } });
      return paymentFound;
    }  
    
    public async findAll() {
        const payments = await this.paymentRepository.find({
          relations: ['booking', 'client', 'property', 'payment_type', 'payment_status'],
          where: {is_active: true},
          order: {id_payment: 'ASC'}
        });
        return payments;
      }
    
      public async findOne(id_payment: number) {
        return await this.paymentRepository.findOne({
          relations: ['booking', 'client', 'property', 'payment_type', 'payment_status'],
          where: {
            id_payment: id_payment,
            is_active: true
          }
        });
      }
    
      public async create(createPaymentDto: CreatePaymentDTO) {
        const {payment_number} = createPaymentDto;
        if (await this.findByPaymentNumber(payment_number)) throw new HttpException('Repeating payment', HttpStatus.NOT_ACCEPTABLE);
        try {
          await this.paymentRepository.save(createPaymentDto);
          return {
            statusCode: 200,
            msg: 'Payment Saved Successfully',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async update(id_payment: number, updatePaymentDto: UpdatePaymentDto) {
        if (!await this.findOne(id_payment)) throw new HttpException(`Payment with id ${id_payment} does not exist`, HttpStatus.NOT_FOUND);
        const payment = await this.paymentRepository.preload({ id_payment, ...updatePaymentDto});
        try {
          await this.paymentRepository.update(id_payment, payment);
        } catch (error) {
          throw new HttpException('A problem occurred while updating the payment', HttpStatus.NOT_FOUND);
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

      async archive(id_payment: number) {
        const payment = await this.findOne(id_payment);
        if (!payment) throw new HttpException(`Payment with id ${id_payment} does not exist`, HttpStatus.NOT_FOUND);
        try {
          payment.is_active = false;
          await this.paymentRepository.update(id_payment, payment);
        } catch {
          throw new HttpException('A problem occurred while archiving the payment', HttpStatus.NOT_FOUND);
        }
      }
    
      async unarchive(id_payment: number) {
        const payment = await this.paymentRepository.findOne({
          where: {id_payment, is_active: false}
        });
        if (!payment) throw new HttpException(`Payment with id ${id_payment} does not exist`, HttpStatus.NOT_FOUND);
        try {
          payment.is_active = true;
          await this.paymentRepository.update(id_payment, payment);
        } catch {
          throw new HttpException('A problem occurred while unarchiving the payment', HttpStatus.NOT_FOUND);
        }
      }
}
