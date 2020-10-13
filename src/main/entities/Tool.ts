import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Tag } from '@entities/Tag'

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
}
