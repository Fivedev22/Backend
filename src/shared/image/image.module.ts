/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController, multerConfig } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Image]),MulterModule.register(multerConfig)],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}
