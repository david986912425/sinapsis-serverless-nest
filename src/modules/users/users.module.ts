import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controller/user.controller';
import { CustomerEntity } from './entities/customer.entity';
import { UserEntity } from './entities/user.entity';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CustomerEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
