import { Property } from "src/modules/property/entities/property.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "activity_status",
})

export class ActivityStatus {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        length: 100,
        name: 'activity_status_name',
    })
    activity_status_name: string;


    @OneToMany(() => Property, (property) => property.id_property)
    propertys: Property[]
}