import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from 'src/roles/role/role.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    RolesModule,
    TypeOrmModule.forFeature([User, Role])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, RolesModule],
})
export class UsersModule {}
