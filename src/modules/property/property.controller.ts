/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { PropertyService } from './property.service';
import { Image } from '../../shared/image/image.entity'
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { In } from 'typeorm';
import { Response } from 'express';
import { join } from 'path';
import { Request } from 'express';
import { Inventory } from './entities/inventory.entity';





@Controller('property')
export class PropertyController {
    constructor (
      private propertyService: PropertyService,
      @InjectRepository(Image)
      private imageRepository: Repository<Image>,
      @InjectRepository(Inventory)
      private inventoryRepository: Repository<Inventory>,
    ) {}
    

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createProperty(@Body() createPropertyDto: CreatePropertyDto) {
        return this.propertyService.createProperty(createPropertyDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.propertyService.findAll();
    }

    @Get('/archived')
    @HttpCode(HttpStatus.OK)
    findAllArchived() {
        return this.propertyService.findAllArchived();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOneProperty(@Param('id', ParseIntPipe) id_property: number) {
        return this.propertyService.findOneProperty(+id_property);
    }

    @Get('/archived/:id')
    @HttpCode(HttpStatus.OK)
    findOneArchived(@Param('id', ParseIntPipe) id_property: number) {
        return this.propertyService.findOneArchived(+id_property);
    }

    @Patch('/update/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateProperty(@Param('id', ParseIntPipe) id_property: number, @Body() updatePropertyDto: UpdatePropertyDto) {
        return this.propertyService.updateProperty(+id_property,updatePropertyDto);
    }

    @Patch('/archive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    archiveProperty(@Param('id', ParseIntPipe) id_property: number) {
      return this.propertyService.archive(+id_property);
    }
  
    @Patch('/unarchive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    unarchiveProperty(@Param('id', ParseIntPipe) id_property: number) {
      return this.propertyService.unarchive(+id_property);
    }

    @Delete('/remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeProperty(@Param('id') id_property) {
        return this.propertyService.removeProperty(id_property);
    }

    @Get('/search/:reference_number')
    @HttpCode(HttpStatus.OK)
    searchByReference(@Param('reference_number', ParseIntPipe) reference_number: number) {
      return this.propertyService.findByReferenceNumber(+reference_number);
    }


    @Post('/images/upload/:id')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(
      FilesInterceptor('images', 10, {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
          },
        }),
      }),
    )
    async uploadImages(
      @Param('id', ParseIntPipe) id_property: number,
      @UploadedFiles() images: Express.Multer.File[],
    ) {
      const property = await this.propertyService.findOneProperty(+id_property);
      if (!property) {
        throw new NotFoundException('Property not found');
      }
  
      const savedImages = await Promise.all(
        images.map(async (file) => {
          const image = new Image();
          image.property = property;
          image.filename = file.filename;
          return await this.imageRepository.save(image);
        }),
      );
  
      return savedImages;
    }

    @Get('/:id/images')
    @HttpCode(HttpStatus.OK)
    async getPropertyImages(@Param('id', ParseIntPipe) id: number) {
      const property = await this.propertyService.findOneProperty(id);
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      
      const images = await this.imageRepository.find({ where: { property } });
      
      return { images };
    }

    @Delete('/images/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteImages(@Param('id', ParseIntPipe) id: number, @Body('imageIds') imageIds: number[]) {
      const property = await this.propertyService.findOneProperty(id);
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      
      // Eliminar imágenes de la base de datos
      await this.imageRepository.delete({ property, id: In(imageIds) });
      
      // Eliminar imágenes del almacenamiento externo
      for (const imageId of imageIds) {
        const image = await this.imageRepository.findOne({ where: { property, id: imageId } });
        if (image) {
          const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', image.filename);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }
      return { message: 'Images deleted successfully' };
    }




    @Post('/inventory/upload/:id')
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
    async uploadInventory(
      @Param('id', ParseIntPipe) id_property: number,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
      }
  
      const property = await this.propertyService.findOneProperty(+id_property);
      if (!property) {
        throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
      }
      
      const inventory = new Inventory();
      inventory.filename = file.filename;
      inventory.property = property;
      // Realizar cualquier otra operación necesaria
  
      const savedInventory = await this.inventoryRepository.save(inventory);
  
      return savedInventory;
    }

    @Get('/inventories/:id')
    @HttpCode(HttpStatus.OK)
    async getPropertyInventory(@Param('id', ParseIntPipe) id: number) {
      const property = await this.propertyService.findOneProperty(id);
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      
      const inventory = await this.inventoryRepository.find({ where: { property } });
      
      return { inventory };
    }

    @Delete('/inventories/:id')
    async deleteInventorty(@Param('id', ParseIntPipe) id: number) {
      const inventory = await this.inventoryRepository.findOne({where: {id: id} });
      if (!inventory) {
        throw new NotFoundException('Inventory not found');
      }
  
      // Eliminar el archivo del almacenamiento externo
      const filePath = path.join(__dirname, '..', '..', '..', 'uploads', inventory.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      // Eliminar el contrato de la base de datos
      await this.inventoryRepository.delete({ id: id });
  
      return { message: 'Inventory deleted successfully' };
    }


    @Get('get-last-number/:')
    @HttpCode(HttpStatus.OK)
    async getNumber(): Promise<number> {
        return this.propertyService.GetLastNumber();
    }

    @Post('update-activity-status')
    async updateActivityStatus() {
      await this.propertyService.updateActivityStatus();
      return { message: 'Activity status updated successfully' };
    }

    

    
  
}
    



