import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../../modules/booking/entities/booking.entity";

@Entity({
    name: "booking_origin",
})

export class Booking_Origin {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        length: 100,
        name: 'origin_name',
    })
    origin_name: string;

    @OneToMany(() => Booking, (booking) => booking.booking_origin)
    bookings: Booking[]
}