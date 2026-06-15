export interface User {
  id: number;
  name: string;
  email: string;
  birthDate?: string | null;
  avatarUrl: string | null;
}
