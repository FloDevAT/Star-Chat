import React, { useState } from 'react';
import { AuthService } from '../../services';
import './login.page.scss';
import { ChatService } from '../../services/chat/chat.service';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const nav = useNavigate();

  const onSubmit = () => {
    const service = AuthService.getInstance();
    service.login({ username })
      .then(() => {
        const chatService = ChatService.getInstance();
        chatService.connect(username);
        nav('chat')
      })
      .catch(() => alert('Error!'));
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to Star Chat!</h1>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
        placeholder="Enter your username"
      />
      <button
        onClick={onSubmit}
        className="login-button">
        Login
      </button>
    </div>
  );
};
