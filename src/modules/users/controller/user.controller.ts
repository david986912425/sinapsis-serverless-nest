import { Controller, Get } from '@nestjs/common';

import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.findAllUsersWithCustomer();
  }
}
