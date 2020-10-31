import { ToolsPage } from '@appTypes/ToolsPage'

export function generatePageMetadata (page:number, size:number, total:number) {
  const dataPage: ToolsPage = {
    page,
    size,
    total,
    last_page: Math.ceil(total / size)
  }

  return dataPage
}
