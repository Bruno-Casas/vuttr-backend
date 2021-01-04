import { NextFunction, Response } from 'express'
import { Tool } from '@entities'
import { TagService, ToolService } from '@services'
import { Request, ToolsPage } from '@specs/interfaces'
import { HttpError } from '@specs/errors'
import { classToPlain } from 'class-transformer'

const toolService = new ToolService()
const tagService = new TagService()

export class ToolController {
  async new (request: Request, response: Response, next:NextFunction) {
    const { userId } = request.data
    let tool = request.body as Tool

    if (await toolService.checkIfExists(tool)) {
      return next(new HttpError('This tool already exists', 406))
    }

    tool.tags = await tagService.checkAndSave(tool.tags)
    tool.registeredBy = userId

    tool = await toolService.save(tool)
    delete tool.registeredBy

    return response.status(201).json(classToPlain(tool))
  }

  async getMany (request: Request, response: Response, next:NextFunction) {
    const tag = request.query.tag as string
    let page = Number.parseInt(request.query.page as string)
    let size = Number.parseInt(request.query.size as string)

    if (page || size) {
      page = page || 1
      size = size || 10
    }

    const [tools, total] = await toolService.list(tag, page, size)

    if (total) {
      const responseBody:ToolsPage = {
        page,
        size,
        total,
        tools: classToPlain(tools) as Array<Tool>,
        last_page: Math.ceil(total / size)
      }
      return response.json(responseBody)
    }

    return response.json(classToPlain(tools))
  }

  async get (request: Request, response: Response, next:NextFunction) {
    const toolId = Number(request.params.id)

    const tool = await toolService.find(toolId)

    if (!tool) {
      return next(new HttpError('Tool not found', 404))
    }

    response.json(classToPlain(tool))
  }

  async delete (request: Request, response: Response, next:NextFunction) {
    const id = Number(request.params.id)

    const tool = new Tool()
    tool.id = id

    if (!(await toolService.checkIfExists(tool))) {
      return next(new HttpError('Tool not found', 404))
    }

    await toolService.remove(id)
    await tagService.removeOrphanTags()

    response.status(204).send()
  }
}
