/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { urlencoded } from 'express';
import { authRouter } from './routers/';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())
app.use(urlencoded({ extended: false }));

app.use('/auth', authRouter);



const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
