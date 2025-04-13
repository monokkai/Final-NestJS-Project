import { All, Body, Controller, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from "express"


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  //на порт 3000 все идут запросы
  //Коммитыsss
  @All(["/users", "/users/*"])
  public async apiRequestToClearUsers(@Req() request: Request, @Body() body: any): Promise<any> {
    console.log("users")
    return this.appService.apiRequestToUsers(request, body);
  }

  @All(["/products", "/products/*"])
  public async apiRequestToProducts(@Req() request: Request, @Body() body: any): Promise<any> {
    console.log("products")
    return this.appService.apiRequestToProducts(request, body);
  }

  @All(["/orders", "/orders/*"])
  public async apiRequestToOrders(@Req() request: Request, @Body() body: any): Promise<any> {
    console.log("orders")
    return this.appService.apiRequestToOrders(request, body);
  }

  @All(["/chat", "/chat/*"])
  public async apiRequestToChat(@Req() request: Request, @Body() body: any): Promise<any> {
    console.log("chat")
    return this.appService.apiRequestToChat(request, body);
  }

  @All(["/reviews", "/reviews/*"])
  public async apiRequestToReviews(@Req() request: Request, @Body() body: any): Promise<any> {
    console.log("reviews")
    return this.appService.apiRequestToReviews(request, body);
  }
  
  @All(["/auth", "/auth/*"])
  public async apiRequestToSecurity(@Req() request: Request, @Body() body: any): Promise<any> {
    console.log("security")
    return this.appService.apiRequestToSecurity(request, body);
  }
}
