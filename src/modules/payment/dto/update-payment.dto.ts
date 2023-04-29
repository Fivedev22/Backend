import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDTO } from "src/modules/payment/dto/create-payment.dto";

export class UpdatePaymentDto extends PartialType(CreatePaymentDTO) { }
