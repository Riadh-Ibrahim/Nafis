import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../../interfaces/message';
import { MessageRequest } from '../../../interfaces/MessageRequest';
import { Conversation } from '../../../interfaces/Conversation';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private apiUrl = 'http://localhost:3000/messaging';

  constructor(private http: HttpClient) {}

  createRequest(dto: {
    patientId: number;
    doctorId: number;
  }): Observable<MessageRequest> {
    return this.http.post<MessageRequest>(`${this.apiUrl}/request`, dto);
  }

  getRequests(doctorId: number): Observable<MessageRequest[]> {
    return this.http.get<MessageRequest[]>(
      `${this.apiUrl}/requests/${doctorId}`
    );
  }

  updateRequestStatus(
    requestId: number,
    statut: string
  ): Observable<MessageRequest> {
    return this.http.put<MessageRequest>(
      `${this.apiUrl}/requests/${requestId}/status`,
      { statut }
    );
  }

  createOrFetchConversation(dto: {
    patientId: number;
    doctorId: number;
    dateDebut: string;
    messages: any[];
  }): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/conversations`, dto);
  }

  sendMessage(dto: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, dto);
  }

  getMessages(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.apiUrl}/conversations/${conversationId}/messages`
    );
  }

  markMessageAsSeen(messageId: number): Observable<Message> {
    return this.http.put<Message>(
      `${this.apiUrl}/messages/${messageId}/seen`,
      {}
    );
  }
}
