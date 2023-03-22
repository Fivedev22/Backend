import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeController } from './payment_type.controller';
import { PaymentType } from './payment_type.entity';
import { PaymentTypeService } from './payment_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType])],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService]
})
export class PaymentTypeModule {}
