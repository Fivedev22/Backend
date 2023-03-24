import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { PaymentStatusController } from './payment_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatus } from './payment_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatus])],
  providers: [PaymentStatusService],
  controllers: [PaymentStatusController]
})
export class PaymentStatusModule {}
