// role.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/role/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(name: string): Promise<Role> {
    const newRole = this.roleRepository.create({ name });
    return this.roleRepository.save(newRole);
  }

  async getRole(id: number): Promise<Role | null> {
    return this.roleRepository.findOneBy({ id });
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async updateRole(id: number, name: string): Promise<Role | null> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      return null;
    }
    role.name = name;
    return this.roleRepository.save(role);
  }

  async deleteRole(id: number): Promise<boolean> {
    const result = await this.roleRepository.delete(id);
    return result.affected > 0;
  }
}

