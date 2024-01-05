import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'entity_name', nullable: true })
  entityName: string; 

  @Column({ name: 'id_entity', nullable: true })
  idEntity: number;

  @Column({ type: 'text', name: 'old_value', nullable: true })
  oldValue: string | null; 

  @Column({ type: 'text', name: 'new_value', nullable: true  })
  newValue: string; 

  @Column({ type: 'text', nullable: true  })
  operation: string;

  @Column({ name: 'changed_by' })
  changedBy: string;

  @Column({ name: 'changed_at' })
  changedAt: Date;
}

