import { WebSocketServer, WebSocket } from 'ws';
import { SocketHandler } from '../handler';
import * as url from 'node:url';

export class ChatServer {
  private wss: WebSocketServer;
  private handler: SocketHandler;

  public constructor(
    private readonly port: number
  ) {

    this.wss = new WebSocketServer({
      port: port,
      host: 'localhost'
    });

    this.handler = new SocketHandler();
  }

  public startServer(): void {
    console.log('Chat Server running on port', this.port);

    this.wss.on('connection', (ws: WebSocket, req) => {
      console.log('client connected to server!');
      const username = url.parse(req.url, true).query.username;

      if ((typeof username) === 'string') {
        this.handler.addSocket({
          username: username as string,
          socket: ws
        });
      }


    })
  }


}
