import { Booking } from "src/modules/booking/entities/booking.entity";
import { Client } from "src/modules/client/client.entity";
import { Property } from "src/modules/property/entities/property.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentType } from "./payment_type.entity";

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
        name: 'nro_cobro',
        unique: true
    })
    nro_cobro: number;

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
        name: 'estado_cobro',
        default: false,
        nullable: true
    })
    estado_cobro: boolean

    // las siguientes columnas salvo la ultima hay que ver si se pueden asociar con la de reserva para no poner todo de nuevo
    @Column({ 
        type: 'date',
        name: 'fecha_check_in',
    })
    fecha_check_in: string;

    @Column({ 
        type: 'date',
        name: 'fecha_check_out',
    })
    fecha_check_out: string;

    @Column({
        type: 'int',
        name: 'monto_reserva',
    })
    monto_reserva: number;

    @Column({
        type: "int",
        name: 'descuento_reserva',
        nullable: true
    })
    descuento_reserva: number;

    @Column({
        type: 'int',
        name: 'monto_seña',
    })
    monto_seña: number;

    @Column({
        type: 'int',
        name: 'subtotal',
    })
    subtotal: number;

    @Column({
        type: 'int',
        name: 'total',
    })
    total: number;

    @ManyToOne(() => PaymentType, (payment_type) => payment_type.id)
    payment_type: PaymentType

}