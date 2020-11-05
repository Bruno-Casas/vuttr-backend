export const mapToolToDto = {
  id: 'id',
  title: 'title',
  link: 'link',
  description: 'description',
  'tags[].name': 'tags',
  'registeredBy.username': 'registered_by'
}

export const mapToolDtoToTool = {
  id: 'id',
  title: 'title',
  link: 'link',
  description: 'description',
  tags: 'tags[].name'
}

export const mapRequestBodyToToDto = {
  id: 'id',
  title: 'title?',
  link: 'link?',
  description: 'description?',
  tags: 'tags?'
}
