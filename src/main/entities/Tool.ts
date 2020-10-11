import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Tag } from '@entities/Tag'

@Entity()
export class Tool {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @Column()
    description: string;

    @ManyToMany(type => Tag, tags => tags.tools)
    @JoinTable()
    tags: Tag[];
}
