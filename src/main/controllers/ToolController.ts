import { Request, Response } from 'express';
import { Any, getRepository, In, Repository, SelectQueryBuilder } from "typeorm";
import { Tag } from "@entities/Tag";
import { Tool } from '@entities/Tool';

let toolRepository: Repository<Tool>
let tagRepository: Repository<Tag>

export function ToolController() {
	toolRepository = getRepository(Tool)
	tagRepository = getRepository(Tag)
	return toolControllerActions;
}

const toolControllerActions = {
	new: async (request: Request, response: Response): Promise<Response> => {
		const { title, link, description, tags: tagNames } = request.body

		const toolData = { title, link, description }


		let tags = await tagRepository.find({ name: In(tagNames) })

		const newTags = tagNames.filter(
			(tagName: string) => !tags.some(tag => tag.name === tagName)
		)

		if (newTags) {
			let inserts = []
			newTags.forEach(async (tagName: string) => {
				inserts.push(tagRepository.save({ name: tagName }))
			})

			tags.push(...(await Promise.all(inserts)))
		}

		const { id: toolId } = await toolRepository.save({ ...toolData, tags })

		return response.status(201).json({ ...toolData, tags: tagNames, id: toolId });
	},

	getAll: async (request: Request, response: Response): Promise<Response> => {


		const { tag } = request.query

		let tagFilter: (queryBuider: SelectQueryBuilder<Tool>) => void
		if (tag)
			tagFilter = queryBuider => {
				queryBuider.where('tags.name = :tag', { tag })
			}


		const tools = await toolRepository.find({
			relations: ['tags'],
			join: {
				alias: 'tool',
				innerJoin: { tags: 'tool.tags' }
			},
			where: tagFilter
		})

		const preparedTools = tools.map(tool => {
			const { id, tags, ...modelTool } = tool
			const tagNames = tags.map(({ name }) => name)

			return { ...modelTool, tags: tagNames, id }
		})

		return response.json(preparedTools)
	},

	get: async (request: Request, response: Response): Promise<Response> => {

		const toolId = Number(request.params.id);

		const tool = await toolRepository.findOne(toolId, { relations: ['tags'] })

		const { id, tags, ...responseTool } = tool
		const tagNames = tags.map(({ name }) => name)


		return response.json({ ...responseTool, tags: tagNames, id })
	},

	delete: async (request: Request, response: Response) => {

		const id = Number(request.params.id)

		await toolRepository.delete({id})

		await tagRepository
			.createQueryBuilder('tag')
			.leftJoin("tag.tools", "tools")
			.where("tools.id IS NULL")
			.getMany()
			.then(async ( tags ) => {
				await tagRepository.remove(tags)
			})

		response.status(204).send()
	}

}
