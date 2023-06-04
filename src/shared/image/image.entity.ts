/* eslint-disable prettier/prettier */
import { Property } from 'src/modules/property/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimeType: string;

  @Column()
  path: string; // Nuevo campo para almacenar la ruta de la imagen

  @ManyToOne(() => Property, property => property.images)
  property: Property;
}
