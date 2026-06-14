import { BuildPhase, Plan, Member, MembershipStatus, GymInfo, Payment, AttendanceRecord, AuditLog } from "./types";

export const initialGymInfo: GymInfo = {
  name: "GymFlex Patna",
  slug: "gymflex-patna",
  ownerName: "Abhishek Singh",
  email: "owner@gymflex.in",
  phone: "+91 95000 12345",
  address: "3rd Floor, Maurya Tower, Fraser Road, Patna, Bihar - 800001",
  timezone: "Asia/Kolkata",
  logoUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=120&auto=format&fit=crop",
  subscriptionPlan: "PROGROWTH"
};

export const initialPlans: Plan[] = [
  {
    id: "plan-1",
    name: "Growth Monthly Plan",
    durationDays: 30,
    price: 999,
    description: "Full gym access, certified trainers, and progress tracking report.",
    isActive: true
  },
  {
    id: "plan-2",
    name: "Quarter Saver Growth",
    durationDays: 90,
    price: 2499,
    description: "Most popular. Includes custom diet chart, body composition analysis, and freeze support.",
    isActive: true
  },
  {
    id: "plan-3",
    name: "Annual Pro Pack",
    durationDays: 365,
    price: 7999,
    description: "Premium access, 24/7 scanning, personal coach consultation, and locker room facility included.",
    isActive: true
  }
];

export const initialMembers: Member[] = [
  {
    id: "mbr-1",
    name: "Rahul Kumar",
    phone: "+91 98765 01234",
    email: "rahul.patna@gmail.com",
    photoUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=60",
    joinedAt: "2026-01-10",
    status: MembershipStatus.ACTIVE,
    planId: "plan-2",
    emergencyContact: "Mr. Ramesh Kumar (+91 98765 01230)",
    freezeDays: 0,
    expirationDate: "2026-07-28",
    checkInStreak: 5,
    lastCheckIn: "2026-06-11T08:32:00-07:00"
  },
  {
    id: "mbr-2",
    name: "Priya Sharma",
    phone: "+91 91234 56789",
    email: "priya.sharma99@outlook.com",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    joinedAt: "2026-04-12",
    status: MembershipStatus.ACTIVE,
    planId: "plan-1",
    emergencyContact: "Mrs. Sunita Sharma (+91 91234 56780)",
    freezeDays: 0,
    expirationDate: "2026-06-25",
    checkInStreak: 0,
    lastCheckIn: "2026-06-10T07:15:00-07:00"
  },
  {
    id: "mbr-3",
    name: "Vikram Singh",
    phone: "+91 98721 44556",
    email: "vikram.rugged@yahoo.com",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    joinedAt: "2026-02-05",
    status: MembershipStatus.EXPIRED,
    planId: "plan-1",
    emergencyContact: "Sukhdev Singh (+91 98721 44550)",
    freezeDays: 0,
    expirationDate: "2026-06-08",
    checkInStreak: 0,
    lastCheckIn: "2026-06-07T18:40:00-07:00"
  },
  {
    id: "mbr-4",
    name: "Sneha Patel",
    phone: "+91 99887 76655",
    email: "sneha.fit@gmail.com",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60",
    joinedAt: "2026-05-01",
    status: MembershipStatus.FROZEN,
    planId: "plan-3",
    emergencyContact: "Anil Patel (+91 99887 76650)",
    freezeDays: 5,
    frozenAt: "2026-06-09T09:00:00-07:00",
    expirationDate: "2027-05-06",
    checkInStreak: 2,
    lastCheckIn: "2026-06-08T06:10:00-07:00"
  },
  {
    id: "mbr-5",
    name: "Amit Gupta",
    phone: "+91 94310 99887",
    email: "amit.developer@gmail.com",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    joinedAt: "2025-12-15",
    status: MembershipStatus.ACTIVE,
    planId: "plan-3",
    emergencyContact: "Rupa Gupta (+91 94310 99880)",
    freezeDays: 14,
    expirationDate: "2026-12-29",
    checkInStreak: 12,
    lastCheckIn: "2026-06-12T07:45:00-07:00"
  }
];

export const initialPayments: Payment[] = [
  {
    id: "pay-1",
    memberId: "mbr-1",
    memberName: "Rahul Kumar",
    amount: 2499,
    type: "NEW_MEMBERSHIP",
    method: "UPI",
    paidAt: "2026-01-10T10:30:00-07:00",
    notes: "Admitted to 3-month growth plan.",
    recordedBy: "Abhishek Singh"
  },
  {
    id: "pay-2",
    memberId: "mbr-2",
    memberName: "Priya Sharma",
    amount: 999,
    type: "NEW_MEMBERSHIP",
    method: "CASH",
    paidAt: "2026-04-12T16:15:00-07:00",
    notes: "Paid in full cash at front desk.",
    recordedBy: "Abhishek Singh"
  },
  {
    id: "pay-3",
    memberId: "mbr-3",
    memberName: "Vikram Singh",
    amount: 999,
    type: "RENEWAL",
    method: "UPI",
    paidAt: "2026-05-08T18:22:00-07:00",
    recordedBy: "Manager Rohan"
  },
  {
    id: "pay-4",
    memberId: "mbr-4",
    memberName: "Sneha Patel",
    amount: 7999,
    type: "NEW_MEMBERSHIP",
    method: "CARD",
    paidAt: "2026-05-01T12:00:00-07:00",
    notes: "Annual pack swipe.",
    recordedBy: "Abhishek Singh"
  },
  {
    id: "pay-5",
    memberId: "mbr-5",
    memberName: "Amit Gupta",
    amount: 7999,
    type: "RENEWAL",
    method: "UPI",
    paidAt: "2025-12-15T09:12:00-07:00",
    notes: "Annual renewal reward scheme.",
    recordedBy: "Abhishek Singh"
  }
];

export const initialAttendance: AttendanceRecord[] = [
  {
    id: "att-1",
    memberId: "mbr-5",
    memberName: "Amit Gupta",
    memberPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    checkedInAt: "2026-06-12T07:45:00-07:00",
    source: "QR_AUTO",
    status: "success"
  },
  {
    id: "att-2",
    memberId: "mbr-1",
    memberName: "Rahul Kumar",
    memberPhoto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=60",
    checkedInAt: "2026-06-11T08:32:00-07:00",
    source: "QR_AUTO",
    status: "success"
  },
  {
    id: "att-3",
    memberId: "mbr-2",
    memberName: "Priya Sharma",
    memberPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    checkedInAt: "2026-06-10T07:15:00-07:00",
    source: "ADMIN",
    status: "success"
  },
  {
    id: "att-4",
    memberId: "mbr-4",
    memberName: "Sneha Patel",
    memberPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60",
    checkedInAt: "2026-06-08T06:10:00-07:00",
    source: "QR_AUTO",
    status: "success"
  },
  {
    id: "att-5",
    memberId: "mbr-3",
    memberName: "Vikram Singh",
    memberPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    checkedInAt: "2026-06-07T18:40:00-07:00",
    source: "ADMIN",
    status: "success"
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    userId: "owner-1",
    action: "CREATE_MEMBER",
    entity: "Member",
    entityId: "mbr-1",
    newValue: JSON.stringify({ name: "Rahul Kumar", phone: "+91 98765 01234" }),
    ipAddress: "223.185.45.12",
    createdAt: "2026-01-10T10:28:00-07:00"
  },
  {
    id: "log-2",
    userId: "owner-1",
    action: "CREATE_MEMBERSHIP",
    entity: "Membership",
    entityId: "mbr-1",
    newValue: JSON.stringify({ planId: "plan-2", duration: 90 }),
    ipAddress: "223.185.45.12",
    createdAt: "2026-01-10T10:30:00-07:00"
  },
  {
    id: "log-3",
    userId: "owner-1",
    action: "FREEZE_MEMBERSHIP",
    entity: "Membership",
    entityId: "mbr-4",
    newValue: JSON.stringify({ status: "FROZEN", frozenAt: "2026-06-09T09:00:00-07:00" }),
    ipAddress: "103.245.23.90",
    createdAt: "2026-06-09T09:05:00-07:00"
  }
];

export const initialBuildPhases: BuildPhase[] = [
  {
    id: 0,
    label: "P0 · Infra",
    days: "Days 1–4",
    title: "Infrastructure foundation",
    desc: "Nothing gets built on top until this is solid. Every environment, tool, and config decision made here affects every line of code you write later.",
    steps: [
      {
        title: "Create GitHub monorepo with pnpm workspaces",
        desc: "Run: git init gym-saas && cd gym-saas && pnpm init. Create apps/backend, apps/frontend, packages/shared. Add pnpm-workspace.yaml listing all three. This lets both apps share TypeScript types from day one.",
        tags: ["infra"]
      },
      {
        title: "Write .gitignore — cover all environments",
        desc: "Include: node_modules, .env*, dist, .next, prisma/generated, *.log, .DS_Store. Never commit .env files. Verify with git status before first push.",
        tags: ["infra"]
      },
      {
        title: "Create .env.example for both apps with every variable listed",
        desc: "Backend needs: DATABASE_URL, DIRECT_URL, REDIS_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_QR_SECRET, R2_ACCOUNT_ID, R2_ACCESS_KEY, R2_SECRET_KEY, R2_BUCKET, R2_PUBLIC_URL, INTERAKT_API_KEY, APP_URL. Frontend needs: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL. Document every var.",
        tags: ["infra"]
      },
      {
        title: "Set up Neon.tech Postgres project",
        desc: "Create account → new project → copy DATABASE_URL and DIRECT_URL (Neon needs both for Prisma connection pooling). Set region to ap-south-1 (Mumbai) for lowest latency from Bihar. Save both URLs to .env.local.",
        tags: ["db", "infra"]
      },
      {
        title: "Set up Upstash Redis instance",
        desc: "Create account → new database → REST API mode. Copy UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. For NestJS BullMQ you need the standard Redis URL too — copy that as REDIS_URL.",
        tags: ["db", "infra"]
      },
      {
        title: "Create Cloudflare R2 bucket for member photos",
        desc: "Cloudflare dashboard → R2 → Create bucket named 'gymflex-media'. Create API token with R2:Edit permission. Enable public access on the bucket. Copy Account ID, Access Key, Secret Key, and public domain. Much cheaper than Cloudinary.",
        tags: ["infra"]
      },
      {
        title: "Initialise NestJS backend app",
        desc: "cd apps/backend && nest new . --skip-git --package-manager pnpm. Install core deps: @prisma/client prisma @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt @nestjs/bull bull ioredis bcrypt class-validator class-transformer nanoid @nestjs/throttler @nestjs/schedule.",
        tags: ["be"]
      },
      {
        title: "Initialise Next.js frontend app",
        desc: "cd apps/frontend && npx create-next-app@latest . --typescript --tailwind --app --src-dir --skip-git. Install: axios @tanstack/react-query react-hook-form zod @hookform/resolvers idb date-fns qrcode.react recharts.",
        tags: ["fe"]
      },
      {
        title: "Write production docker-compose.yml with health checks",
        desc: "Services: postgres (if local dev), redis, backend, caddy. Every service needs restart:unless-stopped. Postgres and Redis need healthcheck blocks. Backend depends_on postgres and redis with condition:service_healthy. Never hardcode passwords — use ${ENV_VAR} syntax.",
        tags: ["infra"]
      },
      {
        title: "Configure ESLint + Prettier across both apps",
        desc: "Install eslint-config-prettier in both apps. Create .eslintrc.js and .prettierrc at root. Add lint and format scripts to each package.json. Run pnpm lint before every commit — enforce this with a pre-commit hook via simple-git-hooks.",
        tags: ["infra"]
      },
      {
        title: "Set up GitHub Actions CI pipeline",
        desc: "Create .github/workflows/ci.yml. On every PR: run pnpm install, pnpm lint, pnpm type-check for both apps. Add a test job that runs unit tests. This is your safety net — never merge without green CI.",
        tags: ["infra", "test"]
      }
    ]
  },
  {
    id: 1,
    label: "P1 · Schema",
    days: "Days 5–8",
    title: "Database schema — complete and correct",
    desc: "Get the schema right before writing a single service. Changing the schema after you have 50 API endpoints is extremely painful. Take an extra day here if needed.",
    steps: [
      {
        title: "Initialise Prisma in backend",
        desc: "npx prisma init. Set DATABASE_URL in .env. Set provider to postgresql in schema.prisma. Run: npx prisma generate. Add prisma module and service to NestJS — create prisma/prisma.service.ts extending PrismaClient with onModuleInit and enableShutdownHooks.",
        tags: ["db", "be"]
      },
      {
        title: "Write Gym model with slug and timezone",
        desc: "Fields: id (UUID), name, slug (unique — used in QR URLs), phone, address, timezone (default Asia/Kolkata), logoUrl, ownerId (FK to User), subscriptionPlan (enum: FREE, GROWTH, PRO), subscriptionStatus, trialEndsAt, deletedAt, createdAt, updatedAt.",
        tags: ["db"]
      },
      {
        title: "Write User model with RBAC roles",
        desc: "Fields: id, gymId (FK), email (unique), passwordHash, role (enum: OWNER, MANAGER, RECEPTIONIST), isActive, lastLoginAt, createdAt. Role determines what each user can see and do — design this correctly now or retrofit it painfully later.",
        tags: ["db", "sec"]
      },
      {
        title: "Write Member model with soft delete",
        desc: "Fields: id, gymId (FK, non-null), name, phone, photoUrl, emergencyContact, joinedAt, deletedAt, createdAt. Add compound index on (gymId, phone) for fast lookup. Note: membershipId lives on Membership, not Member.",
        tags: ["db"]
      },
      {
        title: "Write Plan model (owner-created membership plans)",
        desc: "Fields: id, gymId, name, durationDays, price (Decimal not Float — Decimal is exact for money), description, isActive, archivedAt, createdAt. Plans are soft-archived, never deleted.",
        tags: ["db"]
      },
      {
        title: "Write Membership model with freeze support",
        desc: "Fields: id, gymId, memberId, planId, startDate, endDate, status (enum: ACTIVE, EXPIRED, FROZEN, CANCELLED), frozenAt, freezeDays (Int default 0), createdBy (userId FK), createdAt. Index on (gymId, status) for dashboard queries.",
        tags: ["db"]
      },
      {
        title: "Write Payment model — merged, no separate renewals table",
        desc: "Fields: id, gymId, memberId, membershipId (nullable FK), amount (Decimal), type (enum: NEW_MEMBERSHIP, RENEWAL, PARTIAL, REFUND), method (enum: CASH, UPI, CARD, OTHER), notes, recordedBy (userId FK), paidAt, createdAt. Never store derived amounts.",
        tags: ["db"]
      },
      {
        title: "Write Attendance model with timezone-aware unique constraint",
        desc: "Fields: id, gymId (non-null), memberId, checkedInAt (TIMESTAMPTZ — never plain DateTime), source (enum: QR_AUTO, QR_MANUAL, RECEPTIONIST). Add raw migration for function-based unique index: CREATE UNIQUE INDEX attendance_daily ON attendance(member_id, (checked_in_at AT TIME ZONE 'Asia/Kolkata')::date)",
        tags: ["db", "sec"]
      },
      {
        title: "Write MemberDevice model for check-in system",
        desc: "Fields: id, gymId (non-null — critical for cross-gym isolation), memberId, deviceToken (TEXT), fingerprint (TEXT), deviceLabel (nullable), isActive (default true), lastSeenAt, createdAt. Unique constraint: @@unique([deviceToken, gymId]). Index on (memberId, gymId) for device-count checks.",
        tags: ["db", "sec"]
      },
      {
        title: "Write Notification model for idempotent WhatsApp sends",
        desc: "Fields: id, gymId, memberId (nullable), type (enum: RENEWAL_REMINDER, EXPIRY_ALERT, INACTIVE_ALERT, WELCOME), channel (enum: WHATSAPP, SMS), status (enum: PENDING, SENT, FAILED), sentAt, errorMessage, bodySnapshot, createdAt. This prevents double-sends on job retry.",
        tags: ["db"]
      },
      {
        title: "Write AuditLog model for financial record integrity",
        desc: "Fields: id, gymId, userId, action (string), entity (string), entityId (string), oldValue (Json nullable), newValue (Json nullable), ipAddress, createdAt. Apply on all Payment and Membership writes. Owner can see who changed what.",
        tags: ["db", "sec"]
      },
      {
        title: "Run first migration and verify schema",
        desc: "npx prisma migrate dev --name init. Check the generated SQL carefully — confirm all foreign keys, indexes, and enum types are created. Run npx prisma studio to visually inspect. Fix any issues before moving on.",
        tags: ["db", "test"]
      },
      {
        title: "Write composite indexes for dashboard query performance",
        desc: "Add these in a second migration: idx_attendance_gym_date on (gymId, checkedInAt), idx_membership_gym_status on (gymId, status), idx_payments_gym_month on (gymId, paidAt), idx_members_gym_deleted on (gymId, deletedAt). These prevent slow queries at 300 gyms.",
        tags: ["db"]
      }
    ]
  },
  {
    id: 2,
    label: "P2 · Auth",
    days: "Days 9–13",
    title: "Authentication — bulletproof from day one",
    desc: "This is the most critical module. Every other module depends on auth being correct. A bug here means data leaks between gyms. Build it slowly and test every case.",
    steps: [
      {
        title: "Create AuthModule, AuthController, AuthService",
        desc: "nest g module auth && nest g controller auth && nest g service auth. Install @nestjs/passport passport passport-jwt. Create jwt.strategy.ts and jwt-refresh.strategy.ts. Both extend PassportStrategy.",
        tags: ["be"]
      },
      {
        title: "Implement POST /auth/register — gym + owner in one transaction",
        desc: "Accept: gymName, ownerName, email, password, phone. Hash password with bcrypt (rounds: 12). Use prisma.$transaction([createUser, createGym]) — if either fails, both roll back. Return 201 with gym slug. Never return passwordHash.",
        tags: ["be", "sec"]
      },
      {
        title: "Implement POST /auth/login",
        desc: "Find user by email. Compare password with bcrypt.compare — constant-time comparison prevents timing attacks. On success: generate accessToken (15min expiry) and refreshToken (7 days). Set refreshToken as httpOnly cookie. Return accessToken in body only.",
        tags: ["be", "sec"]
      },
      {
        title: "JWT payload must contain: userId, gymId, role, jti",
        desc: "The jti (JWT ID) is a random UUID added to every token. It's used for the blacklist. gymId in the payload is your multi-tenancy key — every service uses it. Never trust a gymId from the request body, only from the verified JWT.",
        tags: ["be", "sec"]
      },
      {
        title: "Implement POST /auth/refresh using httpOnly cookie",
        desc: "Read refreshToken from cookie (not body). Verify it. Issue new accessToken. Rotate the refreshToken — issue a new one and clear the old cookie. This prevents refresh token theft from lasting forever.",
        tags: ["be", "sec"]
      },
      {
        title: "Implement POST /auth/logout with Redis blacklist",
        desc: "Read jti from current access token. Store in Redis: SET blacklist:{jti} 1 EX {token_remaining_ttl_seconds}. Clear the refreshToken cookie. Every subsequent request checks Redis for this jti and rejects if found. Cost: one Redis GET per request.",
        tags: ["be", "sec"]
      },
      {
        title: "Create JwtAuthGuard and apply globally",
        desc: "Apply JwtAuthGuard globally in AppModule providers. Use @Public() decorator to mark routes that skip auth (checkin endpoints, register, login). This is safer than opt-in — you can't accidentally forget to protect a route.",
        tags: ["be", "sec"]
      },
      {
        title: "Create RolesGuard and @Roles() decorator",
        desc: "RolesGuard reads the role from the JWT payload (never from DB on every request). Apply @Roles(Role.OWNER) or @Roles(Role.OWNER, Role.MANAGER) on each controller method. Receptionist cannot access payment or member-delete endpoints.",
        tags: ["be", "sec"]
      },
      {
        title: "Create @GymId() and @CurrentUser() parameter decorators",
        desc: "@GymId() extracts gymId from req.user.gymId (the JWT payload). @CurrentUser() returns the full JWT payload. Use these in every service call instead of extracting manually — prevents accidental gymId from wrong source.",
        tags: ["be"]
      },
      {
        title: "Configure global throttler: 100 req/min per IP",
        desc: "Install @nestjs/throttler. Add ThrottlerModule.forRoot in AppModule with ttl:60, limit:100. Apply @SkipThrottle() on public check-in endpoints which have their own tighter throttle. This stops brute force and scraping.",
        tags: ["be", "sec"]
      },
      {
        title: "Write auth unit tests — test every edge case",
        desc: "Test: wrong password returns 401, expired token rejected, blacklisted jti rejected, refresh with wrong cookie fails, role mismatch returns 403. Use Jest + @nestjs/testing. These tests will save you many times.",
        tags: ["test"]
      }
    ]
  },
  {
    id: 3,
    label: "P3 · Core API",
    days: "Days 14–22",
    title: "Core business modules",
    desc: "Build each module in dependency order. Plans before Members, Members before Memberships, Memberships before Payments. Each module builds on the previous.",
    steps: [
      {
        title: "Build PlansModule — CRUD with gymId scoping",
        desc: "Every query: WHERE gymId = jwtPayload.gymId. POST /plans (OWNER only), GET /plans (active plans list for check-in page too), PATCH /plans/:id, DELETE /plans/:id (soft archive, not hard delete). Validate that price is positive and durationDays > 0.",
        tags: ["be"]
      },
      {
        title: "Build MembersModule — add with photo upload",
        desc: "POST /members: validate phone format (Indian +91 10-digit), upload photo to R2 using @aws-sdk/client-s3, store photoUrl. Auto-generate joinedAt. GET /members with search (name/phone) and filter (active/expired/expiring). GET /members/:id for full profile. PATCH and soft DELETE.",
        tags: ["be", "fe"]
      },
      {
        title: "Implement photo upload to Cloudflare R2",
        desc: "Install @aws-sdk/client-s3. Create storage.service.ts: use S3Client with R2 endpoint (https://{accountId}.r2.cloudflarestorage.com). Upload with PutObjectCommand. Return public URL as {R2_PUBLIC_URL}/{key}. Validate file is image, max 2MB before upload.",
        tags: ["be", "infra"]
      },
      {
        title: "Build MembershipsModule — assign plan to member",
        desc: "POST /memberships: create Membership with startDate (today) and endDate (startDate + plan.durationDays). Validate member belongs to same gym. Set status ACTIVE. On create, record a Payment of type NEW_MEMBERSHIP.",
        tags: ["be"]
      },
      {
        title: "Implement membership renewal",
        desc: "POST /memberships/:id/renew: fetch current membership. If ACTIVE, extend endDate from current endDate. If EXPIRED, create new membership starting today. Record Payment of type RENEWAL. Run inside prisma.$transaction to ensure payment and membership update are atomic.",
        tags: ["be"]
      },
      {
        title: "Implement membership freeze and unfreeze — correct math",
        desc: "freeze: set status=FROZEN, frozenAt=now. unfreeze: compute frozenMs = Date.now() - frozenAt.getTime() (milliseconds, not days). Extend endDate by exactly frozenMs. Set freezeDays += Math.ceil(frozenMs/86400000). Never use differenceInDays for billing — it rounds incorrectly.",
        tags: ["be"]
      },
      {
        title: "Build PaymentsModule with audit log",
        desc: "POST /payments: record amount, type, method, notes, memberId. On every write, also insert into AuditLog: {entity:'Payment', action:'CREATE', newValue: paymentData, userId: currentUser.id}. GET /payments/member/:id for history. GET /payments/summary for revenue dashboard.",
        tags: ["be", "sec"]
      },
      {
        title: "Build AuditLog interceptor for automatic logging",
        desc: "Create audit-log.interceptor.ts. Apply on PaymentsController and MembershipsController. On each mutating request (POST/PATCH/DELETE), log the before and after state to audit_logs table. This gives the owner a tamper-evident record of who changed what.",
        tags: ["be", "sec"]
      },
      {
        title: "Build DashboardModule — single optimised query",
        desc: "GET /dashboard/summary returns: activeMembers, expiredMembers, todayAttendance, todayRevenue, monthRevenue, expiringThisWeek (list), inactiveMembers (no visit 14+ days). Cache result in Redis with key dashboard:{gymId}, TTL 2 minutes. Invalidate on any write to that gym.",
        tags: ["be"]
      },
      {
        title: "Write Prisma middleware for soft-delete filtering",
        desc: "Add Prisma middleware that automatically appends WHERE deletedAt IS NULL on all findMany and findFirst queries for Member, Plan, and Gym models. This prevents accidentally showing deleted records anywhere.",
        tags: ["be", "db"]
      },
      {
        title: "Write integration tests for every endpoint",
        desc: "Use supertest + @nestjs/testing. Test: gymId isolation (Gym A cannot read Gym B's members), role checks (receptionist cannot POST /payments), soft delete filtering, membership date math. Cover happy path and all error cases.",
        tags: ["test"]
      }
    ]
  },
  {
    id: 4,
    label: "P4 · Check-in",
    days: "Days 23–27",
    title: "Check-in system — the core product experience",
    desc: "This is what members interact with every day. It must be instant, reliable, and work on slow mobile connections. Build the backend first, then the PWA frontend.",
    steps: [
      {
        title: "Create MemberDevicesModule with gym-scoped lookup",
        desc: "Every device lookup: WHERE deviceToken = ? AND gymId = ? AND isActive = true. Never look up by deviceToken alone — cross-gym token use is a security hole. Unique constraint on (deviceToken, gymId) enforces this at DB level too.",
        tags: ["be", "sec"]
      },
      {
        title: "Implement POST /checkin/auto — the main path",
        desc: "Accept: {deviceToken, gymSlug, fingerprint}. Resolve gymSlug to gymId. Look up device scoped to gym. If found: check membership status, create attendance (catch P2002 for duplicate), return status enum. On fingerprint mismatch: silently update fingerprint, allow check-in, log event. Never block for fingerprint alone.",
        tags: ["be", "sec"]
      },
      {
        title: "Implement all 6 result states with consistent response shape",
        desc: "Every response: {status: string, member?: SafeProfile, membership?: SafeMembership}. States: success, already_checked_in, membership_expired, device_not_found, member_deleted, gym_not_found. Frontend switches on status — never on HTTP status codes alone.",
        tags: ["be"]
      },
      {
        title: "Implement POST /checkin/register-device — first-time link",
        desc: "Called after member selects their name in search fallback. Accept: {memberId, gymSlug, deviceToken, fingerprint}. Verify memberId belongs to gymId (prevent member-shopping). Check active device count for that member+gym — if >= 2, deactivate oldest. Upsert device record. Set httpOnly cookie.",
        tags: ["be", "sec"]
      },
      {
        title: "Implement GET /checkin/:gymSlug/members — public member list",
        desc: "Returns name, photoUrl, and id only — never phone, payment data, or personal info. Cache in Redis with key checkin-members:{gymId}, TTL 5 minutes. This endpoint is public (no JWT) so must return minimum data. Rate limit: 60 req/min per IP.",
        tags: ["be", "sec"]
      },
      {
        title: "Apply tight throttling on all check-in endpoints",
        desc: "@Throttle(20, 60) on /checkin/auto and /checkin/register-device. @Throttle(60, 60) on /checkin/:slug/members. Log all failed attempts to check_in_attempts table for anomaly detection. Alert owner if 15+ device_not_found in 10 minutes from same gym.",
        tags: ["be", "sec"]
      },
      {
        title: "Build check-in page as Next.js PWA",
        desc: "Create app/checkin/[gymSlug]/page.tsx. Add manifest.json: name, short_name, display:standalone, theme_color, icons. Create next-pwa config in next.config.js. Service worker caches the check-in page and member list for offline-first load. Members get a homescreen icon.",
        tags: ["fe", "infra"]
      },
      {
        title: "Implement IndexedDB device token storage with idb library",
        desc: "Create lib/device-store.ts. openDB with version 1, objectStore 'tokens'. saveToken(token): db.put(). loadToken(): try IndexedDB first, then fall back to cookie (document.cookie match on gf_dt=). generateToken(): crypto.randomUUID(). generateFingerprint(): hash of userAgent+screen+timezone+language.",
        tags: ["fe"]
      },
      {
        title: "Build auto check-in flow — the 2-second path",
        desc: "useEffect on page load: loadToken() → if token exists: POST /checkin/auto → switch on status → render correct screen. If token missing: generateToken() + saveToken() → render search screen directly (no point trying auto). Show loading spinner with gym logo while request is in flight.",
        tags: ["fe"]
      },
      {
        title: "Build search fallback flow — name search with photo confirm",
        desc: "GET /checkin/:gymSlug/members → cache in component state. Input onChange: filter members client-side on cached list (no API call on each keystroke). Tap member → confirmation card with photo, name, plan. 'Yes, that's me' → POST /checkin/register-device → show success.",
        tags: ["fe"]
      },
      {
        title: "Build all 5 UI screens: loading, success, already-in, expired, search",
        desc: "Loading: gym logo centered, subtle pulse. Success: large green check, member name, streak count, days remaining. Already-in: blue info, time of first check-in today. Expired: amber warning, renewal instruction with owner's phone number. Search: fast filter list. All screens must render in under 200ms after data arrives.",
        tags: ["fe"]
      },
      {
        title: "Test check-in flow on real Android and iOS devices",
        desc: "Test on: Chrome Android (primary market), Safari iOS (ITP problem), Samsung Internet. Verify: IndexedDB persists across sessions on both, service worker caches member list offline, check-in completes on 2G using Chrome DevTools network throttle. Fix any platform-specific bugs before moving on.",
        tags: ["test"]
      }
    ]
  },
  {
    id: 5,
    label: "P5 · Jobs",
    days: "Days 28–31",
    title: "Background jobs and notifications",
    desc: "All async work that runs without a user triggering it. Renewal reminders, expiry auto-marking, inactive member detection. Must be idempotent — safe to run multiple times.",
    steps: [
      {
        title: "Set up BullMQ with Redis in NestJS",
        desc: "Install @nestjs/bull bull ioredis. Create JobsModule. Register queues: renewal-alerts, expiry-updater, inactive-checker. Add BullModule.forRootAsync reading REDIS_URL from ConfigService. Create processors for each queue in separate files.",
        tags: ["be", "infra"]
      },
      {
        title: "Build renewal-alert job — idempotent WhatsApp send",
        desc: "@Cron('0 9 * * *'): find memberships expiring in 1, 3, and 7 days. For each: check notifications table WHERE memberId=X AND type=RENEWAL_REMINDER AND DATE(createdAt)=TODAY. If record exists: skip. If not: insert notification record FIRST, then send WhatsApp. This prevents double-sends on job retry.",
        tags: ["be"]
      },
      {
        title: "Build expiry-updater job — auto-mark memberships expired",
        desc: "@Cron('0 0 * * *'): UPDATE memberships SET status=EXPIRED WHERE endDate < NOW() AND status=ACTIVE AND gymId=any. Run at midnight IST (use gym timezone). Log count of updated records. This keeps status accurate without requiring any user action.",
        tags: ["be"]
      },
      {
        title: "Build inactive-member job — 7/14/30 day detection",
        desc: "@Cron('0 10 * * *'): for each gym, find members whose last attendance.checkedInAt was 7, 14, or 30 days ago. Store results in Redis cache key inactive:{gymId} with TTL 24h. Dashboard reads from this cache — never runs the query on each dashboard load.",
        tags: ["be"]
      },
      {
        title: "Integrate Interakt WhatsApp API for India",
        desc: "Create whatsapp.service.ts. POST to Interakt API with: authToken, callbackData, type:Message, payload:{message:{msgType:TEXT,text:...}}. Wrap in try/catch — on failure, update notification.status=FAILED and notification.errorMessage. Never throw from the notification send — a failed WhatsApp should not crash the job.",
        tags: ["be", "infra"]
      },
      {
        title: "Add job monitoring — log all job completions and failures",
        desc: "In each job processor: log start time, end time, records processed, any errors. Store in a jobs_log table or use BullMQ's built-in events. Owner dashboard shows: 'Last renewal alerts sent: 9:00 AM today, 12 messages'. This builds trust that the system is working.",
        tags: ["be", "test"]
      }
    ]
  },
  {
    id: 6,
    label: "P6 · Frontend",
    days: "Days 32–38",
    title: "Owner dashboard — complete UI",
    desc: "This is what the gym owner sees every day. Every screen must load in under 1 second. Design for a gym owner using a phone, not a developer on a laptop.",
    steps: [
      {
        title: "Set up React Query for all API calls",
        desc: "Wrap app in QueryClientProvider. Create api/ folder with typed fetch functions for every endpoint. React Query handles: caching (staleTime 2min), background refetch, loading states, error states. Never use useState + useEffect for data fetching — that's the old way.",
        tags: ["fe"]
      },
      {
        title: "Build auth flow: login, register, protected routes",
        desc: "Login page → POST /auth/login → store accessToken in memory (never localStorage — XSS risk). Store refreshToken as httpOnly cookie (server sets it). On 401 response: automatically call /auth/refresh to get new token. If refresh fails: redirect to login. Protect all /dashboard routes with middleware.",
        tags: ["fe", "sec"]
      },
      {
        title: "Build dashboard home — the 5-second overview",
        desc: "Fetch GET /dashboard/summary. Show metric cards: Active Members, Today's Attendance, Today's Revenue, Month Revenue. Below: Expiring This Week list with one-tap renew button. Inactive Members list with one-tap contact. Owner must understand their gym's health in 5 seconds without scrolling.",
        tags: ["fe"]
      },
      {
        title: "Build member list page with search and filters",
        desc: "GET /members with debounced search (300ms delay on input). Filter tabs: All, Active, Expiring Soon, Expired. Each row: photo, name, plan, days remaining, status badge. Tap row → member profile. Add FAB button for quick-add member. Virtualize list if >100 members using react-window.",
        tags: ["fe"]
      },
      {
        title: "Build add-member form with validation",
        desc: "Fields: Full Name (required), Phone (Indian format validation), Plan (select from gym's plans), Joining Date, Amount Paid, Amount Due, Emergency Contact, Photo (upload preview). On submit: POST /members then POST /memberships. Show success → send WhatsApp setup link automatically.",
        tags: ["fe"]
      },
      {
        title: "Build member profile page — the digital member file",
        desc: "Sections: Personal Info, Active Membership (with renew/freeze buttons), Attendance History (calendar heatmap), Payment History (timeline), Registered Devices (with reset button). All data from GET /members/:id. Renew button → inline renewal form without page navigation.",
        tags: ["fe"]
      },
      {
        title: "Build attendance analytics page",
        desc: "GET /attendance/analytics. Show: hourly bar chart (peak hours), daily line chart (weekly trend), monthly attendance count. Use Recharts. Owner can filter by week/month. Show: busiest day of week, peak hour slot, average daily attendance. This is business intelligence they've never had.",
        tags: ["fe"]
      },
      {
        title: "Build payment ledger page",
        desc: "GET /payments with date range filter. Show table: date, member name, amount, type (badge), method, recorded by. Totals row at bottom. Export to CSV button (client-side using Papa.parse). Filter by: member, type, date range, method. Owners print this for accounting.",
        tags: ["fe"]
      },
      {
        title: "Build plans management page",
        desc: "List gym's plans with price, duration, member count. Add plan form. Edit plan (price changes don't affect existing memberships — warn owner). Archive plan (cannot delete if members are on it). Simple CRUD, well-designed.",
        tags: ["fe"]
      },
      {
        title: "Build onboarding wizard for new gym owners",
        desc: "5-step flow shown only on first login: (1) Gym details + logo, (2) Create first plan, (3) Add first member, (4) Test QR scan yourself, (5) Print QR code. Track completion in Redis. Each step has a clear success state. Owners who complete onboarding have 3x higher 30-day retention.",
        tags: ["fe"]
      },
      {
        title: "Make all pages mobile-responsive",
        desc: "Every page must work on a 375px screen (iPhone SE) — this is what gym owners in Bihar actually have. Use Tailwind responsive prefixes. Test with Chrome DevTools device mode on every page. Navigation should be a bottom tab bar on mobile, sidebar on desktop.",
        tags: ["fe", "test"]
      }
    ]
  },
  {
    id: 7,
    label: "P7 · Launch",
    days: "Days 39–42",
    title: "Production deployment and first customers",
    desc: "Deploy once. Get 2 gym owners on it. Watch them use it. Fix what's confusing. Charge the first paying customer by end of week 6.",
    steps: [
      {
        title: "Set up Hetzner VPS — CX21 (2 vCPU, 4GB RAM, €7/mo)",
        desc: "Create server → Ubuntu 22.04. SSH key login only — disable password auth. Install: Docker, Docker Compose, git. Create deploy user with sudo. Never run as root. Open ports: 80, 443 only. Disable all others with ufw.",
        tags: ["infra", "sec"]
      },
      {
        title: "Configure Caddy as reverse proxy with auto TLS",
        desc: "Create /etc/caddy/Caddyfile: api.gymflex.in → proxy to backend:3001. gymflex.in → proxy to frontend:3000. checkin.gymflex.in → proxy to frontend:3000 (for PWA check-in). Caddy handles Let's Encrypt automatically. Restart Caddy after config change.",
        tags: ["infra"]
      },
      {
        title: "Set up GitHub Actions deployment pipeline",
        desc: "On push to main: SSH into Hetzner → git pull → docker compose up --build -d. Add environment secrets to GitHub Actions: SSH key, server IP. Never put secrets in the workflow file. Test the deployment by pushing a small change and verifying it goes live.",
        tags: ["infra"]
      },
      {
        title: "Run database migrations on production",
        desc: "SSH into server → docker compose exec backend npx prisma migrate deploy. This runs all pending migrations in order. Never run migrate dev on production — migrate deploy is safe for production. Verify all tables exist in Neon console after migration.",
        tags: ["db", "infra"]
      },
      {
        title: "Set up error monitoring with BetterStack or Sentry",
        desc: "Create BetterStack account (free tier). Add HTTP monitor for api.gymflex.in/health every minute. Get SMS alert on downtime. Add Sentry to backend: install @sentry/nestjs, initialise in main.ts. Every unhandled exception is captured with context. Set up a #alerts Telegram channel.",
        tags: ["infra", "test"]
      },
      {
        title: "Set up database backup schedule",
        desc: "Neon.tech runs automatic daily backups — verify this is enabled in dashboard. Optionally: add a cron job that runs pg_dump and uploads to R2 bucket daily. Retention: 30 days. Verify restore works by doing a test restore on a local Postgres instance.",
        tags: ["infra", "sec"]
      },
      {
        title: "Go to 2 local gyms — onboard them personally",
        desc: "Walk in with your laptop. Show the owner the dashboard. Add their first 5 members yourself while they watch. Show them the QR check-in. Give them a printed QR code. Stay for 30 minutes. Watch where they get confused. This is more valuable than any test suite.",
        tags: ["test"]
      },
      {
        title: "Fix the 5 biggest friction points from owner feedback",
        desc: "After onboarding 2 gyms, you will have 5+ things that are confusing or broken. Fix them before onboarding more. Common issues: WhatsApp template rejection, photo upload too slow, search not finding names due to spelling, QR not scanning on old Android. Fix these fast.",
        tags: ["test", "fe", "be"]
      },
      {
        title: "Generate and print QR codes for both gyms",
        desc: "Build a /dashboard/qr-print page: shows the gym's check-in URL as a large QR code with the gym name below. Print button generates a PDF. Owner prints it on A4 and laminate it. The QR should be large enough to scan from 50cm away in low gym lighting.",
        tags: ["fe"]
      },
      {
        title: "Charge first paying customer",
        desc: "Offer Growth plan (₹999/mo) after 30 days free. Send WhatsApp invoice. Accept UPI payment manually for first 5 customers — don't build Razorpay integration yet. When you have 10 paying gyms, then build automated billing. Focus on product, not payment automation.",
        tags: ["infra"]
      }
    ]
  }
];

export const staticArchitecturalIssues = [
  {
    severity: "Critical",
    title: "Phone number fallback is a privacy attack vector",
    desc: "Document says: 'If token missing → Enter phone number.' Anyone at the QR can type any number and mark a stranger present. No verification, no confirmation. A disgruntled member marks all rivals absent. A stalker finds out when someone is at the gym.",
    fix: "→ Fallback must be name search only. Show photo on confirmation screen. Owner can also do manual override from their dashboard. Never expose phone numbers in the check-in flow."
  },
  {
    severity: "Critical",
    title: "member_devices table missing gym_id",
    desc: "A device token with no gym scope means: one person's phone that visits two gyms on your platform could collide — or worse, a stolen token from Gym A works at Gym B. Every device lookup must be scoped to a gym.",
    fix: "→ Add gym_id to member_devices. Every lookup: WHERE device_token = ? AND gym_id = ?. Composite unique index on (device_token, gym_id)."
  },
  {
    severity: "Critical",
    title: "Static QR code is a security hole",
    desc: "Plan uses GYM-{gymId}-MBR-{nanoid(8)} — static forever. Anyone who screenshots it can share it. A member gives their QR to a friend, friend checks in for free indefinitely. You'll never detect it.",
    fix: "→ QR embeds a signed JWT: payload={memberId,gymId}, signed with SECRET, expires in 60s. Scan hits /attendance/checkin, backend verifies signature + expiry. Rotate on each scan display."
  },
  {
    severity: "Critical",
    title: "No gym_id on Attendance model",
    desc: "The Prisma schema shown has Attendance with memberId but no gymId. Your checkin service does WHERE qrCode = X across ALL gyms. If two gyms somehow share a QR collision, wrong gym's data gets written.",
    fix: "→ Add gymId to Attendance. Derive it from the JWT payload, not the member lookup. Every write is explicitly scoped: { memberId, gymId: jwt.gymId, checkedInAt }."
  },
  {
    severity: "Critical",
    title: "JWT logout has no invalidation",
    desc: "Plan describes Access Token + Refresh Token but no blacklist. If a gym owner's token is stolen, or a staff member is fired and you call POST /auth/logout, the access token is still valid until it expires (typically 15min–1hr). For financial data, this is unacceptable.",
    fix: "→ On logout, store jti (JWT ID) in Redis with TTL = token expiry. Add a guard that checks Redis blacklist on every request. Cost: one Redis lookup per request."
  },
  {
    severity: "Critical",
    title: "No unique constraint on daily attendance",
    desc: "The existing logic checks for a duplicate via a SELECT before INSERT — this is a race condition. Two simultaneous scans (network retry, double-tap) will both pass the check and both INSERT. Owner sees 2 entries for 1 person today.",
    fix: "→ Add DB-level unique constraint: @@unique([memberId, DATE(checkedInAt)]) — but Prisma doesn't support function-based unique index. Use raw migration on Postgres, catch P2002, return already_checked_in."
  },
  {
    severity: "Gap",
    title: "Fingerprint mismatch detection has no action plan",
    desc: "Document says fingerprint helps detect suspicious changes but never says what happens. Do you block the check-in? Alert the owner? Force re-registration? Without a decision, you'll either block legitimate users (phone update) or let every spoofed token through.",
    fix: "→ On fingerprint mismatch: allow check-in but flag it. Update fingerprint silently if it's just an OS/browser update (same device_token). Only block if the device_token itself is missing or the gym_id doesn't match."
  },
  {
    severity: "Gap",
    title: "No device limit per member",
    desc: "Document allows unlimited devices per member. In theory a member registers 5 phones — their family all scan and check in as that one member. Gym owner's attendance data becomes meaningless.",
    fix: "→ Limit to 2 active devices per member per gym (covers primary phone + backup). If a 3rd device registers, deactivate the oldest one. Owner can manually reset from dashboard."
  },
  {
    severity: "Gap",
    title: "localStorage is cleared by iOS Safari after 7 days of inactivity",
    desc: "Safari's Intelligent Tracking Prevention (ITP) deletes localStorage from non-visited domains after 7 days. A member who doesn't go to the gym for a week loses their device token on iPhone. They return and get the search screen every time.",
    fix: "→ Use IndexedDB instead of localStorage — ITP does not purge it. Or supplement with a short-lived cookie (30-day httpOnly) as a second store. Always check both before falling back to search."
  },
  {
    severity: "Gap",
    title: "Gym timezone is not stored",
    desc: "Attendance analytics (peak hour 6–8AM) and daily check-in deduplication both depend on knowing 'today' in the gym's local time. If you store UTC and your gym is in IST (+5:30), midnight UTC is 5:30 AM IST — the wrong day boundary. Crowd analytics will be wrong for any gym not in UTC.",
    fix: "→ Add timezone String @default(\"Asia/Kolkata\") on Gym model. All date-bucketing queries use AT TIME ZONE gym.timezone. Store all timestamps as UTC, convert at query time."
  },
  {
    severity: "Gap",
    title: "Freeze logic has an off-by-one bug",
    desc: "The unfreeze function uses differenceInDays(new Date(), m.frozenAt). If frozen at 11:59 PM and unfrozen at 12:01 AM next day, differenceInDays returns 1 day even though only 2 minutes passed.",
    fix: "→ Store freeze as milliseconds: const ms = Date.now() - m.frozenAt.getTime(). Calculate days as Math.ceil(ms / 86400000). Or use differenceInHours and divide by 24 with ceiling. Never use differenceInDays for billing logic."
  }
];
