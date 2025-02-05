import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FakersService } from './fakers.service';

@Controller('users/faker')
export class FakersController {
  constructor(private readonly fakersService: FakersService) { }

  @Get()
  public async createUsers() {
    await this.fakersService.createUsers(10);
    return "Пользователи успешно созданы";
  }
  @Get(":count")
  public async createCountUsers(@Param("count", ParseIntPipe) count: number) {
    await this.fakersService.createUsers(count);
    return "Пользователи успешно созданы";
  }
}
