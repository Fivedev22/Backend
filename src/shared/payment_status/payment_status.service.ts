import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentStatus } from './payment_status.entity';

@Injectable()
export class PaymentStatusService {
    constructor(
        @InjectRepository(PaymentStatus)
        private readonly paymentStatusRepository: Repository<PaymentStatus>
      ) { }
    
      async findAll() {
        const payment_statuses = await this.paymentStatusRepository.find({ order: { payment_status_name: 'ASC' } });
        return payment_statuses;
      }
    
      async findOne(id_payment_status: number) {
        const payment_status = await this.paymentStatusRepository.findOne({ where: { id_payment_status } });
        return payment_status;
      }
}
