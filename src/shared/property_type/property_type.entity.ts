import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "../../modules/property/entities/property.entity";

@Entity({
    name: "property_type",
})

export class PropertyType {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        length: 100,
        name: 'property_type_name',
    })
    property_type_name: string;

    @OneToMany(() => Property, (property) => property.property_type)
    properties: Property[]

    
}