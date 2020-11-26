import { Tag } from '@entities'
import { getRepository, In } from 'typeorm'

const tagRepository = getRepository(Tag)

export class TagService {
  async saveFromNames (tagsNames: Array<string>) {
    const { okTags: tags, unregisteredTagsNames } = await this.checkTags(
      tagsNames
    )

    if (unregisteredTagsNames.length) {
      const insertsTags = []
      unregisteredTagsNames.forEach((tagName) => {
        insertsTags.push(tagRepository.save({ name: tagName }))
      })

      tags.push(...(await Promise.all(insertsTags)))
    }

    tags.sort()
    return tags
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
    tags: Array<string>
  ): Promise<{ okTags: Array<Tag>; unregisteredTagsNames: Array<string> }> {
    const okTags = await tagRepository.find({ name: In(tags) })

    const unregisteredTagsNames = tags.filter(
      (tagName) => !okTags.some((tag) => tag.name === tagName)
    )

    return { okTags, unregisteredTagsNames }
  }
}
