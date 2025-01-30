/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { urlencoded } from 'express';
import { authRouter } from './routers/';
import cors from 'cors';
import { ChatServer } from './chat-server';
import * as process from 'node:process';
import { config } from 'dotenv';

config();
const app = express();

app.use(cors());
app.use(express.json())
app.use(urlencoded({ extended: false }));
app.use('/auth', authRouter);

const wsPort = parseInt(process.env.WS_PORT) || 8765;
const chatServer: ChatServer = new ChatServer(wsPort);
chatServer.startServer();

const port = parseInt(process.env.API_PORT) || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
