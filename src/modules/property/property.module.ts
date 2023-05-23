import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Image } from 'src/shared/image/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property,Image])],
  controllers: [PropertyController],
  providers: [PropertyService]
})
export class PropertyModule {}
