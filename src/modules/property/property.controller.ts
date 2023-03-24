import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
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

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOneProperty(@Param('id', ParseIntPipe) id_property: number) {
        return this.propertyService.findOneProperty(+id_property);
    }

    @Patch('/update/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateProperty(@Param('id', ParseIntPipe) id_property: number, @Body() updatePropertyDto: UpdatePropertyDto) {
        return this.propertyService.updateProperty(+id_property,updatePropertyDto);
    }

    @Patch('archive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    archiveProperty(@Param('id', ParseIntPipe) id_property: number) {
      return this.propertyService.archive(+id_property);
    }
  
    @Patch('unarchive/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    unarchiveProperty(@Param('id', ParseIntPipe) id_property: number) {
      return this.propertyService.unarchive(+id_property);
    }

    @Delete('/remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeProperty(@Param('id') id_property) {
        return this.propertyService.removeProperty(id_property);
    }
}
