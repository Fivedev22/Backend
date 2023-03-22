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
        CreatePayment.nro_cobro = body.nro_cobro;
        CreatePayment.booking = body.booking;
        CreatePayment.client = body.client;
        CreatePayment.property = body.property;
        CreatePayment.nro_cobro = body.nro_cobro;
        CreatePayment.estado_cobro= body.estado_cobro;
        CreatePayment.fecha_check_in = body.fecha_check_in;
        CreatePayment.fecha_check_out = body.fecha_check_out;
        CreatePayment.monto_reserva = body.monto_reserva;
        CreatePayment.descuento_reserva = body.descuento_reserva;
        CreatePayment.monto_seña = body.monto_seña;
        CreatePayment.subtotal = body.subtotal;
        CreatePayment.total = body.total;
        CreatePayment.payment_type = body.tipo_cobro;
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
          EditPayment.nro_cobro = body.nro_cobro;
          EditPayment.booking = body.booking;
          EditPayment.client = body.client;
          EditPayment.property = body.property;
          EditPayment.nro_cobro = body.nro_cobro;
          EditPayment.estado_cobro= body.estado_cobro;
          EditPayment.fecha_check_in = body.fecha_check_in;
          EditPayment.fecha_check_out = body.fecha_check_out;
          EditPayment.monto_reserva = body.monto_reserva;
          EditPayment.descuento_reserva = body.descuento_reserva;
          EditPayment.monto_seña = body.monto_seña;
          EditPayment.subtotal = body.subtotal;
          EditPayment.total = body.total;
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
