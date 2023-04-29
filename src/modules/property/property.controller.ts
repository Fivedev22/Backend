import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { PropertyService } from './property.service';
import { Image } from '../../shared/image/image.entity'
import { v4 as uuidv4 } from 'uuid';


@Controller('property')
export class PropertyController {
    //connection: any;
    constructor (private propertyService: PropertyService) {}
    

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



    
    /* Dejo este ejemplo para poder subir multiples imagenes y mandarlas a la carpeta uploads pero no hice la prueba todavia
    @Post('/create')
    @UseInterceptors(
    FilesInterceptor('images', null, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = file.originalname.split('.').pop();
          cb(null, `${filename}.${extension}`);
        },
      }),
    }),
  )
  async create(@UploadedFiles() images, @Body() createPropertyDto: CreatePropertyDto) {
    const imageRepository = this.connection.getRepository(Image);

    // Almacena cada imagen en la base de datos
    const imageEntities = images.map(image => {
      const {filename } = image;
      const imageEntity = new Image();
      imageEntity.filename = filename;
      return imageEntity;
    });

    await imageRepository.save(imageEntities);

    // Crea la propiedad utilizando la información de createPropertyDto
    return this.propertyService.createProperty(createPropertyDto);
  }
    */
}

