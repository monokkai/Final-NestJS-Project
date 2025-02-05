import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  public async apiRequestToUsers(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://users-service:3000${request.path}`;

      const response = await firstValueFrom(this.httpService.get(fullPath, { method: request.method, data: body }))
      return response.data;
    } catch (err) {
      throw new Error("Error Users: " + err.message);
    }
  }

  public async apiRequestToProducts(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://products-service:3000${request.path}`;

      const response = await firstValueFrom(this.httpService.get(fullPath, { method: request.method, data: body }))
      return response.data;
    } catch (err) {
      throw new Error("Error Products: " + err.message);
    }
  }

  public async apiRequestToOrders(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://orders-service:3000${request.path}`;

      const response = await firstValueFrom(this.httpService.get(fullPath, { method: request.method, data: body }))
      return response.data;
    } catch (err) {
      throw new Error("Error Orders: " + err.message);
    }
  }

  // public async apiRequestToChat(request: Request, body: any): Promise<any> {
  //   try {
  //     const fullPath: string = `http://chat-service:3000${request.path}`;

  //     const response = await firstValueFrom(this.httpService.get(fullPath, { method: request.method, data: body }))
  //     return response.data;
  //   } catch (err) {
  //     throw new Error("Error Chat: " + err.message);
  //   }
  // }

  public async apiRequestToReviews(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://reviews-service:3000${request.path}`;

      const response = await firstValueFrom(this.httpService.get(fullPath, { method: request.method, data: body }))
      return response.data;
    } catch (err) {
      throw new Error("Error Reviews: " + err.message);
    }
  }
}
