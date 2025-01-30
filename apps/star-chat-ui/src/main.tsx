import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { LoginPage } from './app/pages';
import { ChatPage } from './app/pages/chat/chat.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={''} element={<LoginPage /> }></Route>
        <Route path={'chat'} element={<ChatPage /> }></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
