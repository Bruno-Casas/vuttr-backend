import { Response } from 'express'
import { Tool } from '@entities/Tool'
import { ToolService } from '@services/ToolService'
import { TagService } from '@services/TagService'
import { ToolDTO } from '@appTypes/ToolDTO'
import { Request } from '@appTypes/Request'
import { generatePageMetadata } from '../utils/ToolsContollerUtils'
import { ToolsPage } from '@appTypes/ToolsPage'

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
    const { userId } = request.data

    try {
      let tool = new Tool()
      tool.title = title
      tool.description = description
      tool.link = link
      tool.tags = []
      tool.registeredBy = userId

      if (Object.values(tool).some(value => value === undefined) ||
        !Array.isArray(tagNames)) {
        throw new Error('Invalid request body')
      }

      const tags = await tagService.saveFromNames(tagNames)

      if (!tags.length) {
        throw new Error('At least one tag is required')
      }

      tool.tags = tags
      tool = await toolService.save(tool)

      return response.status(201).json(tool)
    } catch (err) {
      const applicationError = err as Error

      return response.status(406).json({
        error: true,
        message: applicationError.message
      })
    }
  }

  async getMany (request: Request, response: Response): Promise<Response> {
    const tag = request.query.tag as string
    let page = Number.parseInt(request.query.page as string)
    let size = Number.parseInt(request.query.size as string)

    if (page || size) {
      page = page || 1
      size = size || 10
    }

    const [tools, total] = await toolService.list(tag, page, size)
    const toolsDTO = tools.map(
      (tool): ToolDTO => {
        const { tags, ...toolData } = tool
        const tagNames = tags.map(({ name }) => name)

        return { ...toolData, tags: tagNames }
      }
    )

    let responseBody: Array<ToolDTO> | ToolsPage
    if (total) {
      responseBody = generatePageMetadata(page, size, total)
      responseBody.tools = toolsDTO
      return response.json(responseBody)
    }

    return response.json(toolsDTO)
  }

  async get (request: Request, response: Response): Promise<Response> {
    const toolId = Number(request.params.id)

    const tool = await toolService.find(toolId)

    if (!tool) {
      return response.status(404).json({
        error: true,
        message: 'Tool not found'
      })
    }

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
