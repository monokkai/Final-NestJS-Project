import { HttpService } from '@nestjs/axios';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const { userId } = request.body;

    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }

    try {
      const response = await firstValueFrom(this.httpService.get(`http://users-service:3000/users/searchall`));
      const users = response.data;

      const userExists = users.some(user => user.id === userId);

      return userExists;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error fetching users');
    }
  }
}
