import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id_user: number;

    @Column({ type: 'varchar', name: 'name', length: 120, nullable: false })
    name: string;

    @Column({ type: 'varchar', name: 'last_name', length: 120, nullable: false })
    last_name: string;

    @Column({ type: 'varchar', name: 'username', length: 100, nullable: false })
    username: string;
    @Column({ type: 'varchar', name: 'email', nullable: true, unique: true })
    email: string;

    @Column({ type: 'varchar', name: 'password', length: 100, nullable: false })
    password: string;

    @Column({ type: 'uuid', name: 'reset_token', unique: true, nullable: true })
    reset_token: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
}
