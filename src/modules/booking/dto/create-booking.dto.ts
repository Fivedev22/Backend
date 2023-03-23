import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { BookingType } from '../../../shared/booking_type/booking_type.entity';
import { Booking_Origin } from '../../../shared/booking_origin/origin.entity';
import { Client } from '../../client/client.entity';
import { Property } from '../../property/entities/property.entity';

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

  @ApiProperty({ type: 'integer', minimum: 1 })
  @IsInt()
  @Min(1)
  adults_number: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  kids_number: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  pets_number: number;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsDateString()
  check_in_date: string;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsDateString()
  check_out_date: string;

  @ApiProperty({ type: 'string', format: 'time' })
  @IsString()
  @IsNotEmpty()
  check_in_hour: string;

  @ApiProperty({ type: 'string', format: 'time' })
  @IsString()
  @IsNotEmpty()
  check_out_hour: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  starting_price: number;

  @ApiProperty({ type: 'integer', minimum: 0, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  discount: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  deposit_amount: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  estimated_amount_deposit: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  booking_amount: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  is_active: boolean;

}
