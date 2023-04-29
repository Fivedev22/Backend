import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from 'src/modules/client/client.entity';

@Entity('document_types')
export class DocumentType {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id_document_type: number;

    @Column({ type: 'varchar', name: 'document_type_name', length: 30, nullable: false, unique: true })
    document_type_name: string;

    @OneToMany(() => Client, (client) => client.document_type)
    clients: Client[];

}
