export interface User {
  id: string;
  username: string;
  role: 'guest' | 'user' | 'moderator' | 'admin';
} 