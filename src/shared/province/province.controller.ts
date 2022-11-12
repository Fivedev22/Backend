import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProvinceService } from 'src/shared/province/province.service';

@Controller('province')
export class ProvinceController {

    constructor(
        private readonly provinceService: ProvinceService
    ) { }

    @Get('/')
    findAll() {
        return this.provinceService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id_province: number) {
        return this.provinceService.findOne(+id_province);
    }

}
