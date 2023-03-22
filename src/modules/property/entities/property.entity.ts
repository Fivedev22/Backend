import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "src/shared/province/province.entity";
import { Booking } from "src/modules/booking/entities/booking.entity";
import { PropertyType } from "./property_type.entity";

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
        name: 'nro_referencia',
        unique: true
    })
    nro_referencia: number;

    @Column('varchar', {
        length: 100,
        name: 'nombre_inmueble',
    })
    nombre_inmueble: string;

    @ManyToOne(() => PropertyType, (property_type) => property_type.id)
    property_type: PropertyType

    @Column('varchar', {
        length: 100,
        name: 'metros_cuadrados',
        nullable: true
    })
    metros_cuadrados: string;

    @Column('varchar', {
        length: 100,
        name: 'calle',
    })
    calle: string;

    @Column('varchar', {
        length: 100,
        name: 'numero',
    })
    numero: string;

    @Column('varchar', {
        length: 100,
        name: 'piso',
        nullable: true
    })
    piso: string;

    @ManyToOne(() => Province, (province) => province.id_province)
    province: Province

    @Column('varchar', {
        length: 100,
        name: 'ciudad',
    })
    ciudad: string;

    @Column('varchar', {
        length: 100,
        name: 'barrio',
    })
    barrio: string;

    @Column('bool',{
        name: 'alquiler_diario',
        default: false,
    })
    alquiler_diario: boolean

    @Column('bool',{
        name: 'alquiler_mensual',
        default: false,
    })
    alquiler_mensual: boolean

    @Column('bool',{
        name: 'alquiler_anual',
        default: false,
    })
    alquiler_anual: boolean

    @Column('int', {
        name: 'cant_habitaciones',
    })
    cant_habitaciones: number;

    @Column('int', {
        name: 'cant_baños',
    })
    cant_baños: number;

    @Column('bool',{
        name: 'internet',
        default: false,
    })
    internet: boolean

    @Column('bool',{
        name: 'pileta',
        default: false,
    })
    pileta: boolean

    @Column('bool',{
        name: 'cocina',
        default: false,
    })
    cocina: boolean

    @Column('bool',{
        name: 'equipo_lavanderia',
        default: false,
    })
    equipo_lavanderia: boolean

    @Column('bool',{
        name: 'patio',
        default: false,
    })
    patio: boolean

    @Column('bool',{
        name: 'parking',
        default: false,
    })
    parking: boolean

    @Column('bool',{
        name: 'acceso_discapacitados',
        default: false,
    })
    acceso_discapacitados: boolean

    @Column('bool',{
        name: 'camas_niños',
        default: false,
    })
    camas_niños: boolean

    @Column('varchar', {
        length: 50,
        name: 'estado_disponibilidad',
        nullable: false,
        unique: true
    })
    estado_disponibilidad: string;

    @Column('varchar', {
        length: 50,
        name: 'estado_actividad',
        nullable: false,
        unique:true
    })
    estado_actividad: string;

    @OneToMany(() => Booking, (booking) => booking.id_booking)
    bookings: Booking[]

}