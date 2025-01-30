import { WebSocketServer, WebSocket } from 'ws';
import { SocketHandler } from '../handler';
import * as url from 'node:url';
import { AuthService } from '../../services';

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
      const token = url.parse(req.url, true).query.token as string;

      const authService = AuthService.getInstance();
      const valid = authService.verifyToken(token)

      if (valid) {
        const username = authService.getUsernameFromToken(token);
        this.handler.addSocket({
          username: username,
          socket: ws
        });
      } else {
        ws.close()
      }
    })
  }
}
