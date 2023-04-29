/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Province } from 'src/shared/province/province.entity';
import { GenderType } from 'src/shared/gender_type/gender_type.entity';
import { DocumentType } from 'src/shared/document_type/document_type.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Payment } from '../payment/entities/payment.entity';

@Entity('client')
export class Client {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id_client: number

    @Column({ type: 'varchar', name: 'name', length: 60, nullable: false })
    name: string

    @Column({ type: 'varchar', name: 'last_name', length: 60, nullable: false })
    last_name: string

    @Column({ type: 'varchar', name: 'email', nullable: true, unique: true })
    email: string

    @Column({ type: 'varchar', length: 20, name: 'phone_number', nullable: true, unique: true })
    phone_number: string

    @Column({ type: 'varchar',length:50, name: 'document_number', nullable: false, unique: true })
    document_number: string

    @Column({ type: 'boolean', name: 'is_foreign', default: false, nullable: true })
    is_foreign: boolean

    @Column({ type: 'boolean', name: 'is_active', default: true, nullable: false })
    is_active: boolean

    @ManyToOne(() => Province, (province) => province.clients, { cascade: true, nullable: true })
    province: Province;

    @ManyToOne(() => GenderType, (gender_type) => gender_type.clients, { cascade: true })
    gender_type: GenderType;

    @ManyToOne(() => DocumentType, (document_type) => document_type.clients, { cascade: true })
    document_type: DocumentType;

    @OneToMany(() => Booking, (booking) => booking.client)
    bookings: Booking[];

    @OneToMany(() => Payment, payment => payment.client)
    payments: Payment[];

}
