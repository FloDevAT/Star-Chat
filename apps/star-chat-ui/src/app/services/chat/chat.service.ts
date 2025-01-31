import { RawData } from 'ws';
import { ChatMessage, MessageType, CloseCallback, SendCallback, UserMessage } from '@star-chat/models';

export class ChatService {
  private static instance: ChatService;
  private ws: WebSocket;

  private sendHandler: SendCallback = () => {
    throw new Error('NOT IMPLEMENTED');
  };

  protected closeHandler: CloseCallback  = () => {
    throw new Error('NOT IMPLEMENTED');
  };

  public connect(token: string) {
    console.log(token);
    this.ws = new WebSocket('ws://localhost:8765?token=' + token);

    this.ws.addEventListener('message', (event => {
      this.onReceiveMessage(event.data);
    }))

    this.ws.addEventListener('close', () => {
      this.onSessionClose();
    })
  }

  public sendMessage(msg: string) {
    const userMessage: UserMessage = {
      type: MessageType.NORMAL_MESSAGE,
      content: msg
    };

    const serialized = JSON.stringify(userMessage);

    this.ws.send(serialized);
  }

  private onReceiveMessage(msg: RawData) {
    const msgStr = msg.toString();
    const chatMessage: ChatMessage = JSON.parse(msgStr);
    this.sendHandler(chatMessage);
  }

  private onSessionClose() {
    this.closeHandler();
  }

  public setSendHandler(
    handler: SendCallback
  ) {
    this.sendHandler = handler;
  }

  public setCloseHandler(
    handler: CloseCallback
  ) {
    this.closeHandler = handler;
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  }
}
