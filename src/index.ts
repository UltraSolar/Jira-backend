import express from 'express'
import connectDB from './config/database'
import env from 'dotenv';

env.config();
const app = express()
const port = parseInt(process.env.PORT|| "9000");

app.get('/', (req, res) => {
  res.send('Hello World  ')
})

const startServer = async () => {
  await connectDB();
}
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

startServer();

