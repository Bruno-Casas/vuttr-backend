import app from './app'
import * as dotenv from "dotenv"
import { createConnection } from 'typeorm';

dotenv.config()
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Info: Server running in port ${port}`);
})
