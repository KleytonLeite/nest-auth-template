import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/role/role.entity';
import { Music } from 'src/entity/music.entity';
// Importe outras entidades conforme necessário

@Injectable()
export class EntityRepositoryService {
  private repositoryMap: { [key: string]: Repository<any> };

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
    // Injete outros repositórios aqui
  ) {
    this.repositoryMap = {
      'role': this.roleRepository,
      'music': this.musicRepository
      // Mapeie outras entidades para seus repositórios
    };
  }

  getRepository(entityName: string): Repository<any> | undefined {
    return this.repositoryMap[entityName];
  }
}
