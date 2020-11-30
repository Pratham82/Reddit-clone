import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import { PORT, __prod__ } from './constants'
import microOrmConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'

const main = async () => {
  // Connecting ORM to postgresql
  const orm = await MikroORM.init(microOrmConfig)
  await orm.getMigrator().up()
  // const post = orm.em.create(Post, { title: 'My first Post' })
  //  await orm.em.persistAndFlush(post)
  // const posts = await orm.em.find(Post, {})
  //console.log(posts)

  // Starting express server
  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  })

  apolloServer.applyMiddleware({
    app,
  })

  app.get('/', (_, res) => res.send('Hello from express'))

  app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
}

main()
