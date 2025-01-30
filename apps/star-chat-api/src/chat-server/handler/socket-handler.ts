import { ChatMessage, MessageType, UserMessage, UserSocket, verifyUserMessageType } from '@star-chat/models';

export class SocketHandler {
  private readonly clients: Set<UserSocket> = new Set();

  public addSocket(userSocket: UserSocket): void {
    this.clients.add(userSocket);

    userSocket.socket.on('message', (message) => {
      console.log('Client sent a message!');
      const msg = message.toString();
      const parsedObj = JSON.parse(msg);

      if (verifyUserMessageType(parsedObj)) {
        this.handleUserMessage(userSocket, parsedObj);
      }
    })
  }

  private handleUserMessage(socket: UserSocket, message: UserMessage): void {
    switch (message.type) {
      case MessageType.NORMAL_MESSAGE:
        this.broadcastMessage(socket.username, message.content);
        break;
    }
  }

  private broadcastMessage(sender: string, msg: string): void {
    const chatMessage: ChatMessage = {
      username: sender,
      content: msg
    };

    const parsedMessage = JSON.stringify(chatMessage);

    this.clients.forEach((client) => {
      if (client.username !== sender) {
        client.socket.send(parsedMessage);
      }
    });
  }
}
