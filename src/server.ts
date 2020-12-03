import * as dotenv from 'dotenv'
import initApp from '@app'
dotenv.config()
const port = process.env.SERVER_PORT || 3000

initApp(true).then(app => {
  app.listen(port, () => {
    console.log(`ServerInfo: Running in port ${port}`)
  })
})
