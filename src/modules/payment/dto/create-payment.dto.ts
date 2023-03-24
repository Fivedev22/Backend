import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({ example: 1 })
  @IsNumber()
  bookingId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  clientId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  propertyId: number;

  @ApiProperty({ example: '2022-01-01' })
  @IsString()
  check_in_date: string;

  @ApiProperty({ example: '2022-01-05' })
  @IsString()
  check_out_date: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  booking_amount: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  booking_discount?: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  deposit_amount: number;

  @ApiProperty({ example: 110 })
  @IsNumber()
  payment_amount_subtotal: number;

  @ApiProperty({ example: 120 })
  @IsNumber()
  payment_amount_total: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  payment_type_id: number;

  @IsNumber()
  payment_status_id: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
