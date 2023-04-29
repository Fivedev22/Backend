/* eslint-disable prettier/prettier */
import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ImageService } from "./image.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { extname, join } from "path";
import { diskStorage } from "multer";
import { Image } from "./image.entity";
import { Observable, of } from "rxjs";


export const storageConfig = {
  dest: './src/shared/image/uploads',
};

export const multerConfig = {
  storage: diskStorage({
    destination: storageConfig.dest,
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new BadRequestException('Solo se permiten imágenes: jpg/jpeg/png/gif'));
    }
    cb(null, true);
  },
  multiple: true,
};

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':filename')
  downloadFile(@Param('filename') filename, @Res() res ): Observable<any> {
    return of(res.sendFile(join(process.cwd(), 'src/shared/image/uploads/'+filename)));
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImages(@UploadedFiles() files) {
    const images = [];
    for (const file of files) {
      const newImage = new Image();
      newImage.filename = file.filename;
      newImage.path = file.path;
      newImage.mimetype = file.mimetype;
      newImage.size = file.size;
      images.push(newImage);
    }
    await this.imageService.create(images);
    return { uploadedFiles: images.map(image => ({ filename: image.filename })) };
  }
}
