import { 
  Component, 
  ViewChild, 
  ElementRef, 
  AfterViewChecked, 
  OnDestroy, 
  PLATFORM_ID, 
  Inject, 
  OnInit 
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../core/services/chatbot.service';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages: Message[] = [];
  inputMessage = '';
  isOpen = false;
  isListening = false;
  isTyping = true;
  isSpeechSupported = false; 
  private recognition: any;
  private isBrowser: boolean;
  private readonly MAX_RETRIES = 3;
  private retryCount = 0;

  constructor(
    private chatbotService: ChatbotService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() { 
    this.messages = [{
      role: 'bot',
      content: 'Bonjour! Je suis Nafis Assistant, comment puis-je vous aider aujourd\'hui?',
      timestamp: new Date()
    }];

    if (this.isBrowser) {
      this.initSpeechRecognition();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  private initSpeechRecognition(): void {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'fr-FR';
      this.isSpeechSupported = true;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.inputMessage = transcript;
        this.isListening = false;
        this.sendMessage();
      };

      this.recognition.onerror = (event: any) => {
        console.error('Erreur de reconnaissance vocale:', event.error);
        this.isListening = false;
        if (event.error === 'network' && this.retryCount < this.MAX_RETRIES) {
          this.retryCount++;
          setTimeout(() => this.toggleVoice(), 1000);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.retryCount = 0;
      };
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  async sendMessage(): Promise<void> {
    const message = this.inputMessage.trim();
    if (!message || this.isTyping) return;

    this.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    this.inputMessage = '';
    this.isTyping = true;

    try {
      const response = await this.chatbotService.sendMessage(message).toPromise();
      
      if (response) {
        this.messages.push({
          role: 'bot',
          content: response,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      this.messages.push({
        role: 'bot',
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        timestamp: new Date()
      });
    } finally {
      this.isTyping = false;
      this.scrollToBottom();
    }
  }

  toggleVoice(): void {
    if (!this.isBrowser || !this.recognition || this.isTyping) {
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  private scrollToBottom(): void {
    if (!this.messageContainer) return;
    
    try {
      const element = this.messageContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Erreur lors du scroll:', err);
    }
  }
}