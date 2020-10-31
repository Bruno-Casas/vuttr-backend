import { Tool } from '@entities/Tool'
import { FindManyOptions, getRepository, SelectQueryBuilder } from 'typeorm'

const toolRepository = getRepository(Tool)

export class ToolService {
  async save (tool: Tool) {
    return await toolRepository.save(tool)
  }

  async list (tag:string = '', page:number, size:number): Promise<[Tool[], number]> {
    let tagFilter: (queryBuider: SelectQueryBuilder<Tool>) => void
    if (tag) {
      tagFilter = (queryBuider) => {
        queryBuider.where('tags.name = :tag', { tag })
      }
    }

    const findOptions: FindManyOptions = {
      relations: ['tags'],
      join: {
        alias: 'tool',
        innerJoin: { tags: 'tool.tags' }
      },
      where: tagFilter,
      cache: true
    }

    if (page || size) {
      findOptions.skip = size * (page - 1)
      findOptions.take = size

      return await toolRepository.findAndCount(findOptions)
    }

    return [await toolRepository.find(findOptions), undefined]
  }

  async find (id: number) {
    const tool = await toolRepository.findOne(id, {
      relations: ['tags']
    })

    return tool
  }

  async remove (id: number) {
    await toolRepository.delete({ id })
  }
}
