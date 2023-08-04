import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "src/modules/client/client.entity";
import { BookingType } from "../../../shared/booking_type/booking_type.entity";
import { Booking_Origin } from "../../../shared/booking_origin/origin.entity";
import { Property } from "src/modules/property/entities/property.entity";
import { Payment } from "src/modules/payment/entities/payment.entity";
import { Contract } from "./contract.entity";
import { PaymentType } from "src/shared/payment_type/payment_type.entity";


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
        unique: true,
    })
    booking_number: number;

    @Column({
        type: 'date',
        name: 'createdAt',
        nullable: true
    })
    createdAt: Date;

    @ManyToOne(() => BookingType, (booking_type) => booking_type.bookings)
    booking_type: BookingType

    @ManyToOne(() => Booking_Origin, (booking_origin) => booking_origin.bookings)
    booking_origin: Booking_Origin

    @ManyToOne(() => Client, (client) => client.bookings)
    client: Client

    @ManyToOne(() => Property, (property) => property.bookings)
    property: Property

    @Column({ 
        type: 'date',
        name: 'check_in_date',
    })
    check_in_date: Date;

    @Column({ 
        type: 'date',
        name: 'check_out_date',
    })
    check_out_date: Date;

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
        type: 'varchar',
        name: 'brand',
        nullable: true,
    })
    brand: string;

    @Column({ 
        type: 'varchar',
        name: 'model',
        nullable: true,
    })
    model: string;

    @Column({ 
        type: 'varchar',
        name: 'licensePlate',
        nullable: true,
    })
    licensePlate: string;

    @Column({
        type: 'decimal',
        precision: 10, 
        scale: 2,
        name: 'starting_price',
    })
    starting_price: string;
    
    @Column({
        type: 'decimal',
        name: 'discount',
        precision: 10, 
        scale: 2,
        nullable: true
    })
    discount: string;
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'deposit_amount',
    })
    deposit_amount: string;
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'estimated_amount_deposit',
    })
    estimated_amount_deposit: string;    
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'booking_amount',
    })
    booking_amount: string;
    
    @Column({ type: 'boolean', name: 'is_active', default: true, nullable: false })
    is_active: boolean

    
    @Column({
        type: 'boolean',
        name: 'is_paid',
        nullable: true,
        default: false
    })
    is_paid: boolean;    
    
    @ManyToOne(() => PaymentType, (payment_type) => payment_type.bookings)
    payment_type: PaymentType

    @OneToMany(() => Payment, (payment) => payment.booking)
    payments: Payment[];

    @OneToMany(() => Contract, contract => contract.booking)
    contracts: Contract[];
}