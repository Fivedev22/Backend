import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Client } from 'src/modules/client/client.entity';
import { Property } from 'src/modules/property/entities/property.entity';
import { PaymentStatus } from 'src/shared/payment_status/payment_status.entity';
import { PaymentType } from 'src/shared/payment_type/payment_type.entity';

export class CreatePaymentDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id_payment: number;

  @ApiProperty({ example: 123456 })
  @IsNumber()
  payment_number: number;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ type: Booking })
  @IsNotEmpty()
  booking: Booking;

  @ApiProperty({ type: Client })
  @IsNotEmpty()
  client: Client;

  @ApiProperty({ type: Property })
  @IsNotEmpty()
  property: Property;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsDateString()
  check_in_date: string;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsDateString()
  check_out_date: string;

  @ApiProperty({ type: 'string'})
  @IsNumberString()
  @MinLength(1)
  booking_starting_price: string;

  @ApiProperty({ type: 'string', nullable: true })
  @IsOptional()
  @IsNumberString()
  @MinLength(1)
  booking_discount?: string;

  @IsNumberString()
  @MinLength(1)
  deposit_amount: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: 'string' })
  booking_amount: string;

  @ApiProperty({ type: 'string', nullable: true })
  @IsOptional()
  @IsNumberString()
  @MinLength(1)
  extra_expenses?: string;

  @ApiProperty({ example: '120' })
  @IsNumberString()
  @MinLength(1)
  payment_amount_total: string;

  @ApiProperty({ type: PaymentType })
  @Type(() => PaymentType)
  payment_type: PaymentType;

  @ApiProperty({ type: PaymentStatus })
  @Type(() => PaymentStatus)
  payment_status: PaymentStatus;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
