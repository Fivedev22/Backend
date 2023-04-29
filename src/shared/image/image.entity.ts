/* eslint-disable prettier/prettier */
import { Property } from 'src/modules/property/entities/property.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

@Entity({
  name: 'image',
})
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @ManyToOne(() => Property, (property) => property.images)
  property: Property;
}