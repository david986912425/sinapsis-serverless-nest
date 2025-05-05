import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty() uuid: string;
  @ApiProperty() username: string;
  @ApiProperty() status: boolean;
}
