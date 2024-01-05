import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuditService } from './audit.service';
import { EntityRepositoryService } from '../audit/EntityRepositoryService';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private auditService: AuditService,
    private entityRepoService: EntityRepositoryService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const method = request.method;
    const user = request.user?.username || 'system_user';
    const entityName = request.url.split('/')[1];
    let idEntity = this.extractIdFromRequest(request, method);

    let beforeStatePromise: Promise<string>;

    if (method === 'DELETE') {
      idEntity = this.extractIdFromRequest(request, method);
      beforeStatePromise = idEntity ? this.fetchEntityState(entityName, idEntity) : Promise.resolve('');
    } else {
      beforeStatePromise = Promise.resolve('');
    }

    return from(beforeStatePromise).pipe(
      switchMap(beforeState => {
        return next.handle().pipe(
          tap((data) => {
            let newValue = method === 'DELETE' ? '' : JSON.stringify(data ?? '');
            if (method === 'POST' && data && data.id) {
              idEntity = data.id; 
            }

            this.auditService.recordAudit({
              entityName,
              idEntity,
              oldValue: beforeState, 
              newValue,              
              operation: method,
              changedBy: user,
              changedAt: new Date(),
            });
          }),
        );
      }),
    );
  }

  private extractIdFromRequest(request, method): number | null {
    if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
      return request.params.id ? parseInt(request.params.id) : null;
    }

    if (method === 'POST') {
      return request.body && request.body.id ? parseInt(request.body.id) : null;
    }

    return null;
  }

  private fetchEntityState(entityName: string, id: number): Promise<string> {
    const repository = this.entityRepoService.getRepository(entityName);
    if (repository) {
      return repository.findOne({ where: { id } }).then(entity => entity ? JSON.stringify(entity) : '');
    }
    return Promise.resolve('');
  }
}
