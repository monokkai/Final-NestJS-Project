import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('searchall')
    @ApiOperation({ summary: 'Получение списка пользователей' })
    @ApiResponse({ status: 200, description: 'Список успешно получен.', type: Array<User> })
    @ApiResponse({ status: 404, description: 'Пользователи не найдены.' })
    public readAll(): Promise<Array<User>> {
        console.log('users-service tests aaaaaaaaaaaa');
        return this.usersService.readAll();
    }

    @Get('searchid=:id')
    @ApiOperation({ summary: 'Получение списка пользователей по id' })
    @ApiResponse({ status: 200, description: 'Список по id успешно получен.', type: User })
    @ApiResponse({ status: 404, description: 'Пользователи не найдены.' })
    public async readUserById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<User> {
        return this.usersService.readOneById(id);
    }

    @Post('new')
    @ApiOperation({ summary: 'Создаем пользователя.' })
    @ApiResponse({ status: 200, description: 'Пользователь успешно создан.', type: UserDto })
    @ApiResponse({ status: 404, description: 'Пользователь может быть создан.' })
    public async createNewUser(@Body() userData: UserDto): Promise<UserDto> {
        return await this.usersService.createUser(userData);
    }

    @Post('news')
    @ApiOperation({ summary: 'Создаем пользователей.' })
    @ApiResponse({ status: 200, description: 'Пользователи успешно созданы.', type: Array<UserDto> })
    @ApiResponse({ status: 404, description: 'Пользователи могут быть созданы.' })
    public async createNewUsers(
        @Body() usersData: Array<UserDto>,
    ): Promise<Array<UserDto>> {
        return await this.usersService.createUsers(usersData);
    }

    @Patch('update=:id')
    @ApiOperation({ summary: 'Обновление пользователя.' })
    @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен.', type: UserDto })
    @ApiResponse({ status: 404, description: 'Пользователь может быть обновлен.' })
    public async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() userData: UserDto,
    ): Promise<UserDto> {
        return await this.usersService.updateUser(id, userData);
    }

    @Delete('remove=:id')
    @ApiOperation({ summary: 'Удаляем пользователя по ID.' })
    @ApiResponse({ status: 200, description: 'Пользователь по ID успешно удален.' })
    @ApiResponse({ status: 404, description: 'Пользователь по ID не может быть.' })
    public async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        await this.usersService.deleteUser(id);
    }
}
