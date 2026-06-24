export type Role = 'OWNER' | 'MANAGER' | 'RECEPTIONIST';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type MembershipStatus = 'ACTIVE' | 'EXPIRED' | 'FROZEN' | 'CANCELLED';
export type PaymentType = 'NEW_MEMBERSHIP' | 'RENEWAL' | 'PARTIAL' | 'REFUND';
export type PaymentMethod = 'CASH' | 'UPI' | 'CARD' | 'OTHER';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type AttendanceSource = 'QR_AUTO' | 'QR_MANUAL' | 'ADMIN';
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface Gym {
  id: string;
  name: string;
  slug: string;
}

export interface AuthUser {
  userId: string;
  gymId?: string;
  email: string;
  role: Role;
  gym: Gym;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  gender?: string | null;
  photoUrl?: string | null;
  emergencyContact?: string | null;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemberPayload {
  name: string;
  phone: string;
  email?: string;
  gender?: Gender;
  emergencyContact?: string;
}

export interface Plan {
  id: string;
  name: string;
  durationDays: number;
  price: number | string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CreatePlanPayload {
  name: string;
  durationDays: number;
  price: number;
  description?: string;
}

export interface Membership {
  id: string;
  memberId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: MembershipStatus;
  frozenAt?: string | null;
  freezeDays: number;
  member?: Member;
  plan?: Plan;
  createdAt: string;
}

export interface CreateMembershipPayload {
  memberId: string;
  planId: string;
  startDate: string;
}

export interface Payment {
  id: string;
  memberId: string;
  membershipId?: string | null;
  amount: number | string;
  type: PaymentType;
  method: PaymentMethod;
  status: PaymentStatus;
  receiptNumber?: string | null;
  notes?: string | null;
  paidAt: string;
  createdAt: string;
  member?: Member;
  membership?: Membership | null;
}

export interface CreatePaymentPayload {
  memberId: string;
  membershipId?: string;
  amount: number;
  type: PaymentType;
  method: PaymentMethod;
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  checkedInAt: string;
  source: AttendanceSource;
  createdAt: string;
  member?: Member;
}

export interface DashboardSummary {
  totalMembers: number;
  activeMemberships: number;
  todayCheckins: number;
  todayRevenue: number | string;
}

export interface DashboardRevenue {
  monthRevenue: number | string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  ipAddress?: string | null;
  createdAt: string;
  user?: {
    name: string;
    email: string;
    role: Role;
  };
}

export interface PaginatedAuditLogs {
  items: AuditLog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export interface PublicMember {
  id: string;
  name: string;
  photoUrl?: string | null;
}
