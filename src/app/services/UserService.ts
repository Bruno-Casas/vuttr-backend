import { User } from '@entities'
import { FindOneOptions, getRepository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { HttpError } from '@specs/errors'

const userRepository = getRepository(User)
const saltRounds = 10

export class UserService {
  async save (user: User) {
    return new Promise<User>((resolve, reject) => {
      const { username } = user

      userRepository.findOneOrFail({ username })
        .then(existsUser => {
          if (existsUser.active) {
            reject(new HttpError('User already exists', 409))
          }

          user.id = existsUser.id
          user.password = bcrypt.hashSync(user.password, saltRounds)
          user.active = true

          userRepository.update(existsUser.id, user)
            .then(() => resolve(user))
        }).catch(() => {
          user.password = bcrypt.hashSync(user.password, saltRounds)
          userRepository.save(user).then(resolve)
        })
    })
  }

  async find (id: number) {
    return await userRepository.findOne({ id })
  }

  async findByUsernameOrEmail (username: string, email:string, select:FindOneOptions<User>['select']) {
    return await userRepository.findOne({
      where: [{ username }, { email }],
      select
    })
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
