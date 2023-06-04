import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BookingService } from "../booking/booking.service";
import { CreateBookingDto, UpdateBookingDto } from "src/modules/booking/dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import * as fs from 'fs';


@Controller('booking')
export class BookingController {
    constructor(
        private bookingService: BookingService,
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createBooking(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.createBooking(createBookingDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAllBookings() {
        return this.bookingService.findAllBookings();
    }

    @Get('/archived')
    @HttpCode(HttpStatus.OK)
    findAllArchived() {
        return this.bookingService.findAllBookingsArchived();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOneBooking(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.findOneBooking(+id_booking);
    }

    @Get('/archived/:id')
    @HttpCode(HttpStatus.OK)
    findOneArchived(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.findOneBookingArchived(+id_booking);
    }


    @Patch('/edit/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateBooking(@Param('id', ParseIntPipe) id_booking: number, @Body() updateBookingDto: UpdateBookingDto) {
        return this.bookingService.updateBooking(+id_booking, updateBookingDto);
    }

    
    @Patch('/archive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    archiveBooking(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.archive(+id_booking);
    }

    @Patch('unarchive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    unarchiveBooking(@Param('id', ParseIntPipe) id_booking: number) {
        return this.bookingService.unarchive(+id_booking);
    }

    @Delete('/remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeBooking(@Param('id') id_booking) {
      return this.bookingService.removeBooking(id_booking);
    }

    @Get('/search/:booking_number')
    @HttpCode(HttpStatus.OK)
    searchByNumber(@Param('booking_number', ParseIntPipe) booking_number: number) {
        return this.bookingService.findByBookingNumber(+booking_number);
    }

    @Get('get-last-number/:')
    @HttpCode(HttpStatus.OK)
    async getNumber(): Promise<number> {
        return this.bookingService.GetLastNumber();
    }

    @Get(':property/occupied-dates')
    async getOccupiedDatesForProperty(
        @Param('property') propertyId: number,) {
            return this.bookingService.getOccupiedDates(propertyId);
    }

    @Post('/contract/upload/:id')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
          },
        }),
        limits: {
          fileSize: 1024 * 1024 * 10, // 10MB
        },
      }),
    )
    async uploadContract(
      @Param('id', ParseIntPipe) id_booking: number,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
      }
  
      const reservation = await this.bookingService.findOneBooking(+id_booking);
      if (!reservation) {
        throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
      }
      
      // Aquí puedes realizar las operaciones que desees con el archivo
      // Por ejemplo, guardar la información en una entidad "Contract"
      const contract = new Contract();
      contract.filename = file.filename;
      contract.booking = reservation;
      // Realizar cualquier otra operación necesaria
  
      // Guardar la entidad "Contract" en la base de datos
      const savedContract = await this.contractRepository.save(contract);
  
      return savedContract;
    }

    @Get('/contracts/:id')
    @HttpCode(HttpStatus.OK)
    async getBookingContracts(@Param('id', ParseIntPipe) id: number) {
      const booking = await this.bookingService.findOneBooking(id);
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      
      const contracts = await this.contractRepository.find({ where: { booking } });
      
      return { contracts };
    }

    @Delete('/contracts/:id')
    async deleteContract(@Param('id', ParseIntPipe) id: number) {
      const contract = await this.contractRepository.findOne({where: {id: id} });
      if (!contract) {
        throw new NotFoundException('Contract not found');
      }
  
      // Eliminar el archivo del almacenamiento externo
      const filePath = path.join(__dirname, '..', '..', '..', 'uploads', contract.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      // Eliminar el contrato de la base de datos
      await this.contractRepository.delete({ id: id });
  
      return { message: 'Contract deleted successfully' };
    }

    
}

