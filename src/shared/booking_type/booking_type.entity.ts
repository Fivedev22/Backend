import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../../modules/booking/entities/booking.entity";

@Entity({
    name: "booking_type",
})

export class BookingType {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        length: 100,
        name: 'booking_type_name',
    })
    booking_type_name: string;

    @OneToMany(() => Booking, (booking) => booking.id_booking)
    bookings: Booking[]


}