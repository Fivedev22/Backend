import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ImageService } from './image.service';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':filename')
  downloadFile(@Param('filename') filename, @Res() res ): Observable<any> {
    return of(res.sendFile(join(process.cwd(), 'src/shared/image/uploads/'+filename)));
  }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.imageService.findOne(+id);
    }
    
}
