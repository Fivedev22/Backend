import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>
      ) { }
    
      async findAll() {
        const images = await this.imageRepository.find({ order: { filename: 'ASC' } });
        return images;
      }
    
      async findOne(id: number) {
        const image = await this.imageRepository.findOne({ where: { id } });
        return image;
      }

}
