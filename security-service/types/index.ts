import { Request } from 'express';

export interface AuthUser {
  id: string;
  role?: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

export interface RequestWithUser extends Request {
  user?: AuthUser;
} 
