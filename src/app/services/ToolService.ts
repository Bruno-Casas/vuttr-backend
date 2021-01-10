import { Tool } from '@entities'
import { HttpError } from '@specs/errors'
import { FindManyOptions, getRepository, SelectQueryBuilder } from 'typeorm'

const toolRepository = getRepository(Tool)

export class ToolService {
  async save (tool: Tool) {
    return await toolRepository.save(tool)
  }

  async list (tag:string = '', page:number, size:number): Promise<[Tool[], number]> {
    let tagFilter: (queryBuider: SelectQueryBuilder<Tool>) => void
    if (tag) {
      tagFilter = (queryBuilder) => {
        queryBuilder.where('tags.name = :tag', { tag })
      }
    }

    const findOptions: FindManyOptions = {
      relations: ['tags', 'registeredBy'],
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
      relations: ['tags', 'registeredBy']
    })

    return tool
  }

  async update (id: number, tool: Tool) {
    const targetTool = await toolRepository.findOne({ id })

    if (!targetTool) {
      throw new HttpError('Tool not found', 404)
    }

    const { title } = await toolRepository.findOne({ title: tool.title })
    if (title !== tool.title) {
      throw new HttpError('Title not available', 409)
    }

    tool.id = id

    return toolRepository.save(tool)
  }

  async remove (id: number) {
    await toolRepository.delete({ id })
  }

  async checkIfExists (tool:Tool) {
    const countTool = await toolRepository.count({
      where: [
        { title: tool.title },
        { id: tool.id }
      ]
    })
    return Boolean(countTool)
  }
}
