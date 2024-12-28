import {Consultation} from "./consultation";
import {Document} from "./document"

export interface HistoriqueMedical {
  id: number;
  patientId: number;
  consultations: Consultation[];
  documents: Document[];
}
