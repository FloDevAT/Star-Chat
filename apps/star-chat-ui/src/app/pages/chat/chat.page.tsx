import React, { FormEvent, useEffect, useState } from 'react';
import { ChatMessage } from '@star-chat/models';
import { ChatService } from '../../services/chat/chat.service';
import { ChatMessageBubble } from '../../components';
import './chat.page.scss';
import { useChatStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export const ChatPage: React.FC = () => {
  const { messages, addMessage, username } = useChatStore();
  const [typedMessage, setTypedMessage] = useState<string>('');
  const nav = useNavigate();

  const chatService = ChatService.getInstance();

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const msg: ChatMessage = {
      username: username,
      content: typedMessage
    };

    addMessage(msg);

    chatService.sendMessage(typedMessage);
    setTypedMessage('');
  };

  useEffect(() => {
    if (username === '') {
      nav('/');
    }
  }, [nav, username]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatMessageBubble key={i} msg={msg} currentUser={username} />
        ))}
      </div>

      <form onSubmit={onSendMessage}>
        <div className="chat-input-container">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            className="chat-input"
            placeholder="Type a message..."
          />
          <input
            type="submit"
            className="chat-send-button"
            value='Send Message'
          />
        </div>
      </form>
    </div>
  );
};
