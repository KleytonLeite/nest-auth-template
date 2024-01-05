import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoleService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AuditInterceptor } from '../audit/AuditInterceptor';

@ApiTags('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuditInterceptor)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles('ADMIN')
  @Post()
  createRole(@Body('name') name: string) {
    return this.roleService.createRole(name);
  }

  @Get(':id')
  getRole(@Param('id') id: number) {
    return this.roleService.getRole(id);
  }

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Roles('ADMIN')
  @Put(':id')
  updateRole(@Param('id') id: number, @Body('name') name: string) {
    return this.roleService.updateRole(id, name);
  }

  @Roles('ADMIN')
  @Delete(':id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}

