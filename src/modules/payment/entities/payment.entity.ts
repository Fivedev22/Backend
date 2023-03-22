import { Booking } from "src/modules/booking/entities/booking.entity";
import { Client } from "src/modules/client/client.entity";
import { Property } from "src/modules/property/entities/property.entity";
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

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => Booking)
    @JoinColumn()
    booking: Booking

    @OneToOne(() => Client)
    @JoinColumn()
    client: Client

    @OneToOne(() => Property)
    @JoinColumn()
    property: Property

    @Column('bool',{
        name: 'payment_status',
        default: false,
        nullable: true
    })
    payment_status: boolean

    // las siguientes columnas salvo la ultima hay que ver si se pueden asociar con la de reserva para no poner todo de nuevo
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
        name: 'booking_amount',
    })
    booking_amount: number;

    @Column({
        type: "int",
        name: 'booking_discount',
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
        name: 'payment_amount_subtotal',
    })
    payment_amount_subtotal: number;

    @Column({
        type: 'int',
        name: 'payment_amount_total',
    })
    payment_amount_total: number;

    @ManyToOne(() => PaymentType, (payment_type) => payment_type.id)
    payment_type: PaymentType

}