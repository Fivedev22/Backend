import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from 'src/modules/client/client.entity';
import { Property } from 'src/modules/property/entities/property.entity';

@Entity('provinces')
export class Province {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id_province: number;

    @Column({ type: 'varchar', name: 'province_name', length: 120, nullable: false, unique: true })
    province_name: string;

    @OneToMany(() => Client, (client) => client.province)
    clients: Client[];

    @OneToMany(() => Property, (property) => property.province)
    properties: Property[];

}
