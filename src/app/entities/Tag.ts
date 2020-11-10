import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Tool } from '@entities'

@Entity({ name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(type => Tool, tools => tools.tags)
    tools: Tool[]
}
