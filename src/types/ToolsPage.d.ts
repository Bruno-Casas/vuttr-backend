import { ToolDTO } from '@appTypes/ToolDTO'

export interface ToolsPage{
    total: number,
    size: number,
    page: number,
    // eslint-disable-next-line camelcase
    last_page: number,
    // eslint-disable-next-line camelcase
    next_page_url?: URL,
    // eslint-disable-next-line camelcase
    prev_page_url?: URL,
    tools?: Array<ToolDTO>
}
