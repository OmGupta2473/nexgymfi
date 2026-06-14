export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  FROZEN = "FROZEN",
}

export interface GymInfo {
  name: string;
  slug: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  timezone: string;
  logoUrl?: string;
  subscriptionPlan: string;
}

export interface Plan {
  id: string;
  name: string;
  durationDays: number;
  price: number;
  description: string;
  isActive: boolean;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
  joinedAt: string;
  status: MembershipStatus;
  planId: string;
  emergencyContact: string;
  freezeDays: number;
  frozenAt?: string;
  expirationDate: string;
  checkInStreak: number;
  lastCheckIn?: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberPhoto: string;
  checkedInAt: string;
  checkedOutAt?: string;
  source: "QR_AUTO" | "QR_MANUAL" | "ADMIN";
  status: "success" | "already_checked_in" | "membership_expired" | "device_not_found" | "gym_mismatch" | "member_deleted";
}

export interface MemberDevice {
  id: string;
  memberId: string;
  deviceToken: string;
  fingerprint: string;
  label: string;
  isActive: boolean;
  lastSeenAt: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  type: "NEW_MEMBERSHIP" | "RENEWAL" | "PARTIAL" | "REFUND";
  method: "CASH" | "UPI" | "CARD" | "OTHER";
  paidAt: string;
  notes?: string;
  recordedBy: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  oldValue?: string;
  newValue?: string;
  ipAddress: string;
  createdAt: string;
}

export interface BuildStep {
  title: string;
  desc: string;
  tags: string[];
}

export interface BuildPhase {
  id: number;
  label: string;
  days: string;
  title: string;
  desc: string;
  steps: BuildStep[];
}
