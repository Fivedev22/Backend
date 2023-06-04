/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "src/shared/province/province.entity";
import { Booking } from "src/modules/booking/entities/booking.entity";
import { PropertyType } from "../../../shared/property_type/property_type.entity";
import { AvailabilityStatus } from "src/shared/availability_status/availability_status.entity";
import { ActivityStatus } from "src/shared/activity_status/activity_status.entity";
import { Payment } from "src/modules/payment/entities/payment.entity";
import { Image } from "src/shared/image/image.entity";
import { Inventory } from "./inventory.entity";

@Entity({
    name: "property",
})

export class Property {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id_property',
    })
    id_property: number;

    @Column({
        type: 'int',
        name: 'reference_number',
        unique: true
    })
    reference_number: number;

    @Column('varchar', {
        length: 100,
        name: 'property_name',
        nullable: false
    })
    property_name: string;

    @ManyToOne(() => PropertyType, (property_type) => property_type.properties)
    property_type: PropertyType

    @Column('varchar', {
        length: 100,
        name: 'square_meter',
        nullable: true
    })
    square_meter: string;

    @Column('varchar', {
        length: 100,
        name: 'street',
    })
    street: string;

    @Column('varchar', {
        length: 100,
        name: 'street_number',
    })
    street_number: string;

    @Column('varchar', {
        length: 100,
        name: 'building_floor',
        nullable: true
    })
    building_floor: string;

    @ManyToOne(() => Province, (province) => province.properties)
    province: Province

    @Column('varchar', {
        length: 100,
        name: 'town',
    })
    town: string;

    @Column('varchar', {
        length: 100,
        name: 'district',
    })
    district: string;
    // puse district para barrio//

    @Column('bool',{
        name: 'daily_rent',
        default: false,
    })
    daily_rent: boolean

    @Column('bool',{
        name: 'monthly_rent',
        default: false,
    })
    monthly_rent: boolean

    @Column('bool',{
        name: 'annual_rent',
        default: false,
    })
    annual_rent: boolean

    @Column('int', {
        name: 'rooms_number',
    })
    rooms_number: number;

    @Column('int', {
        name: 'bathrooms_number',
    })
    bathrooms_number: number;

    @Column('bool',{
        name: 'internet',
        default: false,
    })
    internet: boolean

    @Column('bool',{
        name: 'pool',
        default: false,
    })
    pool: boolean

    @Column('bool',{
        name: 'kitchen',
        default: false,
    })
    kitchen: boolean

    @Column('bool',{
        name: 'laundry_equipment',
        default: false,
    })
    laundry_equipment: boolean

    @Column('bool',{
        name: 'yard',
        default: false,
    })
    yard: boolean

    @Column('bool',{
        name: 'parking',
        default: false,
    })
    parking: boolean

    @Column('bool',{
        name: 'disabled_access',
        default: false,
    })
    disabled_access: boolean

    @Column('bool',{
        name: 'kids_beds',
        default: false,
    })
    kids_beds: boolean

    @ManyToOne(() => AvailabilityStatus, (availability_status) => availability_status.properties)
    availability_status: AvailabilityStatus

    @ManyToOne(() => ActivityStatus, (activity_status) => activity_status.properties)
    activity_status: ActivityStatus

    @OneToMany(() => Booking, (booking) => booking.property)
    bookings: Booking[];

    @OneToMany(() => Payment, (payment) => payment.property)
    payments: Payment[];

    @OneToMany(() => Image, (image) => image.property)
    images: Image[]

    @Column({ type: 'boolean', name: 'is_active', default: true, nullable: false })
    is_active: boolean
    // el is_active es para archivar y desarchivar el cobro

    
     // Relación con la entidad Image
     @OneToMany(() => Image, image => image.property)
     images: Image[];

     // Relación con la entidad Inventory
     @OneToMany(() => Inventory, inventory => inventory.property)
     inventories: Inventory[];


}