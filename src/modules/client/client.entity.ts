import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Province } from 'src/shared/province/province.entity';
import { GenderType } from 'src/shared/gender_type/gender_type.entity';
import { DocumentType } from 'src/shared/document_type/document_type.entity';

@Entity('clients')
export class Client {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id_client: number

    @Column({ type: 'varchar', name: 'name', length: 120, nullable: false })
    name: string

    @Column({ type: 'varchar', name: 'last_name', length: 120, nullable: false })
    last_name: string

    @Column({ type: 'varchar', name: 'email', nullable: true, unique: true })
    email: string

    @Column({ type: 'varchar', name: 'phone_number', nullable: true, unique: true })
    phone_number: string

    @Column({ type: 'varchar', name: 'document', nullable: false, unique: true })
    document: string

    @Column({ type: 'boolean', name: 'is_foreign', default: false, nullable: false })
    is_foreign: boolean

    @Column({ type: 'boolean', name: 'is_active', default: true, nullable: false })
    is_active: boolean

    @ManyToOne(() => Province, (province) => province.client, { cascade: true, nullable: true })
    province: Province;

    @ManyToOne(() => GenderType, (gender_type) => gender_type.client, { cascade: true })
    gender_type: GenderType;

    @ManyToOne(() => DocumentType, (document_type) => document_type.client, { cascade: true })
    document_type: DocumentType;
}
