import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentType } from './payment_type.entity';

@Injectable()
export class PaymentTypeService {
    constructor(
        @InjectRepository(PaymentType)
        private readonly paymentTypeRepository: Repository<PaymentType>
      ) { }
    
      async findAll() {
        const payment_types = await this.paymentTypeRepository.find({ order: { payment_type_name: 'ASC' } });
        return payment_types;
      }
    
      async findOne(id: number) {
        const payment_type = await this.paymentTypeRepository.findOne({ where: { id } });
        return payment_type;
      }
}
