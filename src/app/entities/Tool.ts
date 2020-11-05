import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm'
import { Tag } from '@entities/Tag'
import { User } from '@entities/User'

@Entity({ name: 'tools' })
export class Tool {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    link: string;

    @Column({ nullable: false })
    description: string;

    @ManyToMany(() => Tag, tags => tags.tools)
    @JoinTable({
      name: 'tools_tags',
      joinColumn: { name: 'tool_id' },
      inverseJoinColumn: { name: 'tag_id' }

    })
    tags: Tag[];

    @ManyToOne(() => User, user => user.tools)
    @JoinColumn({ name: 'registered_by' })
    registeredBy: number | User;
}
