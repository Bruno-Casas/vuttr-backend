import * as dotenv from 'dotenv'
import { createConnection } from 'typeorm'
import { dbConfig } from './config/database'

dotenv.config()
const port = process.env.SERVER_PORT

createConnection(dbConfig())
  .then(() => {
    console.log('Info: Connected to the database')
    const app = require('./app')

    app.listen(port, () => {
      console.log(`Info: Server running in port ${port}`)
    })
  })
  .catch(console.error)
