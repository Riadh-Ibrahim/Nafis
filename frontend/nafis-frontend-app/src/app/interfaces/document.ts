export interface Document {
  id: number;
  type: 'ORDONNANCE' | 'RADIOGRAPHIE' | 'ANALYSE' | 'AUTRE';
  date: Date;
  titre: string;
  description: string;
  url: string;
}
