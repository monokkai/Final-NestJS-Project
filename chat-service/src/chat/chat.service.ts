import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from "axios";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ChatService {
    constructor(private readonly httpService: HttpService) {}
    
    public async searchProducts(searchWord: string): Promise<any> {
        try {
            console.log("Searching products with word:", searchWord);
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.get(`http://api-gateway-service:3000/products/searchall?searchWord=${searchWord}`)
            );
            
            if (response.status !== 200) {
                throw new Error(`Failed to search products with word: ${searchWord}`);
            }
            
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }
}