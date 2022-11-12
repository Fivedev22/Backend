import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from 'src/modules/client/client.entity';

@Entity('gender_types')
export class GenderType {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id_gender_type: number;

    @Column({ type: 'varchar', name: 'gender_type_name', length: 50, nullable: false, unique: true })
    gender_type_name: string;

    @OneToMany(() => Client, (client) => client.gender_type)
    client: Client;

}

