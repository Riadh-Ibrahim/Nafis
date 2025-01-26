export interface DashboardState {
  type: 'doctor' | 'patient' | null;
  stats: any;
  error: boolean;
  greetingMessage: string;
  fullName: string;
  subtitle: string;
  userId?: number;
}
