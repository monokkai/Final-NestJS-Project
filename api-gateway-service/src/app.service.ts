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
      
      let response;
      switch(request.method) {
        case 'GET':
          response = await firstValueFrom(this.httpService.get(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'POST':
          response = await firstValueFrom(this.httpService.post(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'PUT':
          response = await firstValueFrom(this.httpService.put(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'DELETE':
          response = await firstValueFrom(this.httpService.delete(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        default:
          throw new Error(`Unsupported method: ${request.method}`);
      }
      
      return response.data;
    } catch (err) {
      throw new Error("Error Users: " + err.message);
    }
  }

  public async apiRequestToProducts(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://products-service:3000${request.path}`;
      
      let response;
      switch(request.method) {
        case 'GET':
          response = await firstValueFrom(this.httpService.get(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'POST':
          response = await firstValueFrom(this.httpService.post(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'PUT':
          response = await firstValueFrom(this.httpService.put(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'DELETE':
          response = await firstValueFrom(this.httpService.delete(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        default:
          throw new Error(`Unsupported method: ${request.method}`);
      }
      
      return response.data;
    } catch (err) {
      throw new Error("Error Products: " + err.message);
    }
  }

  public async apiRequestToOrders(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://orders-service:3000${request.path}`;
      
      let response;
      switch(request.method) {
        case 'GET':
          response = await firstValueFrom(this.httpService.get(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'POST':
          response = await firstValueFrom(this.httpService.post(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'PUT':
          response = await firstValueFrom(this.httpService.put(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'DELETE':
          response = await firstValueFrom(this.httpService.delete(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        default:
          throw new Error(`Unsupported method: ${request.method}`);
      }
      
      return response.data;
    } catch (err) {
      throw new Error("Error Orders: " + err.message);
    }
  }

  public async apiRequestToChat(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://chat-service:3000${request.path}`;
      
      let response;
      switch(request.method) {
        case 'GET':
          response = await firstValueFrom(this.httpService.get(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'POST':
          response = await firstValueFrom(this.httpService.post(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'PUT':
          response = await firstValueFrom(this.httpService.put(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'DELETE':
          response = await firstValueFrom(this.httpService.delete(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        default:
          throw new Error(`Unsupported method: ${request.method}`);
      }
      
      return response.data;
    } catch (err) {
      throw new Error("Error Chat: " + err.message);
    }
  }

  public async apiRequestToReviews(request: Request, body: any): Promise<any> {
    try {
      const path = request.path;
      const fullPath: string = `http://reviews-service:3000${path}`;
      
      console.log(`Trying to connect to: ${fullPath}`);
      console.log(`Request method: ${request.method}`);
      console.log(`Request body: ${JSON.stringify(body)}`);
      
      let response;
      switch(request.method) {
        case 'GET':
          response = await firstValueFrom(this.httpService.get(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'POST':
          response = await firstValueFrom(this.httpService.post(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'PUT':
          response = await firstValueFrom(this.httpService.put(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'DELETE':
          response = await firstValueFrom(this.httpService.delete(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        default:
          throw new Error(`Unsupported method: ${request.method}`);
      }
      
      return response.data;
    } catch (err) {
      console.error(`Error connecting to reviews service: ${err}`);
      throw new Error("Error Reviews: " + err.message);
    }
  }
  
  public async apiRequestToSecurity(request: Request, body: any): Promise<any> {
    try {
      const fullPath: string = `http://security-service:3000${request.path}`;
      
      let response;
      switch(request.method) {
        case 'GET':
          response = await firstValueFrom(this.httpService.get(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'POST':
          response = await firstValueFrom(this.httpService.post(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'PUT':
          response = await firstValueFrom(this.httpService.put(fullPath, body, {
            headers: this.getHeaders(request)
          }));
          break;
        case 'DELETE':
          response = await firstValueFrom(this.httpService.delete(fullPath, {
            headers: this.getHeaders(request)
          }));
          break;
        default:
          throw new Error(`Unsupported method: ${request.method}`);
      }
      
      return response.data;
    } catch (err) {
      throw new Error("Error Security: " + err.message);
    }
  }

  // Helper method to forward authorization headers
  private getHeaders(request: Request): any {
    const headers: any = {};
    
    // Forward Authorization header if present
    if (request.headers.authorization) {
      headers['Authorization'] = request.headers.authorization;
    }
    
    // Forward Content-Type header if present
    if (request.headers['content-type']) {
      headers['Content-Type'] = request.headers['content-type'];
    }
    
    return headers;
  }
}
