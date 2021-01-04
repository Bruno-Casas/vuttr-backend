import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Tool } from '@entities'
import { IsDefined, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsDefined()
    @IsNotEmpty()
    @Matches(/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/)
    username: string;

    @Column({ unique: true, nullable: true })
    @IsDefined()
    @IsEmail()
    email: string;

    @Column({ nullable: true, type: 'character', length: 60, select: false })
    @IsDefined()
    @IsString()
    @MinLength(8)
    password: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Tool, tool => tool.registeredBy)
    tools?: Tool[];
}
