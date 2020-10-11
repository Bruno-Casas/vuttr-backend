import { Tool } from "@entities/Tool";
import { getRepository, SelectQueryBuilder } from "typeorm";

const toolRepository = getRepository(Tool);

export class ToolService {
    async save(tool: Tool) {
        return await toolRepository.save(tool);
    }

    async list(tag: string = "") {
        let tagFilter: (queryBuider: SelectQueryBuilder<Tool>) => void;
        if (tag)
            tagFilter = (queryBuider) => {
                queryBuider.where("tags.name = :tag", { tag });
            };

        const tools = await toolRepository.find({
            relations: ["tags"],
            join: {
                alias: "tool",
                innerJoin: { tags: "tool.tags" },
            },
            where: tagFilter,
        });

        return tools;
    }

    async find(id: number) {
        const tool = await toolRepository.findOne(id, {
            relations: ["tags"],
        });

        return tool;
    }

    async remove(id: number) {
        await toolRepository.delete({ id });
    }
}
