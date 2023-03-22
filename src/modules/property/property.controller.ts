import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
    constructor (private propertyService: PropertyService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.propertyService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOneProperty(@Param('id') id_property) {
        return this.propertyService.findOneProperty(parseInt(id_property));
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createProperty(@Body() body) {
        return this.propertyService.createProperty(body);
    }

    @Patch('/update/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateProperty(@Param('id')id_property, @Body() body) {
        return this.propertyService.updateProperty(id_property,body);
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeProperty(@Param('id') id_property) {
        return this.propertyService.removeProperty(id_property);
    }
}
