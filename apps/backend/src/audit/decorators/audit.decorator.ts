import { SetMetadata } from '@nestjs/common';
import { AuditAction } from '../../../generated/prisma/enums';

export interface AuditOptions {
  entity: string;
  action: AuditAction;
}

export const AUDIT_KEY = 'audit';

// Using AuditAction enum here provides autocomplete and type safety
export const Audit = (entity: string, action: AuditAction) =>
  SetMetadata(AUDIT_KEY, {
    entity,
    action,
  });