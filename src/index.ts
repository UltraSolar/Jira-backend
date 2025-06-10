// import express from 'express'
// import connectDB from './config/database'
// import env from 'dotenv';

// env.config();
// const app = express()
// const port = parseInt(process.env.PORT|| "9000");

// app.get('/', (req, res) => {
//   res.send('Hello World  ')
// })

// const startServer = async () => {
//   await connectDB();
// }
// app.listen(port, () => {
//   console.log(`app listening on port ${port}`)
// })

// startServer();

import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schema/typedefs';
import { resolvers } from './resolvers/resolvers';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(
    '/graphql',
    expressMiddleware(server)
  );
  await mongoose.connect('mongodb://localhost:27017/projectdb');

  app.listen(4000, () => {
    console.log(` Server ready at http://localhost:4000/graphql`);
  });
};

startServer();





import express from 'express'
import connectDB from './config/database'
import env from 'dotenv';
import authRoutes from './routes/auth.route'
import { authMiddleware } from './middlewares/auth.middleware';
env.config();
const app = express()
const port = parseInt(process.env.PORT!);

app.use(express.json());

app.use('/api/auth', authRoutes);

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

