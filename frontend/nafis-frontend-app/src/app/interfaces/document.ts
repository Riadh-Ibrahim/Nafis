export interface Document {
  id: number;
  type: 'ORDONNANCE' | 'RADIOGRAPHIE' | 'ANALYSE' | 'AUTRE';
  date: string;
  titre: string;
  description: string;
  url: string;
}
