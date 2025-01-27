export interface User {
    email: string;
    id?: string;
  }
  
  export interface AuthState {  // Définition de l'état de l'authentification
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    access_token: string | null;
  }