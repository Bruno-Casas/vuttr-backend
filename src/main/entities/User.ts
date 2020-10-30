import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Tool } from '@entities/Tool'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Tool, tool => tool.registeredBy)
    tools?: Tool[];
}
