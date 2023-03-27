import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "../../modules/payment/entities/payment.entity";

@Entity({
    name: 'payment_status',
})

export class PaymentStatus {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id_payment_status',
    })
    id_payment_status: number;

    @Column('varchar', {
        length: 100,
        name: 'payment_status_name',
    })
    payment_status_name: string;

    @OneToMany(() => Payment, (payment) => payment.payment_status)
    payments: Payment[]
}