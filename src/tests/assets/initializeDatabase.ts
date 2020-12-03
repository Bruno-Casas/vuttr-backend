import { User, Tag, Tool } from '@entities'
import { getConnection } from 'typeorm'

import * as bcrypt from 'bcrypt'

export async function initializeDatabase () {
  const connection = getConnection()

  const user1 = new User()
  user1.username = 'testUser1'
  user1.email = 'user1@example.com'
  user1.password = bcrypt.hashSync('Password@123', 10)

  const user2 = new User()
  user2.username = 'testUser2'
  user2.email = null
  user2.password = null
  user2.active = false

  const user3 = new User()
  user3.username = 'testUser3'
  user3.email = 'user3@example.com'
  user3.password = bcrypt.hashSync('Password@123', 10)

  const tag1 = new Tag()
  tag1.name = 'tag1'

  const tag2 = new Tag()
  tag2.name = 'tag2'

  const tag3 = new Tag()
  tag3.name = 'tag3'

  const tag4 = new Tag()
  tag4.name = 'tag4'

  const defaultTag = new Tag()
  defaultTag.name = 'default'

  const testTag = new Tag()
  testTag.name = 'test'

  const tool1 = new Tool()
  tool1.title = 'Tool 1'
  tool1.description = 'This is the tool 1'
  tool1.link = 'tool1.com'
  tool1.registeredBy = user1
  tool1.tags = [tag1, defaultTag]

  const tool2 = new Tool()
  tool2.title = 'Tool 2'
  tool2.description = 'This is the tool 2'
  tool2.link = 'tool2.com'
  tool2.registeredBy = user2
  tool2.tags = [tag2, defaultTag, testTag]

  const tool3 = new Tool()
  tool3.title = 'Tool 3'
  tool3.description = 'This is the tool 3'
  tool3.link = 'tool3.com'
  tool3.registeredBy = user1
  tool3.tags = [tag3, defaultTag]

  const tool4 = new Tool()
  tool4.title = 'Tool 4'
  tool4.description = 'This is the tool 4'
  tool4.link = 'tool4.com'
  tool4.registeredBy = user2
  tool4.tags = [tag4, defaultTag, testTag]

  await connection.manager.save([user1, user2, user3])

  await connection.manager.save([tag1, tag2, tag3, tag4, defaultTag, testTag])

  await connection.manager.save([tool1, tool2, tool3, tool4])
}
