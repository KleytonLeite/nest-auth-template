import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user@example.com', description: 'O email do usuário' })
  username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '123456', description: 'A senha do usuário' })
  password: string;
}
