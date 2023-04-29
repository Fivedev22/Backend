import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PropertyTypeService } from './property_type.service';

@Controller('property-type')
export class PropertyTypeController {
    constructor(
        private readonly propertyTypeService: PropertyTypeService
    ) { }

    @Get('/')
    findAll() {
        return this.propertyTypeService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.propertyTypeService.findOne(+id);
    }
}
