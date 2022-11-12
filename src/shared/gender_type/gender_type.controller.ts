import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GenderTypeService } from 'src/shared/gender_type/gender_type.service';

@Controller('gender-type')
export class GenderTypeController {

    constructor(
        private readonly genderTypeService: GenderTypeService
    ) { }

    @Get('/')
    findAll() {
        return this.genderTypeService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id_gender_type: number) {
        return this.genderTypeService.findOne(+id_gender_type);
    }

}
