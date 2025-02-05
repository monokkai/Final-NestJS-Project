
import { fakerEN } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/ru';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service'
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class FakersService {
    constructor(private readonly usersService: UsersService) { }
    public async createUsers(count: number): Promise<string> {
        const fakeUsers: Array<UserDto> = new Array<UserDto>();

        for (let i = 0; i < count; i++) {
            const user: UserDto = new User();
            user.username = fakerEN.internet.username();
            user.email = faker.internet.email();
            user.password = faker.internet.password();
            user.firstName = faker.person.firstName();
            user.lastName = faker.person.lastName();
            user.phoneNumber = faker.phone.number();
            user.adress = faker.location.streetAddress();
            user.city = faker.location.city();
            user.state = faker.location.state();
            user.zipCode = faker.location.zipCode();
            user.country = faker.location.country();
            user.createAt = faker.date.past({ years: 2 });
            user.updatedAt = faker.date.past({ years: 1 });
            user.role = faker.helpers.arrayElement(["Пользователь", "Оператор", "Менеджер", "Администратор"]);
            fakeUsers.push(user);
        }

        this.usersService.createUsers(fakeUsers);
        return `Пользователей созданно в кол-ве ${count}`
    }
}
