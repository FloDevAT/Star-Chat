import React, { FormEvent, useState } from 'react';
import { AuthService } from '../../services';
import './login.page.scss';
import { useNavigate } from 'react-router-dom';
import { ChatService } from '../../services/chat/chat.service';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const nav = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const service = AuthService.getInstance();
    service.login({ username: username })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Username already taken!')
        }

        return res.json();
      })
      .then(data => {
        const token = data.token;
        localStorage.setItem('token', token);
        ChatService.getInstance().connect(token);
        nav('chat');
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to Star Chat!</h1>
      <form onSubmit={onSubmit} className='login-form'>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          placeholder="Enter your username"
        />
        <input
          type="submit"
          className="login-button"
          value="Login"
        />
    </form>
</div>
)
  ;
};
