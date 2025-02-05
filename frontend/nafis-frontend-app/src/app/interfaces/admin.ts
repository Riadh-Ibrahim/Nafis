import { User } from "./user";
import { Patient } from "./patient";

export interface Admin {
  id: number;
  user: User;
  patients: Patient[];
}
