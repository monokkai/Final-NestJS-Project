import { Module } from '@nestjs/common';
import { FakersService } from './fakers.service';
import { FakersController } from './fakers.controller';
// import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [FakersController],
  providers: [FakersService],
})
export class FakersModule {}
