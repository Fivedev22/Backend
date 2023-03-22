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
        createProperty.nro_referencia = body.nro_referencia;
        createProperty.nombre_inmueble = body.nombre_inmueble;
        createProperty.property_type = body.property_type;
        createProperty.metros_cuadrados = body.metros_cuadrados;
        createProperty.calle = body.calle;
        createProperty.numero = body.numero;
        createProperty.piso = body.piso;
        createProperty.province = body.province;
        createProperty.ciudad = body.ciudad;
        createProperty.barrio = body.barrio;
        createProperty.alquiler_diario = body.alquiler_diario;
        createProperty.alquiler_mensual = body.alquiler_mensual;
        createProperty.alquiler_anual = body.alquiler_anual;
        createProperty.cant_habitaciones = body.cant_habitaciones;
        createProperty.cant_baños = body.cant_baños;
        createProperty.internet = body.internet;
        createProperty.pileta = body.pileta;
        createProperty.cocina = body.cocina;
        createProperty.equipo_lavanderia = body.equipo_lavanderia;
        createProperty.patio = body.patio;
        createProperty.parking = body.parking;
        createProperty.acceso_discapacitados = body.acceso_discapacitados;
        createProperty.camas_niños = body.camas_niños;
        createProperty.estado_disponibilidad = body.estado_disponibilidad;
        createProperty.estado_actividad = body.estado_actividad;
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
          EditProperty.nro_referencia = body.nro_referencia;
          EditProperty.nombre_inmueble = body.nombre_inmueble;
          EditProperty.property_type = body.property_type;
          EditProperty.metros_cuadrados = body.metros_cuadrados;
          EditProperty.calle = body.calle;
          EditProperty.numero = body.numero;
          EditProperty.piso = body.piso;
          EditProperty.province = body.province;
          EditProperty.ciudad = body.ciudad;
          EditProperty.barrio = body.barrio;
          EditProperty.alquiler_diario = body.alquiler_diario;
          EditProperty.alquiler_mensual = body.alquiler_mensual;
          EditProperty.alquiler_anual = body.alquiler_anual;
          EditProperty.cant_habitaciones = body.cant_habitaciones;
          EditProperty.cant_baños = body.cant_baños;
          EditProperty.internet = body.internet;
          EditProperty.pileta = body.pileta;
          EditProperty.cocina = body.cocina;
          EditProperty.equipo_lavanderia = body.equipo_lavanderia;
          EditProperty.patio = body.patio;
          EditProperty.parking = body.parking;
          EditProperty.acceso_discapacitados = body.acceso_discapacitados;
          EditProperty.camas_niños = body.camas_niños;
          EditProperty.estado_disponibilidad = body.estado_disponibilidad;
          EditProperty.estado_actividad = body.estado_actividad;
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
