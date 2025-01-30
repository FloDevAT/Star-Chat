import React from 'react';
import { ChatMessage } from '@star-chat/models';
import './chat-message-bubble.component.scss';

export interface ChatMessageProps {
  msg: ChatMessage;
  currentUser: string;
}

export const ChatMessageBubble: React.FC<ChatMessageProps> = ({ msg, currentUser }) => {
  const isOwnMessage = msg.username === currentUser;

  return (
    <div className={`message-container ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-bubble">
        {!isOwnMessage && <span className="message-username">{msg.username}</span>}
        <p className="message-text">{msg.content}</p>
      </div>
    </div>
  );
};
