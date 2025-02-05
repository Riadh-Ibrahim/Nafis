import { createAction, props } from '@ngrx/store';
import { Message } from '../../../interfaces/message';
import { MessageRequest } from '../../../interfaces/MessageRequest';

export const loadRequests = createAction(
  '[Messaging] Load Requests',
  props<{ doctorId: number }>()
);
export const loadRequestsSuccess = createAction(
  '[Messaging] Load Requests Success',
  props<{ requests: MessageRequest[] }>()
);

export const loadConversationMessages = createAction(
  '[Messaging] Load Conversation Messages',
  props<{ conversationId: number }>()
);
export const loadConversationMessagesSuccess = createAction(
  '[Messaging] Load Conversation Messages Success',
  props<{ messages: Message[] }>()
);

export const sendMessage = createAction(
  '[Messaging] Send Message',
  props<{ message: Message }>()
);
export const sendMessageSuccess = createAction(
  '[Messaging] Send Message Success',
  props<{ message: Message }>()
);
