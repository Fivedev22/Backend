import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from "src/modules/booking/dto/create-booking.dto";

export class UpdateBookingDto extends PartialType(CreateBookingDto) { }
