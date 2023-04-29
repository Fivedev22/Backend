import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyTypeController } from './property_type.controller';
import { PropertyType } from './property_type.entity';
import { PropertyTypeService } from './property_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyType])],
  controllers: [PropertyTypeController],
  providers: [PropertyTypeService]
})
export class PropertyTypeModule {}
