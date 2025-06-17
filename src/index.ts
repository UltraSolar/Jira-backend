import express from 'express'
import connectDB from './config/database'
import env from 'dotenv';
import authRoutes from './routes/auth.route'
import sprintRoutes from './routes/sprint.route'
import { authMiddleware } from './middlewares/auth.middleware';

// init
env.config();
const app = express()
const port = parseInt(process.env.PORT!);


app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/sprint',sprintRoutes);
app.get('/', (req, res) => {
  res.send('Hello World  ')
})
app.get('/protected', authMiddleware, (req, res) => {
  res.send('Provided token was correct')
})


const startServer = async () => {
  await connectDB();
}
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

startServer();

