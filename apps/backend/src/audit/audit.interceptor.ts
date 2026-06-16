import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';
import { AUDIT_KEY, AuditOptions } from './decorators/audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly auditService: AuditService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.reflector.getAllAndOverride<AuditOptions>(AUDIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!options) return next.handle();

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ipAddress = request.ip;

    return next.handle().pipe(
      tap((responseData) => {
        // Validation: Ensure user context is present and valid
        if (!user || !user.userId || !user.gymId) return;

        // Safer entityId extraction
        const entityId = String(
          responseData?.id ?? request.params?.id ?? 'unknown',
        );

        // Fire-and-forget logging logic
        this.auditService
          .createLog({
            gymId: user.gymId,
            userId: user.userId,
            action: options.action,
            entity: options.entity,
            entityId,
            ipAddress,
          })
          .catch((err) => {
            this.logger.error(
              'Audit background task error',
              err instanceof Error ? err.stack : undefined,
            );
          });
      }),
    );
  }
}