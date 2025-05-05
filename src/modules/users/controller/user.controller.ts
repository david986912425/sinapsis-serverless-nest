import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserResponseDto } from '../dto/user.response.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ type: [UserResponseDto] })
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.findAllUsersWithCustomer();
  }
}
