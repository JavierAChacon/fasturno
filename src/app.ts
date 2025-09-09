import express from 'express'
import type { Express } from 'express'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth'

const app: Express = express()

app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

export default app
