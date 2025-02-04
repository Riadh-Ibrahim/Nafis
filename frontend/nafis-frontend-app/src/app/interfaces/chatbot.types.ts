export interface Message {
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }
  
  export interface GeminiResponse {
    candidates: Array<{
      content: {
        parts: Array<{
          text: string;
        }>;
      };
    }>;
  }