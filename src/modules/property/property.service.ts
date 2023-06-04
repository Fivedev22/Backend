/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { Property } from './entities/property.entity';
import { Image } from 'src/shared/image/image.entity';

@Injectable()
export class PropertyService {
    constructor(@InjectRepository(Property) private readonly propertyRepository: Repository<Property>) {}


    async findByReferenceNumber(reference_number: number) {
      const numberFound = await this.propertyRepository.findOne({ 
        relations: ['property_type', 'province', 'availability_status', 'activity_status','bookings','payments'],
        where: { reference_number: reference_number } });
      return numberFound;
    }


    public async findAll() {
      const properties = await this.propertyRepository.find({
        relations: ['property_type', 'province', 'availability_status', 'activity_status','bookings','payments'],
        where: { is_active: true },
        order: { id_property: 'ASC'}
      });
      return properties;
      }

      public async findAllArchived() {
        const properties = await this.propertyRepository.find({
          relations: ['property_type', 'province', 'availability_status', 'activity_status','bookings','payments'],
          where: { is_active: false },
          order: { id_property: 'ASC'}
        });
        return properties;
        }
    
      public async findOneProperty(id_property: number) {
        return await this.propertyRepository.findOne({
          relations: ['property_type', 'province', 'availability_status', 'activity_status','bookings', 'payments'],
          where: {
            id_property: id_property,
            is_active: true
          }
        })
      }

      public async findOneArchived(id_property: number) {
        return await this.propertyRepository.findOne({
          relations: ['property_type', 'province', 'availability_status', 'activity_status','bookings', 'payments'],
          where: {
            id_property: id_property,
            is_active: false
          }
        })
      }
    
      public async createProperty( files ,createPropertyDto: CreatePropertyDto) {
       
        const images = [];
        for (const file of files) {
          const newImage = new Image();
          newImage.filename = file.filename;
          newImage.path = file.path;
          newImage.mimetype = file.mimetype;
          newImage.size = file.size;
          images.push(newImage);
        }
       
        // createPropertyDto.images = images

        
        const myObject = {};
      
        for (const [key, value] of Object.entries(createPropertyDto)) {
          myObject[key] = value;
         
        }
        // myObject.images = images
     

        const {reference_number} = createPropertyDto;
        if (await this.findByReferenceNumber(reference_number)) throw new HttpException('Repeating property', HttpStatus.NOT_ACCEPTABLE);
        try {
          await this.propertyRepository.save(myObject);
          return {
            statusCode: 200,
            msg: 'Property Saved Successfully',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async updateProperty(id_property: number, updatePropertyDto: UpdatePropertyDto) {
        if (!await this.findOneProperty(id_property)) throw new HttpException(`Property with id ${id_property} does not exist`, HttpStatus.NOT_FOUND);
        const property = await this.propertyRepository.preload({ id_property, ...updatePropertyDto});
          try {
            await this.propertyRepository.update(id_property, property);
            return {
              statusCode: 200,
              msg: 'Property Updated Successfully',
            };
          } catch (error) {
            return new BadRequestException(error);
          }
        } 
      
      public async removeProperty (id_property: number) {
        try {
          await this.propertyRepository.delete({
            id_property: id_property,
          });
          return {
            statusCode: 200,
            msg: 'Property Removed Successfully.',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
    }

    async archive(id_property: number) {
      const property = await this.propertyRepository.findOne({
        where: { id_property: id_property}
      });
      if (!property) throw new HttpException(`Property with id ${id_property} does not exist`, HttpStatus.NOT_FOUND);
      try {
        property.is_active = false;
        await this.propertyRepository.update(id_property, property);
      } catch {
        throw new HttpException('A problem occurred while archiving the property', HttpStatus.NOT_FOUND);
      }
    }
  
    async unarchive(id_property: number) {
      const property = await this.propertyRepository.findOne({
        where: { 
          id_property: id_property, 
          is_active: false }
      });
      if (!property) throw new HttpException(`Property with id ${id_property} does not exist`, HttpStatus.NOT_FOUND);
      try {
        property.is_active = true;
        await this.propertyRepository.update(id_property, property);
      } catch {
        throw new HttpException('A problem occurred while unarchiving the property', HttpStatus.NOT_FOUND);
      }
    }

    async GetLastNumber(): Promise<number> {
      const property = await this.propertyRepository
      .createQueryBuilder('property')
      .orderBy('property.reference_number', 'DESC')
      .getOne();

      return  property ? property.reference_number:0;
    }    
  
}
