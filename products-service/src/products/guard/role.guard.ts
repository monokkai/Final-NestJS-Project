import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SecurityRoleGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(`SecurityRoleGuard: Bypassing security check for testing: ${context}`);
    return true;
  }
} 