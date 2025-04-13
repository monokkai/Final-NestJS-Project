import { Request } from 'express';

// Define a user type with required properties
export interface AuthUser {
  id: string;
  role?: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

// Define a custom interface for request with user
export interface RequestWithUser extends Request {
  user?: AuthUser;
} 