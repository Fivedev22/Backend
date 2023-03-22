import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertyType } from './entities/property_type.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyType])],
  controllers: [PropertyController],
  providers: [PropertyService]
})
export class PropertyModule {}
