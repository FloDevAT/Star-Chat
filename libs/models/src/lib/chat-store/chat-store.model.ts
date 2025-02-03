import { ChatMessage } from '../chat-message';

export interface ChatStore {
  username: string;
  messages: ChatMessage[];
  setUsername: (username: string) => void;
  addMessage: (msg: ChatMessage) => void;
}
