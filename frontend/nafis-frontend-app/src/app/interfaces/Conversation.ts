import { Message } from "./message";

export interface Conversation {
    id: number;
    patientId: number;
    doctorId: number;
    dateDebut: string;
    messages: Message[];
  }