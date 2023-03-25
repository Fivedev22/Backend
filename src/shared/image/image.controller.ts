import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) { }

    @Get('/')
    findAll() {
        return this.imageService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.imageService.findOne(+id);
    }
}
