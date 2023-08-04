import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType } from 'src/shared/property_type/property_type.entity';
import { Province } from 'src/shared/province/province.entity';
import { AvailabilityStatus } from 'src/shared/availability_status/availability_status.entity';
import { ActivityStatus } from 'src/shared/activity_status/activity_status.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
    @IsNotEmpty()
    @IsInt()
    id_property: number;
  
    @ApiProperty({ type: 'integer', uniqueItems: true })
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
    @IsOptional()
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
    @IsBoolean()
    is_active: boolean;
  }
  