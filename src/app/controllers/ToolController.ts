import { Response } from 'express'
import { Tool } from '@entities/Tool'
import { ToolService } from '@services/ToolService'
import { TagService } from '@services/TagService'
import { ToolDto } from '@appTypes/ToolDTO'
import { Request } from '@appTypes/Request'
import { ToolsPage } from '@appTypes/ToolsPage'
import { merge as objectMapper } from 'object-mapper'
import { mapRequestBodyToToDto, mapToolDtoToTool, mapToolToDto } from '../maps/ToopMaps'

const toolService = new ToolService()
const tagService = new TagService()

export class ToolController {
  async new (request: Request, response: Response): Promise<Response> {
    const toolDto = objectMapper(request.body, mapRequestBodyToToDto) as ToolDto
    const { userId } = request.data

    try {
      if (!toolDto.tags.length) {
        throw new Error('At least one tag is required')
      }

      if (Object.values(toolDto).some(value => value === null)) {
        throw new Error('Invalid request body')
      }

      let tool = objectMapper(toolDto, mapToolDtoToTool) as Tool
      tool.tags = await tagService.saveFromNames(toolDto.tags)
      tool.registeredBy = userId

      tool = await toolService.save(tool)
      delete tool.registeredBy

      return response.status(201).json(objectMapper(tool, mapToolToDto))
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
    const toolsDTO = tools.map(tool => objectMapper(tool, mapToolToDto) as Array<ToolDto>)

    if (total) {
      const responseBody = {
        page,
        size,
        total,
        tools: toolsDTO,
        last_page: Math.ceil(total / size)
      }
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
