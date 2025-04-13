import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpService } from '@nestjs/axios';
// import { catchError, firstValueFrom } from 'rxjs';
// import { AxiosError } from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    req['user'] = { role: 'admin', id: 'test-user-id', username: 'Test User' };
    console.log('Auto-setting admin user for request:', req.path);
    next();
  }
} 