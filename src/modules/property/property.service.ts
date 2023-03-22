import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
    ) {}

    public async findAll() {
        return await this.propertyRepository
          .createQueryBuilder('property')
          .select()
          .getMany();
      }
    
      public async findOneProperty(id_property) {
        return await this.propertyRepository.findOne({
          where: {
            id_property: id_property,
          },
        });
      }
    
      public async createProperty(body) {
        const createProperty = new Property();
        createProperty.reference_number = body.reference_number;
        createProperty.property_name = body.property_name;
        createProperty.property_type = body.property_type;
        createProperty.square_meter = body.square_meter;
        createProperty.street = body.street;
        createProperty.street_number = body.street_number;
        createProperty.building_floor = body.building_floor;
        createProperty.province = body.province;
        createProperty.town = body.town;
        createProperty.district = body.district;
        createProperty.daily_rent = body.daily_rent;
        createProperty.monthly_rent = body.monthly_rent;
        createProperty.annual_rent = body.annual_rent;
        createProperty.rooms_number = body.rooms_number;
        createProperty.bathrooms_number = body.bathrooms_number;
        createProperty.internet = body.internet;
        createProperty.pool = body.pool;
        createProperty.kitchen = body.kitchen;
        createProperty.laundry_equipment = body.laundry_equipment;
        createProperty.yard = body.yard;
        createProperty.parking = body.parking;
        createProperty.disabled_access = body.disabled_access;
        createProperty.kids_beds = body.kids_beds;
        createProperty.availability_status = body.estado_disponibilidad;
        createProperty.activity_status = body.activity_status;
        try {
          const PropertySaved = await this.propertyRepository.save(createProperty);
          return {
            statusCode: 200,
            msg: 'Property Saved Successfully',
          };
        } catch (error) {
          return new BadRequestException(error);
        }
      }
    
      public async updateProperty(id_property, body: Property) {
        try {
          const EditProperty = await this.propertyRepository.findOne({
            where: {
              id_property: id_property,
            },
          });
          EditProperty.reference_number = body.reference_number;
          EditProperty.property_name = body.property_name;
          EditProperty.property_type = body.property_type;
          EditProperty.square_meter = body.square_meter;
          EditProperty.street = body.street;
          EditProperty.street_number = body.street_number;
          EditProperty.building_floor = body.building_floor;
          EditProperty.province = body.province;
          EditProperty.town = body.town;
          EditProperty.district = body.district;
          EditProperty.daily_rent = body.daily_rent;
          EditProperty.monthly_rent = body.monthly_rent;
          EditProperty.annual_rent = body.annual_rent;
          EditProperty.rooms_number = body.rooms_number;
          EditProperty.bathrooms_number = body.bathrooms_number;
          EditProperty.internet = body.internet;
          EditProperty.pool = body.pool;
          EditProperty.kitchen = body.kitchen;
          EditProperty.laundry_equipment = body.laundry_equipment;
          EditProperty.yard = body.yard;
          EditProperty.parking = body.parking;
          EditProperty.disabled_access = body.disabled_access;
          EditProperty.kids_beds = body.kids_beds;
          EditProperty.availability_status = body.availability_status;
          EditProperty.activity_status = body.activity_status;
          await this.propertyRepository.save(EditProperty);
          return {
            statusCode: 200,
            msg: 'Property Updated Successfully.',
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
}
