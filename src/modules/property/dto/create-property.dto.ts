/* eslint-disable prettier/prettier */
import { IsBoolean, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType } from 'src/shared/property_type/property_type.entity';
import { Province } from 'src/shared/province/province.entity';
import { AvailabilityStatus } from 'src/shared/availability_status/availability_status.entity';
import { ActivityStatus } from 'src/shared/activity_status/activity_status.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Image } from 'src/shared/image/image.entity';


export class CreatePropertyDto {
    @IsNotEmpty()
    @IsInt()
    id_property: number;
  
    @IsNotEmpty()
    @IsInt()
    reference_number: number;
  
    @IsNotEmpty()
    @IsString()
    property_name: string;
  
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PropertyType)
    property_type: PropertyType;
  
    @IsString()
    square_meter: string;
  
    @IsNotEmpty()
    @IsString()
    street: string;
  
    @IsNotEmpty()
    @IsString()
    street_number: string;
  
    @IsString()
    building_floor: string;
  
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Province)
    province: Province;
  
    @IsNotEmpty()
    @IsString()
    town: string;
  
    @IsNotEmpty()
    @IsString()
    district: string;
  
    @IsNotEmpty()
    @IsBoolean()
    daily_rent: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    monthly_rent: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    annual_rent: boolean;
  
    @IsNotEmpty()
    @IsInt()
    rooms_number: number;
  
    @IsNotEmpty()
    @IsInt()
    bathrooms_number: number;
  
    @IsNotEmpty()
    @IsBoolean()
    internet: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    pool: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    kitchen: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    laundry_equipment: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    yard: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    parking: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    disabled_access: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    kids_beds: boolean;
  
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AvailabilityStatus)
    availability_status: AvailabilityStatus;
  
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ActivityStatus)
    activity_status: ActivityStatus;
  
    @IsNotEmpty()
    bookings: Booking[];

    @IsNotEmpty()
    images: Image[];

    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;
  }
  