import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { Audit } from 'src/entity/audit.entity';
import { AuditInterceptor } from './AuditInterceptor';
import { EntityRepositoryService } from './EntityRepositoryService';
import { Role } from 'src/roles/role/role.entity';
import { Music } from 'src/entity/music.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Audit, Role, Music])],
  providers: [AuditService, AuditInterceptor, EntityRepositoryService],
  exports: [AuditService, EntityRepositoryService], 
})
export class AuditModule {}