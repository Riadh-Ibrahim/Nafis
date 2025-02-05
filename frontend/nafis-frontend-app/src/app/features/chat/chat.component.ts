import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { MessageComponent } from '../../shared/message/message.component';
import { MessagePreviewComponent } from '../../shared/message-preview/message-preview.component';
import { ChevronUp, X, Send, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Message } from '../../interfaces/message';
import { Store } from '@ngrx/store';
import * as ChatActions from '../../core/services/chat/chat.actions';
import { selectMessages } from '../../core/services/chat/chat.selectors';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    InputComponent,
    MessageComponent,
    MessagePreviewComponent,
    FormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  messagesPreview = [
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hey, are you free to meet up later today?',
      timestamp: '2025-01-29T14:30:00',
      isRead: false,
    },
    {
      id: 2,
      sender: 'Jane Smith',
      content: 'I found a cool spot for lunch! Want to join?',
      timestamp: '2025-01-29T13:45:00',
      isRead: true,
    },
    {
      id: 3,
      sender: 'Mark Johnson',
      content: "Don't forget to review the report before the meeting.",
      timestamp: '2025-01-28T10:15:00',
      isRead: true,
    },
  ];

  //messagesPreview$: Observable<any[]>;
  chatMessages$: Observable<Message[]> = of([]);

  newMessage: string = '';
  activeConversationId: number = 1;
  currentUserId: number = 1;
  currentUserType: 'PATIENT' | 'MEDECIN' = 'PATIENT';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      ChatActions.loadConversationMessages({
        conversationId: this.activeConversationId,
      })
    );

    this.chatMessages$ = this.store.select(selectMessages);
  }

  onSendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        conversationId: this.activeConversationId,
        expediteurId: this.currentUserId,
        expediteurType: this.currentUserType,
        contenu: this.newMessage,
        dateEnvoi: new Date(),
        seen: false,
      };
      this.store.dispatch(ChatActions.sendMessage({ message }));
      this.newMessage = '';
    }
  }
}
