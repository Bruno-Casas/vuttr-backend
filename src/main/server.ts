import * as dotenv from 'dotenv'
import { createConnection } from 'typeorm'
import { dbConfig } from './config/database'

dotenv.config()
const port = process.env.SERVER_PORT || 3000

createConnection(dbConfig())
  .then(async () => {
    console.log('Info: Connected to the database')
    const { app } = await import('./app')

    app.listen(port, () => {
      console.log(`Info: Server running in port ${port}`)
    })
  })
  .catch(console.error)
