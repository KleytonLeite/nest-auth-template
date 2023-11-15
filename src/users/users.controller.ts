import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { classToPlain } from 'class-transformer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async create( @Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto.username, createUserDto.password);
    return classToPlain(user);
  }

  @Get()
  async findAll() {
    const user = this.usersService.findAll();
    return classToPlain(user);
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = this.usersService.findOne(username);
    return classToPlain(user);
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: number,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.update(userId, username, password);
  }

  @Put('/role/:userId')
  async assignRole(
    @Param('userId') userId: number,
    @Body('roleId') roleId: number,
  ) {
    return this.usersService.assignRoleToUser(userId, roleId);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: number) {
    return this.usersService.delete(userId);
  }
}
