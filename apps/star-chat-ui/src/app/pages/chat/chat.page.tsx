import React, { useState } from 'react';
import { ChatMessage } from '@star-chat/models';
import { ChatService } from '../../services/chat/chat.service';
import { ChatMessageBubble } from '../../components';
import './chat.page.scss';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typedMessage, setTypedMessage] = useState<string>('');

  const onAddMessage = (msg: ChatMessage) => {
    setMessages([...messages, msg]);
  };

  const chatService = ChatService.getInstance();
  chatService.setHandler(onAddMessage);

  const onSendMessage = () => {
    const msg: ChatMessage = {
      username: 'florian',
      content: typedMessage
    };

    setMessages([
      ...messages, msg
    ]);

    chatService.sendMessage(typedMessage);
    setTypedMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatMessageBubble key={i} msg={msg} currentUser={'florian'} />
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={onSendMessage} className="chat-send-button">
          Send Message
        </button>
      </div>
    </div>
  );
};
