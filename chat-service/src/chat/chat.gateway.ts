import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: "/chat",
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) { }

  @WebSocketServer()
  server: Server
  
  @SubscribeMessage('searchProduct')
  async handleSearchProduct(@MessageBody() payload: string, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      console.log("Received search request for:", payload);
      const products = await this.chatService.searchProducts(payload);
      client.emit("searchProduct", products);
      
    } catch (error) {
      console.error('Error in chat gateway:', error);
      client.emit("searchProduct", { error: "Failed to search products", message: error.message });
    }
  }
}
