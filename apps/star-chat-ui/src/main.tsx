import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { LoginPage } from './app/pages';
import { ChatPage } from './app/pages/chat/chat.page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ChatPage />
  </StrictMode>
);
