import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/roles/roles.service';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private rolesService: RoleService
    ) { }

    async create(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ username, password: hashedPassword });
        return this.usersRepository.save(user);
    }


    async findOne(username: string, relations: string[] = []): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username }, relations });
    }


    async findAll(): Promise<User[] | undefined> {
        return this.usersRepository.find();
    }

    async update(userId: number, username: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ userId });
        if (!user) return null;
        const hashedPassword = await bcrypt.hash(password, 10);

        await this.usersRepository.update(userId, {
            username: username,
            password: hashedPassword,
        });
        return this.usersRepository.findOneBy({ userId });
    }


    async delete(userId: number): Promise<boolean> {
        const user = this.usersRepository.findBy({ userId });
        if (user === null) return false;

        this.usersRepository.delete(userId);
        return true;
    }

    async assignRoleToUser(userId: number, roleId: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { userId },
            relations: ['roles']
        });
        if (!user) throw new Error('Usuário não encontrado');

        const role = await this.rolesService.getRole(roleId);
        if (!role) throw new Error('Role não encontrada');

        const roleAlreadyAssigned = user.roles.some(r => r.id === role.id);
        if (!roleAlreadyAssigned) {
            user.roles.push(role);
        }

        return this.usersRepository.save(user);
    }

}

