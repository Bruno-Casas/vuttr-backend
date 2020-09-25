import app from './app'
import * as dotenv from "dotenv"

dotenv.config()
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
})
