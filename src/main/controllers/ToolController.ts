import { Request, Response } from 'express'

import { Tool } from '@entities/Tool'
import { ToolService } from '../services/ToolService'
import { TagService } from '../services/TagService'
import { ToolDTO } from 'src/@types/ToolDTO.ds'

const toolService = new ToolService()
const tagService = new TagService()

export class ToolController {
  async new (request: Request, response: Response): Promise<Response> {
    const {
      tags: tagNames,
      title,
      description,
      link
    }: ToolDTO = request.body

    const tags = await tagService.saveFromNames(tagNames)

    let tool = new Tool()
    tool.title = title
    tool.description = description
    tool.link = link
    tool.tags = tags

    tool = await toolService.save(tool)

    return response.status(201).json(tool)
  }

  async getAll (request: Request, response: Response): Promise<Response> {
    const tag = request.query.tag as string

    const tools = await toolService.list(tag)

    const toolsDTO = tools.map(
      (tool): ToolDTO => {
        const { tags, ...toolData } = tool
        const tagNames = tags.map(({ name }) => name)

        return { ...toolData, tags: tagNames }
      }
    )

    return response.json(toolsDTO)
  }

  async get (request: Request, response: Response): Promise<Response> {
    const toolId = Number(request.params.id)

    const tool = await toolService.find(toolId)

    const { tags, ...toolData } = tool
    const tagNames = tags.map(({ name }) => name)

    return response.json({ ...toolData, tags: tagNames })
  }

  async delete (request: Request, response: Response) {
    const id = Number(request.params.id)

    await toolService.remove(id)
    await tagService.removeOrphanTags()

    response.status(204).send()
  }
}
