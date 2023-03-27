import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "src/modules/client/client.entity";
import { BookingType } from "../../../shared/booking_type/booking_type.entity";
import { Booking_Origin } from "../../../shared/booking_origin/origin.entity";
import { Property } from "src/modules/property/entities/property.entity";
import { Payment } from "src/modules/payment/entities/payment.entity";


@Entity({
    name: 'booking',
})

export class Booking {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id_booking',
    })
    id_booking: number;

    @Column({
        type: 'int',
        name: 'booking_number',
        unique: true
    })
    booking_number: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => BookingType, (booking_type) => booking_type.id)
    booking_type: BookingType

    @ManyToOne(() => Booking_Origin, (booking_origin) => booking_origin.id)
    booking_origin: Booking_Origin

    @ManyToOne(() => Client, (client) => client.bookings)
    client: Client

    @ManyToOne(() => Property, (property) => property.bookings)
    property: Property

    @Column({
        type: 'int',
        name: 'adults_number',
    })
    adults_number: number;

    @Column({
        type: 'int',
        name: 'kids_number',
    })
    kids_number: number;

    @Column({
        type: 'int',
        name: 'pets_number',
        nullable: true
    })
    pets_number: number;

    @Column({ 
        type: 'date',
        name: 'check_in_date',
    })
    check_in_date: string;

    @Column({ 
        type: 'date',
        name: 'check_out_date',
    })
    check_out_date: string;

    @Column({ 
        type: 'time',
        name: 'check_in_hour',
    })
    check_in_hour: string;

    @Column({ 
        type: 'time',
        name: 'check_out_hour',
    })
    check_out_hour: string;

    @Column({
        type: 'int',
        name: 'starting_price',
    })
    starting_price: number;

    @Column({
        type: 'int',
        name: 'discount',
        nullable: true
    })
    discount: number;

    @Column({
        type: 'int',
        name: 'deposit_amount',
    })
    deposit_amount: number;

    @Column({
        type: 'int',
        name: 'estimated_amount_deposit',
    })
    estimated_amount_deposit: number;

    @Column({
        type: 'int',
        name: 'booking_amount',
    })
    booking_amount: number;

    @OneToOne(() => Payment, {eager: true, cascade: true})
    @JoinColumn()
    payment: Payment;
    
    @Column({ type: 'boolean', name: 'is_active', default: true, nullable: false })
    is_active: boolean

    // el is_active es para archivar y desarchivar el cobro
 
}