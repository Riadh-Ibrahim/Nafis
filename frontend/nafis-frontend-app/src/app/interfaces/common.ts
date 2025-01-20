export interface Pagination<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FiltreRecherche {
  terme?: string;
  dateDebut?: string;
  dateFin?: string;
  statut?: string;
  type?: string;
  page?: number;
  pageSize?: number;
  tri?: {
    champ: string;
    ordre: 'ASC' | 'DESC';
  };
}
