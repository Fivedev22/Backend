import { Property } from "src/modules/property/entities/property.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'availability_status',
})

export class AvailabilityStatus {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        length: 100,
        name: 'availability_status_name',
    })
    availability_status_name: string;


    @OneToMany(() => Property, (property) => property.activity_status)
    properties: Property[]
}