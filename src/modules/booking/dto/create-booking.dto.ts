import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { BookingType } from '../../../shared/booking_type/booking_type.entity';
import { Booking_Origin } from '../../../shared/booking_origin/origin.entity';
import { Client } from '../../client/client.entity';
import { Property } from '../../property/entities/property.entity';
import { PaymentType } from 'src/shared/payment_type/payment_type.entity';

export class CreateBookingDto {
  @ApiProperty({ type: 'integer' })
  id_booking: number;

  @ApiProperty({ type: 'integer', uniqueItems: true })
  booking_number: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ type: BookingType })
  @Type(() => BookingType)
  booking_type: BookingType;

  @ApiProperty({ type: Booking_Origin })
  @Type(() => Booking_Origin)
  booking_origin: Booking_Origin;

  @ApiProperty({ type: Client })
  @Type(() => Client)
  client: Client;

  @ApiProperty({ type: Property })
  @Type(() => Property)
  property: Property;

  @ApiProperty({ type: 'Date', format: 'date' })
  @IsDateString()
  check_in_date: Date;

  @ApiProperty({ type: 'Date', format: 'date' })
  @IsDateString()
  check_out_date: Date;

  @ApiProperty({ type: 'string', format: 'time' })
  @IsString()
  @IsNotEmpty()
  check_in_hour: string;

  @ApiProperty({ type: 'string', format: 'time' })
  @IsString()
  @IsNotEmpty()
  check_out_hour: string;

  @ApiProperty({ type: 'integer', minimum: 1 })
  @IsInt()
  @Min(1)
  adults_number: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  kids_number: number;

  @ApiProperty({ type: 'integer', nullable: true })
  @IsInt()
  pets_number: number;

  @ApiProperty({ type: 'varchar', nullable: true })
  brand: string;

  @ApiProperty({ type: 'varchar', nullable: true })
  model: string;

  @ApiProperty({ type: 'varchar', nullable: true })
  licensePlate: string;

  @ApiProperty({ type: 'string'})
  @IsNumberString()
  @MinLength(0)
  starting_price: string;

  @ApiProperty({ type: 'string'})
  @IsNumberString()
  @MinLength(0)
  estimated_amount_deposit: string;

  @ApiProperty({ type: 'string', nullable: true })
  @IsOptional()
  @IsNumberString()
  @MinLength(0)
  discount: string;
  
  @IsNumberString()
  @MinLength(1)
  deposit_amount: string;

  @ApiProperty({ type: PaymentType })
  @Type(() => PaymentType)
  payment_type: PaymentType;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: 'string' })
  booking_amount: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  is_active: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  is_paid: boolean;

}
