import { RawData } from 'ws';
import { ChatMessage, MessageType, UserMessage } from '@star-chat/models';
import { useState } from 'react';

export class ChatService {
  private static instance: ChatService;
  private ws: WebSocket;

  private handler: (msg: ChatMessage) => void = () => { };

  constructor() {
    this.ws = new WebSocket('ws://localhost:8766?username=florian');
    this.ws.addEventListener('message', (event => {
      this.onReceiveMessage(event.data);
    }))
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
    this.handler(chatMessage);
  }

  public setHandler(
    handler: (msg: ChatMessage) => void
  ) {
    this.handler = handler;
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  }
}
