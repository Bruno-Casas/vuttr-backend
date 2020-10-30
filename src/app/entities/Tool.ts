import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm'
import { Tag } from '@entities/Tag'
import { User } from '@entities/User'

@Entity()
export class Tool {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    link: string;

    @Column({ nullable: false })
    description: string;

    @ManyToMany(type => Tag, tags => tags.tools)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(() => User, user => user.tools)
    registeredBy: User | number;
}
