export interface alerte {
    id: number;
    type: 'CRITIQUE' | 'ATTENTION' | 'INFO';
    message: string;
    timestamp: string;
    acquittee: boolean;
    acquitteePar?: string;
  }
  