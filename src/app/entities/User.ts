import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Tool } from '@entities/Tool'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, type: 'bytea' })
    password: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Tool, tool => tool.registeredBy)
    tools?: Tool[];
}
