import { UserRoleEnum } from './user-role';
import { Patient } from './patient';
import { Admin } from './admin';
import { Personnel } from './personnel';

export interface User {
  id: number;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  role: UserRoleEnum;
  dateNaissance?: Date;
  numeroSecu?: string;
  adresse?: string;
  telephone?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  admin?: Admin;
  patients?: Patient[];
  personnel?: Personnel;
}