import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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



@Controller('property')
export class PropertyController {
    constructor (
      private propertyService: PropertyService,
      @InjectRepository(Image)
      private imageRepository: Repository<Image>,
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

    
    @Post('/:id/upload-images')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FilesInterceptor('images', 10))
    async uploadImages(
      @Param('id', ParseIntPipe) id: number,
      @UploadedFiles() files: Express.Multer.File[],
      ) {
        const property = await this.propertyService.findOneProperty(id);
        if (!property) {
          throw new NotFoundException('Property not found');
        }
        
        for (const file of files) {
          const image = new Image();
          image.filename = file.originalname;
          image.mimeType = file.mimetype;
          image.path = path.join('uploads', uuidv4()); // Cambiar la ruta según tus necesidades
          image.property = property;
          
          await this.imageRepository.save(image);
          
          // Guardar la imagen en el sistema de archivos
          const filePath = path.join(__dirname, '..', '..', 'public', image.path);
          await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
          await fs.promises.writeFile(filePath, file.buffer);
        }
        
        return { message: 'Images uploaded successfully' };
      }


      @Get('/:id/images')
      @HttpCode(HttpStatus.OK)
      async getPropertyImages(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const property = await this.propertyService.findOneProperty(id);
        if (!property) {
          throw new NotFoundException('Property not found');
        }
        
        const images = await this.imageRepository.find({ where: { property } });
        
        for (const image of images) {
          const imagePath = path.resolve(__dirname, '..', '..', 'public', image.path);
          res.sendFile(imagePath);
        }
      }

      @Delete('/:id/images')
      async deletePropertyImages(
        @Param('id', ParseIntPipe) id: number,
        @Body('imageIds') imageIds: number[],
        ) {
          const property = await this.propertyService.findOneProperty(id);
          if (!property) {
            throw new NotFoundException('Property not found');
          }
          
          await this.imageRepository.delete({ property, id: In(imageIds) });
          
          return { message: 'Images deleted successfully' };
        
        }

        @Get('/:id/get-images')
        @HttpCode(HttpStatus.OK)
        async getImages(@Param('id', ParseIntPipe) id: number) {
          const property = await this.propertyService.findOneProperty(id);
          if (!property) {
            throw new NotFoundException('Property not found');
          }
      
          const images = await this.imageRepository.find({ where: { property } });
      
          return { images };
        }
}
    



