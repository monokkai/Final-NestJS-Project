import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import logger from '../logger/users.logger';
import { Cache } from "@nestjs/cache-manager"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly cacheManager: Cache,
    ) { }
    private users: Array<User> = new Array<User>;

    // Добавить пользователя
    public async createUser(data: UserDto): Promise<User> {
        logger.info('Creating a new user');
        const user: UserDto = this.userRepository.create(data);
        logger.info(`User created with ID: ${user.id}`);
        return this.userRepository.save(user);
    }

    // Добавить пользователей
    public async createUsers(data: Array<UserDto>): Promise<Array<User>> {
        const users: Array<UserDto> = this.userRepository.create(data);

        return this.userRepository.save(users);
    }

    // Получить всех пользователей
    public async readAll(): Promise<Array<User>> {
        logger.info('Fetching all users');
        const users = await this.userRepository.find();
        await this.cacheManager.set('searchall', users);
        logger.info(`Fetched ${users.length} users`);
        return users
    }

    // Получить пользователя по id
    public async readOneById(id: number): Promise<UserDto> {
        logger.info(`Fetching user with ID: ${id}`);

        const cachedUser = await this.cacheManager.get<User>(`user_${id}`);
        if (cachedUser) {

            logger.info(`Returning user ${id} from cache`);

            console.log(`Получение пользоателя ${id} из кэша`);
            return cachedUser;
        }

        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            logger.error(`No user found with ID: ${id}`);

            throw new BadRequestException('No user found with the provided id');
        }
        await this.cacheManager.set(`user_${id}`, user);

        logger.info(`Fetched user with ID: ${id}`);

        return user;
    }

    // Обновить пользователя
    public async updateUser(id: number, userData: UserDto): Promise<any> {
        logger.info(`Updating user with ID: ${id}`);
        if (id < 0 || id >= this.users.length) {

            logger.error(`No user found with the provided id for update`);

            throw new BadRequestException('No user found with the provided id');
        }
        return this.userRepository.update(id, userData);
    }

    // Удалить пользователя
    public async deleteUser(id: number): Promise<DeleteResult> {
        logger.info(`Deleting user with ID: ${id}`);
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            logger.error(`No user found with ID: ${id} for deletion`);
            throw new BadRequestException('No user found with the provided id');
        }
        // return this.userRepository.delete(id);
        return result;
    }
}