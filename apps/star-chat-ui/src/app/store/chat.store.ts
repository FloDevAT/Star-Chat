import { create } from 'zustand/react'
import { ChatMessage, ChatStore } from '@star-chat/models';


export const useChatStore = create<ChatStore>(
  (setState) => ({
    messages: [],
    username: '',
    addMessage: (msg: ChatMessage) => {
      setState(state => ({ messages: [...state.messages, msg] }))
    },
    setUsername: (username: string) => {
      setState(state => ({ messages: state.messages, username: username }));
    }
  })
)
