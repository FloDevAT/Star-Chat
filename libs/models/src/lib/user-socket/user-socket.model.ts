import { WebSocket } from 'ws';

export interface UserSocket {
  username: string;
  socket: WebSocket;
}
