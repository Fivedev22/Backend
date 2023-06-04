import { Booking } from "src/modules/booking/entities/booking.entity";
import { Client } from "src/modules/client/client.entity";
import { Property } from "src/modules/property/entities/property.entity";
import { PaymentStatus } from "src/shared/payment_status/payment_status.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentType } from "../../../shared/payment_type/payment_type.entity";

@Entity({
    name: "payment",
})

export class Payment {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id_payment',
    })
    id_payment: number;

    @Column({
        type: 'int',
        name: 'payment_number',
        unique: true
    })
    payment_number: number;

    @Column({
        type: 'date',
        name: 'createdAt',
        nullable: true
    })
    createdAt: Date;

    @ManyToOne(() => Booking, booking => booking.payments)
    @JoinColumn()
    booking: Booking

    @ManyToOne(() => Client, client => client.payments)
    @JoinColumn()
    client: Client

    @ManyToOne(() => Property, property => property.payments)
    @JoinColumn()
    property: Property

    // las siguientes columnas salvo la ultima hay que ver si se pueden asociar con la de reserva para no cargar todo de nuevo
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
        type: 'int',
        name: 'booking_starting_price',
    })
    booking_starting_price: number;

    @Column({
        type: 'decimal',
        name: 'booking_discount',
        precision: 10, // ajusta según tus necesidades
        scale: 2, // ajusta según tus necesidades
        nullable: true
    })
    booking_discount: number;

    @Column({
        type: 'int',
        name: 'deposit_amount',
    })
    deposit_amount: number;

    @Column({
        type: 'int',
        name: 'booking_amount',
    })
    booking_amount: number;


    @Column({
        type: 'int',
        name: 'extra_expenses',
        nullable: true
    })
    extra_expenses: number;

    @Column({
        type: 'int',
        name: 'payment_amount_subtotal',
    })
    payment_amount_subtotal: number;

    @Column({
        type: 'int',
        name: 'payment_amount_total',
    })
    payment_amount_total: number;

    @ManyToOne(() => PaymentType, (payment_type) => payment_type.payments)
    payment_type: PaymentType

    @ManyToOne(() => PaymentStatus, (payment_status) => payment_status.payments)
    payment_status: PaymentStatus

    @Column({ type: 'boolean', name: 'is_active', default: true, nullable: false })
    is_active: boolean
    // el is_active es para archivar y desarchivar el cobro

}