import { RawData } from 'ws';
import { ChatMessage, MessageType, UserMessage, ChatStore } from '@star-chat/models';
import { useChatStore } from '../../store';

export class ChatService {
  private static instance: ChatService;
  private ws: WebSocket;
  private state: ChatStore;

  constructor() {
    this.state = useChatStore.getState();
  }

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
    this.state.addMessage(chatMessage);
  }

  private onSessionClose() {
    console.error('CONNECTION TO SERVER LOST!');
    window.location.href = '/';
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  }
}
