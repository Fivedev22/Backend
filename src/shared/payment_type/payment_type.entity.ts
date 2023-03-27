import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "../../modules/payment/entities/payment.entity";

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
        name: 'payment_type_name',
    })
    payment_type_name: string;

    @OneToMany(() => Payment, (payment) => payment.payment_type)
    payments: Payment[]
}