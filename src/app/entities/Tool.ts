import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm'
import { Tag, User } from '@entities'
import { ArrayNotEmpty, IsDefined, IsFQDN, IsNotEmpty, MaxLength } from 'class-validator'
import { Expose, Transform } from 'class-transformer'

@Entity({ name: 'tools' })
export class Tool {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsDefined()
    @IsNotEmpty()
    title: string;

    @Column({ nullable: false })
    @IsDefined()
    @IsFQDN()
    link: string;

    @Column({ nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @MaxLength(250)
    description: string;

    @ManyToMany(() => Tag, tags => tags.tools)
    @JoinTable({
      name: 'tools_tags',
      joinColumn: { name: 'tool_id' },
      inverseJoinColumn: { name: 'tag_id' }

    })
    @IsDefined()
    @ArrayNotEmpty()
    @Transform((tags:Array<Tag>) => tags.map(tag => tag.name), { toPlainOnly: true })
    @Transform(tagsTransformPlainToClass, { toClassOnly: true })
    tags: Tag[];

    @ManyToOne(() => User, user => user.tools)
    @JoinColumn({ name: 'registered_by' })
    @Expose({ name: 'registered_by' })
    @Transform((user:User) => !user ? undefined : user.username, { toPlainOnly: true })
    registeredBy: number | User;
}

function tagsTransformPlainToClass (tagNames:Array<string>) {
  return tagNames.map(tagName => {
    const tag = new Tag()
    tag.name = tagName
    return tag
  })
}
