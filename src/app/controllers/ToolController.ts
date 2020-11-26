import { NextFunction, Response } from 'express'
import { Tool } from '@entities'
import { TagService, ToolService } from '@services'
import { Request, ToolDto } from '@specs/interfaces'
import { merge as objectMapper } from 'object-mapper'
import { mapToolDtoToTool, mapToolToDto } from '@specs/constants'
import { HttpError } from '@specs/errors'

const toolService = new ToolService()
const tagService = new TagService()

export class ToolController {
  async new (request: Request, response: Response, next:NextFunction): Promise<Response> {
    const toolDto = request.body as ToolDto
    const { userId } = request.data

    try {
      let tool = objectMapper(toolDto, mapToolDtoToTool) as Tool

      if (await toolService.checkIfExists(tool)) {
        throw new HttpError('This tool already exists', 406)
      }

      tool.tags = await tagService.saveFromNames(toolDto.tags)
      tool.registeredBy = userId

      tool = await toolService.save(tool)
      delete tool.registeredBy

      return response.status(201).json(objectMapper(tool, mapToolToDto))
    } catch (err) {
      next(err)
    }
  }

  async getMany (request: Request, response: Response, next:NextFunction): Promise<Response> {
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

  async get (request: Request, response: Response, next:NextFunction) {
    const toolId = Number(request.params.id)

    const tool = await toolService.find(toolId)

    if (!tool) {
      return next(new HttpError('Tool not found', 404))
    }

    response.json(objectMapper(tool, mapToolToDto))
  }

  async delete (request: Request, response: Response, next:NextFunction) {
    const id = Number(request.params.id)

    const tool = new Tool()
    tool.id = id

    if (!(await toolService.checkIfExists(tool))) {
      next(new HttpError('Tool not found', 404))
    }

    await toolService.remove(id)
    await tagService.removeOrphanTags()

    response.status(204).send()
  }
}
