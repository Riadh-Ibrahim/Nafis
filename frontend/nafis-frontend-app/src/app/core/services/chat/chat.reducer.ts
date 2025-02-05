import { createReducer, on } from '@ngrx/store';
import * as MessagingActions from './chat.actions';
import { Message } from '../../../interfaces/message';
import { MessageRequest } from '../../../interfaces/MessageRequest';;

export interface MessagingState {
  requests: MessageRequest[];
  messages: Message[];
}

export const initialState: MessagingState = {
  requests: [],
  messages: []
};

export const messagingReducer = createReducer(
  initialState,
  on(MessagingActions.loadRequestsSuccess, (state, { requests }) => ({
    ...state,
    requests
  })),
  on(MessagingActions.loadConversationMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages
  })),
  on(MessagingActions.sendMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message]
  }))
);
