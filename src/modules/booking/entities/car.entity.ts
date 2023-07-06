import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity({ name: 'car' })
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'brand' })
    brand: string;

    @Column({ type: 'varchar', name: 'model' })
    model: string;

    @Column({ type: 'varchar', name: 'license_plate' })
    licensePlate: string;

    @ManyToOne(() => Booking, booking => booking.cars)
    @JoinColumn({ name: 'id_booking' }) 
    booking: Booking;
}
