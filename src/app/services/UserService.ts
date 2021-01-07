import { User } from '@entities'
import { FindOneOptions, getRepository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { HttpError } from '@specs/errors'

const userRepository = getRepository(User)
const saltRounds = 10

export class UserService {
  async save (user: User) {
    const { username, email } = user

    const existsUser = await userRepository.findOne({ username })
    if (existsUser && existsUser.active) {
      throw new HttpError('User already exists', 409)
    }

    const checkEmail = Boolean(await userRepository.count({ email }))
    if (checkEmail) {
      throw new HttpError('Email not available', 409)
    }

    user.id = existsUser ? existsUser.id : undefined
    user.password = bcrypt.hashSync(user.password, saltRounds)
    user.active = true

    return userRepository.save(user)
  }

  async find (id: number) {
    return await userRepository.findOne({ id })
  }

  async findByUsernameOrEmail (username: string, email: string, select: FindOneOptions<User>['select']) {
    return await userRepository.findOne({
      where: [{ username }, { email }],
      select
    })
  }

  async update (id: number, user: User) {
    const targetUser = await userRepository.findOne({ id })

    if (!targetUser) {
      throw new HttpError('User not found', 404)
    }

    const checkUser = await userRepository.findOne({ username: user.username })
    if (targetUser.username !== user.username && checkUser) {
      throw new HttpError('Username not available', 409)
    }

    const checkEmail = Boolean(await userRepository.count({ email: user.email }))
    if (targetUser.email !== user.email && checkEmail) {
      throw new HttpError('Email not available', 409)
    }

    user.id = id
    user.password = bcrypt.hashSync(user.password, saltRounds)

    return userRepository.save(user)
  }

  async remove (id: number) {
    const user = await userRepository.findOne({ id })

    if (!user) {
      throw new HttpError('User not found', 404)
    }

    const userTool = await userRepository
      .createQueryBuilder()
      .relation('tools')
      .of(id)
      .loadOne()

    if (userTool) {
      user.email = null
      user.password = null
      user.active = false
      await userRepository.update(id, user)
    } else {
      await userRepository.delete(id)
    }
  }
}
