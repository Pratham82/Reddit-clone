import { MikroORM } from '@mikro-orm/core'
import { Post } from './entities/Post'
import { __prod__ } from './constants'
import microOrmConfig from './mikro-orm.config'

const main = async () => {
  const orm = await MikroORM.init(microOrmConfig)
  await orm.getMigrator().up()
  // const post = orm.em.create(Post, { title: 'My first Post' })
  //  await orm.em.persistAndFlush(post)
  const posts = await orm.em.find(Post, {})
  console.log(posts)
}

main()
