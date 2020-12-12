import { config } from '@config'
import initApp from '@app'

initApp(true).then(app => {
  app.listen(config.port, () => {
    console.log(`ServerInfo: Running in port ${config.port}`)
  })
})
