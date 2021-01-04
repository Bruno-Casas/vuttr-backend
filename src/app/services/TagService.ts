import { Tag } from '@entities'
import { getRepository, In } from 'typeorm'

const tagRepository = getRepository(Tag)

export class TagService {
  async checkAndSave (tags: Array<Tag>) {
    const { okTags, unregisteredTags } = await this.checkTags(tags)

    if (unregisteredTags.length) {
      const insertsTags: Array<Promise<Tag>> = []
      unregisteredTags.forEach(tag => {
        insertsTags.push(tagRepository.save(tag))
      })

      okTags.push(...(await Promise.all(insertsTags)))
    }

    okTags.sort()
    return okTags
  }

  async removeOrphanTags () {
    await tagRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.tools', 'tools')
      .where('tools.id IS NULL')
      .getMany()
      .then(async (tags) => {
        await tagRepository.remove(tags)
      })
  }

  private async checkTags (
    tags: Array<Tag>
  ): Promise<{ okTags: Array<Tag>; unregisteredTags: Array<Tag> }> {
    const okTags = await tagRepository.find({
      name: In(tags.map(tag => tag.name))
    })

    const unregisteredTags = tags.filter(
      ({ name }) => !okTags.some(tag => tag.name === name)
    )

    return { okTags, unregisteredTags }
  }
}
