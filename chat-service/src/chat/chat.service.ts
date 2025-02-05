import { Injectable } from '@nestjs/common';
// import { firstValueFrom } from 'rxjs';
// import { AxiosResponse } from "axios"
// import { HttpService } from "@nestjs/axios"

@Injectable()
export class ChatService {
    // constructor(private readonly httpService: HttpService) {
    // }
    // public async searchProducts(searchItem: string): Promise<void> {
    //     try {
    //         console.log("log from chat service")
    //         const response: AxiosResponse = await firstValueFrom(
    //             this.httpService.get(`http://localhost:3000/products/searchall?searchWord=${searchItem}`)
    //         );

    //     } catch (error) {
    //         console.error('Ошибка при поиске продуктов:', error);
    //         throw error;
    //     }
    // }
}