import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "src/modules/client/client.entity";
import { BookingType } from "src/modules/booking/entities/booking_type.entity";
import { Booking_Origin } from "src/modules/booking/entities/origin.entity";


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

    @ManyToOne(() => Client, (client) => client.id_client)
    client: Client

    //@ManyToOne(() => Inmueble, (inmueble) => inmueble.id)
    //inmueble: Inmueble

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
        name: 'cant_mascotas',
    })
    cant_mascotas: number;

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
        type: 'time',
        name: 'hora_check_in',
    })
    hora_check_in: string;

    @Column({ 
        type: 'time',
        name: 'hora_check_out',
    })
    hora_check_out: string;

    @Column({
        type: 'int',
        name: 'precio_incial',
    })
    precio_incial: number;

    @Column({
        type: 'int',
        name: 'descuento',
        nullable: true
    })
    descuento: number;

    @Column({
        type: 'int',
        name: 'monto_seña',
    })
    monto_seña: number;

    @Column({
        type: 'int',
        name: 'monto_estimado_seña',
    })
    monto_estimado_seña: number;

    @Column({
        type: 'int',
        name: 'monto_reserva',
    })
    monto_reserva: number;    
 
}