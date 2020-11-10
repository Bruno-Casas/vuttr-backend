/* eslint-disable camelcase */
import { ToolDto } from '@specs/interfaces'

export interface ToolsPage{
    total: number,
    size: number,
    page: number,
    last_page: number,
    next_page_url?: URL,
    prev_page_url?: URL,
    tools?: Array<ToolDto>
}
