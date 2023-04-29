import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyType } from './property_type.entity';

@Injectable()
export class PropertyTypeService {
    constructor(
        @InjectRepository(PropertyType)
        private readonly propertyTypeRepository: Repository<PropertyType>
      ) { }
    
      async findAll() {
        const property_types = await this.propertyTypeRepository.find({ 
          relations: ['properties'],
          order: { property_type_name: 'ASC' } });
        return property_types;
      }
    
      async findOne(id: number) {
        const property_type = await this.propertyTypeRepository.findOne({
          relations: ['properties'], 
          where: { id } });
        return property_type;
      }
}
