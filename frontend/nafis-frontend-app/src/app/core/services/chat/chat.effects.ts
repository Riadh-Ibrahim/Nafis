import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessagingService } from './chat.service';
import * as MessagingActions from './chat.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MessagingEffects {
  loadRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagingActions.loadRequests),
      mergeMap((action) =>
        this.messagingService.getRequests(action.doctorId).pipe(
          map((requests) => MessagingActions.loadRequestsSuccess({ requests })),
          catchError(() => of({ type: '[Messaging] Load Requests Failed' }))
        )
      )
    )
  );

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagingActions.loadConversationMessages),
      mergeMap((action) =>
        this.messagingService.getMessages(action.conversationId).pipe(
          map((messages) =>
            MessagingActions.loadConversationMessagesSuccess({ messages })
          ),
          catchError(() => of({ type: '[Messaging] Load Messages Failed' }))
        )
      )
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagingActions.sendMessage),
      mergeMap((action) =>
        this.messagingService.sendMessage(action.message).pipe(
          map((message) => MessagingActions.sendMessageSuccess({ message })),
          catchError(() => of({ type: '[Messaging] Send Message Failed' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private messagingService: MessagingService
  ) {}
}
