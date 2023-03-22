import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

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
        name: 'tipo_inmueble',
    })
    tipo_inmueble: string;

    @OneToMany(() => Property, (property) => property.nro_referencia)
    propertys: Property[]

    
}