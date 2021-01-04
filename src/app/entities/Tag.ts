import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Tool } from '@entities'
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsNotEmpty()
    name: string;

    @ManyToMany(type => Tool, tools => tools.tags)
    tools: Tool[]
}
