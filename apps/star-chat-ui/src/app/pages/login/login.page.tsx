import React, { useState } from 'react';
import { AuthService } from '../../services';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  const onSubmit = () => {
    const service = AuthService.getInstance();

    service.login({
      username: username
    }).then(res => {
      alert('You are logged in!');
    }).catch(err => alert('Error!'));
  }

  return (
    <div>
      <h1>Welcome to Star Chat!</h1>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => onSubmit()} >Login</button>
    </div>
  );
}
