import { MessageType } from '../message-type';

export interface UserMessage {
  type: MessageType;
  content: string;
}

export function verifyUserMessageType(obj: any): obj is UserMessage {
  const typeKey: keyof UserMessage = 'type';
  const contentKey: keyof UserMessage = 'content';

  return obj &&
    obj[typeKey] &&
    obj[contentKey];
}

