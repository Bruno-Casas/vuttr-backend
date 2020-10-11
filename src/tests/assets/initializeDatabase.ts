import { getConnection } from "typeorm";
import { Tag } from "../../main/entities/Tag";
import { Tool } from "../../main/entities/Tool";

export async function initializeDatabase() {
    const connection = getConnection();
    
    const tag1 = new Tag();
    tag1.name = "tag1";

    const tag2 = new Tag();
    tag2.name = "tag2";

    const tag3 = new Tag();
    tag3.name = "tag3";

    const tag4 = new Tag();
    tag4.name = "tag4";

    const defaultTag = new Tag();
    defaultTag.name = "default";

    const testTag = new Tag();
    testTag.name = "test";

    const tool1 = new Tool();
    tool1.title = "Tool 1";
    tool1.description = "This is the tool 1";
    tool1.link = "tool1.com";
    tool1.tags = [tag1, defaultTag];

    const tool2 = new Tool();
    tool2.title = "Tool 2";
    tool2.description = "This is the tool 2";
    tool2.link = "tool2.com";
    tool2.tags = [tag2, defaultTag, testTag];

    const tool3 = new Tool();
    tool3.title = "Tool 3";
    tool3.description = "This is the tool 3";
    tool3.link = "tool3.com";
    tool3.tags = [tag3, defaultTag];

    const tool4 = new Tool();
    tool4.title = "Tool 4";
    tool4.description = "This is the tool 4";
    tool4.link = "tool4.com";
    tool4.tags = [tag4, defaultTag, testTag];

    await connection.manager.save([tag1,tag2, tag3, tag4, defaultTag, testTag]);

    await connection.manager.save([tool1, tool2, tool3, tool4]);

}
