import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./payment.entity";

@Entity({
    name: 'payment_type',
})

export class PaymentType {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        length: 100,
        name: 'tipo_cobro',
    })
    tipo_cobro: string;

    @OneToMany(() => Payment, (payment) => payment.id_payment)
    payments: Payment[]
}