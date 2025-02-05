import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { HttpService } from "@nestjs/axios"
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@WebSocketGateway({
  namespace: "/chat",
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService,
    private readonly httpService: HttpService
  ) { }

  @WebSocketServer()
  server: Server
  @SubscribeMessage('searchProduct')
  async handleSearchProduct(@MessageBody() payload: string, @ConnectedSocket() client: Socket): Promise<void> {
    // console.log("chat.gatewayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    // const products = await this.chatService.searchProducts(payload.query);
    // console.log(products);
    // client.emit('searchProduct', products);

    try {
      console.log("log from chat service")
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(`http://api-gateway-service:3000/products/searchall?searchWord=${payload}`)
      );

      if (response.status != 200) {
        throw new Error(`Failed to check product with word: ${payload}`);
      }

      client.emit("searchProduct", response.data);

    } catch (error) {
      console.error('Ошибка при поиске продуктов:', error);
      throw error;
    }
  }
}
