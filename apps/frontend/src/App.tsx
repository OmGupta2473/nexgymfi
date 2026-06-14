import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Activity,
  Users,
  CreditCard,
  QrCode,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Search,
  Plus,
  RefreshCw,
  Calendar,
  DollarSign,
  Shield,
  Trash2,
  Sparkles,
  ChevronRight,
  Clock,
  History,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Play,
  Check,
  RotateCcw,
  UserX,
  Lock,
  MessageSquare,
  FileText,
  Workflow,
  Camera,
  X,
  Globe,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  MembershipStatus,
  GymInfo,
  Plan,
  Member,
  AttendanceRecord,
  MemberDevice,
  Payment,
  AuditLog,
  BuildPhase,
  BuildStep,
} from "./types";
import {
  initialGymInfo,
  initialPlans,
  initialMembers,
  initialPayments,
  initialAttendance,
  initialAuditLogs,
  initialBuildPhases,
  staticArchitecturalIssues,
} from "./data";

import { LandingPage } from "./LandingPage";

export type GymConfigData = {
  name: string;
  slots: { openTime: string; closeTime: string }[];
};

function GymSetupForm({ onComplete, initialConfig }: { onComplete: (config: GymConfigData) => void, initialConfig?: GymConfigData | null }) {
  const [name, setName] = useState(initialConfig?.name || "");
  const [slots, setSlots] = useState<{openTime: string, closeTime: string}[]>(initialConfig?.slots?.length ? initialConfig.slots : [{ openTime: "06:00", closeTime: "22:00" }]);

  const addSlot = () => {
    setSlots([...slots, { openTime: "", closeTime: "" }]);
  };

  const updateSlot = (index: number, field: "openTime" | "closeTime", value: string) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-50 font-sans flex flex-col items-center justify-center p-6 selection:bg-[#EEFF00] selection:text-black">
      <div className="w-full max-w-md bg-[#0C0C0D] border border-zinc-800 rounded-lg p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Facility Setup</h2>
        <p className="text-zinc-400 text-sm mb-8">Initialize your gym infrastructure parameters.</p>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (name.trim() && slots.every(s => s.openTime && s.closeTime)) onComplete({ name, slots });
        }} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Facility Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#EEFF00]/50 text-white placeholder-zinc-700 transition"
              placeholder="e.g. Iron Core Fitness"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500">Operating Batches</label>
            </div>
            
            {slots.map((slot, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
                <div>
                  <label className="block text-[10px] uppercase text-zinc-600 mb-1">Open</label>
                  <input
                    type="time"
                    required
                    value={slot.openTime}
                    onChange={(e) => updateSlot(index, "openTime", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#EEFF00]/50 text-white transition [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-zinc-600 mb-1">Close</label>
                  <input
                    type="time"
                    required
                    value={slot.closeTime}
                    onChange={(e) => updateSlot(index, "closeTime", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#EEFF00]/50 text-white transition [color-scheme:dark]"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => removeSlot(index)} 
                  disabled={slots.length === 1}
                  className="p-3 text-zinc-500 hover:text-red-400 bg-zinc-900 border border-zinc-800 rounded-sm disabled:opacity-50"
                  title="Remove Batch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {slots.length < 4 && (
              <button 
                type="button" 
                onClick={addSlot}
                className="w-full py-2.5 border border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-sm text-xs font-mono uppercase transition flex items-center justify-center gap-2"
              >
                + ADD ANOTHER SLOT
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#EEFF00] text-black px-6 py-4 font-semibold hover:bg-white transition-colors text-sm uppercase tracking-wide rounded-sm flex items-center justify-center gap-2"
          >
            Initialize Infrastructure
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  // --- Persistent Storage State ---
  const [gymInfo, setGymInfo] = useState<GymInfo>(() => {
    const saved = localStorage.getItem("gf_gym_info");
    return saved ? JSON.parse(saved) : initialGymInfo;
  });

  const [plans, setPlans] = useState<Plan[]>(() => {
    const saved = localStorage.getItem("gf_plans");
    return saved ? JSON.parse(saved) : initialPlans;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem("gf_members");
    return saved ? JSON.parse(saved) : initialMembers;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem("gf_attendance");
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem("gf_payments");
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem("gf_audit_logs");
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    () => {
      const saved = localStorage.getItem("gf_completed_steps");
      if (saved) return JSON.parse(saved);
      // Mark P0 and P1 as mostly complete to start as an elegant preset, let them toggle everything
      const initial: Record<string, boolean> = {};
      initial["0-0"] = true;
      initial["0-1"] = true;
      initial["0-2"] = true;
      initial["0-3"] = true;
      initial["1-0"] = true;
      initial["1-1"] = true;
      initial["1-2"] = true;
      initial["1-3"] = true;
      return initial;
    },
  );

  const [memberDevices, setMemberDevices] = useState<MemberDevice[]>(() => {
    const saved = localStorage.getItem("gf_member_devices");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "dev-1",
        memberId: "mbr-5",
        deviceToken: "amit-pwa-token-123",
        fingerprint: "Android Chrome / Asia/Kolkata",
        label: "My Pixel 8 Pro",
        isActive: true,
        lastSeenAt: new Date().toISOString(),
      },
      {
        id: "dev-2",
        memberId: "mbr-1",
        deviceToken: "rahul-pwa-token-456",
        fingerprint: "iPhone Safari / Asia/Kolkata",
        label: "Rahul's iPhone 15",
        isActive: true,
        lastSeenAt: new Date().toISOString(),
      },
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("gf_gym_info", JSON.stringify(gymInfo));
      localStorage.setItem("gf_plans", JSON.stringify(plans));
      localStorage.setItem("gf_members", JSON.stringify(members));
      localStorage.setItem("gf_attendance", JSON.stringify(attendance));
      localStorage.setItem("gf_payments", JSON.stringify(payments));
      localStorage.setItem("gf_audit_logs", JSON.stringify(auditLogs));
      localStorage.setItem(
        "gf_completed_steps",
        JSON.stringify(completedSteps),
      );
      localStorage.setItem("gf_member_devices", JSON.stringify(memberDevices));
    } catch (e) {
      console.error("Failed to save to device storage (Quota Exceeded?):", e);
    }
  }, [
    gymInfo,
    plans,
    members,
    attendance,
    payments,
    auditLogs,
    completedSteps,
    memberDevices,
  ]);

  // --- UI General Navigation State ---
  const [activeTab, setActiveTab] = useState<"owner" | "steps" | "issues">(
    "owner",
  );
  const [ownerSubTab, setOwnerSubTab] = useState<
    "overview" | "members" | "plans" | "payments" | "audit"
  >("overview");
  const [chartTimeframe, setChartTimeframe] = useState<"today" | "week">("today");

  // --- Modal & Detail Views ---
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [showPlanMembersModal, setShowPlanMembersModal] = useState<string | null>(null);

  // --- Add Member Form State ---
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPlan, setNewMemberPlan] = useState("plan-1");
  const [newMemberJoinedDate, setNewMemberJoinedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [newMemberPhoto, setNewMemberPhoto] = useState<string>("");

  // --- Add Plan Form State ---
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDuration, setNewPlanDuration] = useState(30);
  const [newPlanPrice, setNewPlanPrice] = useState(1000);
  const [newPlanDescription, setNewPlanDescription] = useState("");

  // --- Search / Filters in Members Dashboard ---
  const [memberSearch, setMemberSearch] = useState("");
  const [memberFilter, setMemberFilter] = useState<"ALL" | MembershipStatus>(
    "ALL",
  );

  // --- Check-In Simulator State ---
  const [viewMode, setViewMode] = useState<
    "landing" | "admin" | "member_device" | "auth" | "setup"
  >(() => {
    return (localStorage.getItem("gf_view_mode") as any) || "landing";
  });
  useEffect(() => {
    localStorage.setItem("gf_view_mode", viewMode);
  }, [viewMode]);

  const [gymConfig, setGymConfig] = useState<GymConfigData | null>(() => {
    const saved = localStorage.getItem("gf_gym_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.slots) return parsed;
      // migrate old format
      if (parsed.openTime && parsed.closeTime) {
        return { name: parsed.name, slots: [{ openTime: parsed.openTime, closeTime: parsed.closeTime }] };
      }
    }
    return null;
  });
  
  useEffect(() => {
    if (gymConfig) {
      localStorage.setItem("gf_gym_config", JSON.stringify(gymConfig));
    }
  }, [gymConfig]);

  const [currentDeviceId, setCurrentDeviceId] = useState(() => {
    let id = localStorage.getItem("gf_current_device_token");
    if (!id) {
      id = "dev-token-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("gf_current_device_token", id);
    }
    return id;
  });

  const [checkInResult, setCheckInResult] = useState<{
    status:
      | "loading"
      | "success"
      | "already_checked_in"
      | "checked_out"
      | "membership_expired"
      | "device_not_found"
      | "frozen"
      | "closed"
      | null;
    memberId?: string;
    memberName?: string;
    memberPhoto?: string;
    streak?: number;
    daysRemaining?: number;
    planName?: string;
    joinedAt?: string;
    canCheckOut?: boolean;
    recordId?: string;
  }>({ status: null });

  // Auto trigger scan when opening member mode
  useEffect(() => {
    if (viewMode === "member_device") {
      setCheckInResult({ status: null });
      // Minor delay to simulate 'scanning'
      setTimeout(() => {
        handleCheckInNow();
      }, 800);
    }
  }, [viewMode, currentDeviceId]);

  // Fallback search state in simulator
  const [simSearchQuery, setSimSearchQuery] = useState("");
  const [simShowConfirm, setSimShowConfirm] = useState<Member | null>(null);

  // Advance Day Check-In Requests
  const [advanceRequests, setAdvanceRequests] = useState<
    {
      id: string;
      memberId: string;
      memberName: string;
      memberPhoto?: string;
      requestedAt: string;
      expiresAt: string;
    }[]
  >([]);

  // Periodically remove expired advance requests
  useEffect(() => {
    const interval = setInterval(() => {
      setAdvanceRequests((prev) =>
        prev.filter((r) => new Date(r.expiresAt).getTime() > Date.now()),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [adminCheckInMsg, setAdminCheckInMsg] = useState("");
  const [isGymOpen, setIsGymOpen] = useState(true);
  const isGymOpenRef = useRef(true);

  useEffect(() => {
    if (!gymConfig || !gymConfig.slots) return;
    
    const checkGymStatus = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHours * 60 + currentMinutes;

      let isOpen = false;

      for (const slot of gymConfig.slots) {
        if (!slot.openTime || !slot.closeTime) continue;
        const [openHour, openMin] = slot.openTime.split(':').map(Number);
        const [closeHour, closeMin] = slot.closeTime.split(':').map(Number);
        
        const openTimeMins = openHour * 60 + openMin;
        const closeTimeMins = closeHour * 60 + closeMin;

        let slotOpen = false;
        if (openTimeMins <= closeTimeMins) {
          slotOpen = currentTime >= openTimeMins && currentTime < closeTimeMins;
        } else {
          slotOpen = currentTime >= openTimeMins || currentTime < closeTimeMins;
        }

        if (slotOpen) {
          isOpen = true;
          break;
        }
      }
      
      if (isGymOpenRef.current && !isOpen) {
        setAttendance((prev) => {
          let updated = false;
          const nowStr = new Date().toISOString();
          const newLogs = prev.map((log) => {
            if (!log.checkedOutAt) {
              updated = true;
              return { ...log, checkedOutAt: nowStr };
            }
            return log;
          });
          return updated ? newLogs : prev;
        });
      }

      isGymOpenRef.current = isOpen;
      setIsGymOpen(isOpen);
    };

    checkGymStatus();
    const intervalId = setInterval(checkGymStatus, 60000);
    return () => clearInterval(intervalId);
  }, [gymConfig]);

  // Scan History Modal state
  const [showScanHistoryModal, setShowScanHistoryModal] = useState<
    string | null
  >(null);
  const [rosterFilter, setRosterFilter] = useState<"all" | "present" | "absent" | "currently">("all");

  // Web Audio Synth for Premium Feedback Chime
  const playSynthChime = (
    freq = 880,
    type: OscillatorType = "sine",
    duration = 0.15,
  ) => {
    try {
      const audioCtx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + duration,
      );
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignored if browser blocks audio
    }
  };

  const getConceptualTodayStr = () => {
    let earliestOpenMins = 0; // Default midnight
    if (gymConfig && gymConfig.slots && gymConfig.slots.length > 0) {
      const allOpenMins = gymConfig.slots.map(s => {
        const [h, m] = s.openTime.split(':').map(Number);
        return (h * 60) + m;
      }).filter(m => !isNaN(m));
      if (allOpenMins.length > 0) earliestOpenMins = Math.min(...allOpenMins);
    }
    
    const now = new Date();
    let conceptualToday = new Date(now);
    const currentMins = now.getHours() * 60 + now.getMinutes();
    if (currentMins < earliestOpenMins) {
      conceptualToday.setDate(conceptualToday.getDate() - 1);
    }
    
    const yyyy = conceptualToday.getFullYear();
    const mm = String(conceptualToday.getMonth() + 1).padStart(2, '0');
    const dd = String(conceptualToday.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleAdminManualCheckIn = (memberId: string) => {
    if (!isGymOpen) {
      setAdminCheckInMsg("Gym is closed. Check-in unavailable.");
      setTimeout(() => setAdminCheckInMsg(""), 3000);
      playSynthChime(220, "sawtooth", 0.35);
      return;
    }

    const matchedMember = members.find((m) => m.id === memberId);
    if (!matchedMember) return;

    if (matchedMember.status !== MembershipStatus.ACTIVE) {
      setAdminCheckInMsg("Failed: Membership not Active.");
      setTimeout(() => setAdminCheckInMsg(""), 3000);
      playSynthChime(220, "sawtooth", 0.35);
      return;
    }

    const todayDate = getConceptualTodayStr();
    const hasCheckedInToday = attendance.some(
      (a) =>
        a.memberId === memberId &&
        a.checkedInAt.startsWith(todayDate) &&
        a.status === "success",
    );

    if (hasCheckedInToday) {
      setAdminCheckInMsg("Already checked in today.");
      setTimeout(() => setAdminCheckInMsg(""), 3000);
      playSynthChime(220, "sawtooth", 0.35);
      return;
    }

    const updatedMembers = members.map((m) => {
      if (m.id === memberId) {
        return {
          ...m,
          checkInStreak: m.checkInStreak + 1,
          lastCheckIn: new Date().toISOString(),
        };
      }
      return m;
    });
    setMembers(updatedMembers);

    const checkInDate = new Date();
    const checkOutDate = new Date(checkInDate.getTime() + 90 * 60 * 1000);
    const newRecord: AttendanceRecord = {
      id: "att-" + (attendance.length + 1),
      memberId: matchedMember.id,
      memberName: matchedMember.name,
      memberPhoto: matchedMember.photoUrl,
      checkedInAt: checkInDate.toISOString(),
      checkedOutAt: checkOutDate.toISOString(),
      source: "ADMIN",
      status: "success",
    };
    setAttendance([newRecord, ...attendance]);

    setAdminCheckInMsg("Check-In Successful!");
    setTimeout(() => setAdminCheckInMsg(""), 3000);
    playSynthChime(600, "sine", 0.15);
    setTimeout(() => playSynthChime(880, "sine", 0.2), 120);

    writeAuditLog(
      "owner-1",
      "ADMIN_MANUAL_CHECKIN",
      "Admin checked in member manually",
      matchedMember.id,
      undefined,
      JSON.stringify(newRecord),
    );
  };

  // --- Simulator Actions ---
  const handleCheckOutNow = () => {
    const recordId = checkInResult.recordId;
    if (!recordId) return;

    setAttendance((prev) =>
      prev.map((a) =>
        a.id === recordId
          ? { ...a, checkedOutAt: new Date().toISOString() }
          : a,
      ),
    );

    setCheckInResult({
      status: "checked_out",
      memberName: checkInResult.memberName,
      memberPhoto: checkInResult.memberPhoto,
    });
    playSynthChime(600, "sine", 0.15);
    setTimeout(() => playSynthChime(880, "sine", 0.2), 120);

    writeAuditLog(
      "owner-1",
      "MEMBER_CHECKOUT",
      "Member checked out manually",
      checkInResult.memberId || "",
      undefined,
      `Record ID: ${recordId}`,
    );
  };

  const handleCheckInNow = (memberIdOverride?: string) => {
    if (!isGymOpen) {
      setCheckInResult({ status: "closed" });
      setTimeout(() => setCheckInResult({ status: null }), 3000);
      playSynthChime(220, "sawtooth", 0.35);
      return;
    }

    setCheckInResult({ status: "loading" });
    playSynthChime(400, "triangle", 0.08);

    setTimeout(() => {
      let matchedDev = memberDevices.find(
        (d) => d.deviceToken === currentDeviceId && d.isActive,
      );
      let matchedMember: Member | undefined;

      if (memberIdOverride) {
        matchedMember = members.find((m) => m.id === memberIdOverride);
      } else if (matchedDev) {
        matchedMember = members.find((m) => m.id === matchedDev?.memberId);
      }

      if (!matchedMember) {
        setCheckInResult({ status: "device_not_found" });
        playSynthChime(220, "sawtooth", 0.35);
        return;
      }

      const daysLeft = Math.ceil(
        (new Date(matchedMember.expirationDate).getTime() -
          new Date().getTime()) /
          86400000,
      );

      // 1. Check if already checked in today first!
      const nowString = new Date().toISOString();
      const todayDate = getConceptualTodayStr();
      const todayRecord = attendance.find(
        (a) =>
          a.memberId === matchedMember?.id &&
          a.checkedInAt.startsWith(todayDate) &&
          a.status === "success",
      );

      if (todayRecord) {
        const checkInTime = new Date(todayRecord.checkedInAt).getTime();
        const nowMs = new Date().getTime();
        const elapsedMins = (nowMs - checkInTime) / 60000;

        setCheckInResult({
          status: "already_checked_in",
          memberName: matchedMember.name,
          memberPhoto: matchedMember.photoUrl,
          streak: attendance.filter(
            (a) => a.memberId === matchedMember?.id && a.status === "success",
          ).length,
          daysRemaining: daysLeft,
          recordId: todayRecord.id,
          canCheckOut: elapsedMins >= 20,
        });
        playSynthChime(500, "sine", 0.2);
        return;
      }

      // 2. Double check membership status
      if (matchedMember.status === MembershipStatus.FROZEN) {
        setCheckInResult({
          status: "frozen",
          memberId: matchedMember.id,
          memberName: matchedMember.name,
          memberPhoto: matchedMember.photoUrl,
          planName: plans.find((p) => p.id === matchedMember?.planId)?.name,
        });
        playSynthChime(330, "triangle", 0.2);
        return;
      }

      if (daysLeft < 0 || matchedMember.status === MembershipStatus.EXPIRED) {
        setCheckInResult({
          status: "membership_expired",
          memberId: matchedMember.id,
          memberName: matchedMember.name,
          memberPhoto: matchedMember.photoUrl,
          daysRemaining: daysLeft,
        });
        playSynthChime(220, "sawtooth", 0.35);
        return;
      }

      // 3. Perfect match Check In
      // Update check in streak in database state
      const updatedMembers = members.map((m) => {
        if (m.id === matchedMember?.id) {
          return {
            ...m,
            checkInStreak: m.checkInStreak + 1,
            lastCheckIn: new Date().toISOString(),
          };
        }
        return m;
      });
      setMembers(updatedMembers);

      // Create attendance record
      const checkInDate = new Date();
      const checkOutDate = new Date(checkInDate.getTime() + 90 * 60 * 1000);

      const newRecord: AttendanceRecord = {
        id: "att-" + (attendance.length + 1),
        memberId: matchedMember.id,
        memberName: matchedMember.name,
        memberPhoto: matchedMember.photoUrl,
        checkedInAt: checkInDate.toISOString(),
        checkedOutAt: checkOutDate.toISOString(),
        source: "QR_AUTO",
        status: "success",
      };
      setAttendance([newRecord, ...attendance]);

      // Success Display
      setCheckInResult({
        status: "success",
        memberName: matchedMember.name,
        memberPhoto: matchedMember.photoUrl,
        streak:
          attendance.filter(
            (a) => a.memberId === matchedMember?.id && a.status === "success",
          ).length + 1,
        daysRemaining: daysLeft,
        planName: plans.find((p) => p.id === matchedMember?.planId)?.name,
      });
      playSynthChime(880, "sine", 0.15);
      setTimeout(() => playSynthChime(1320, "sine", 0.2), 120);

      // Write to Audit log
      writeAuditLog(
        "owner-1",
        "AUTO_CHECK_IN",
        "Member Device Auto Checkin",
        matchedMember.id,
        undefined,
        JSON.stringify(newRecord),
      );
    }, 850);
  };

  // Register Device Fallback Flow (after clicking fallback confirmation)
  const handleRegisterDevice = (member: Member) => {
    // Check device count limit for safety (Security issue resolved: Max 2 devices per member)
    const existingCount = memberDevices.filter(
      (d) => d.memberId === member.id && d.isActive,
    ).length;

    let updatedDevices = [...memberDevices];
    if (existingCount >= 2) {
      // Deactivate oldest active device
      const oldestActiveIdx = updatedDevices.findIndex(
        (d) => d.memberId === member.id && d.isActive,
      );
      if (oldestActiveIdx !== -1) {
        updatedDevices[oldestActiveIdx] = {
          ...updatedDevices[oldestActiveIdx],
          isActive: false,
          label:
            updatedDevices[oldestActiveIdx].label +
            " (Revoked under Safeguard limit)",
        };
      }
    }

    // Register current simulated device
    const newDev: MemberDevice = {
      id: "dev-" + (memberDevices.length + 1),
      memberId: member.id,
      deviceToken: currentDeviceId,
      fingerprint: window.navigator.userAgent.substring(0, 30) + "...",
      label: "Simulated Mobile (" + member.name + "'s device)",
      isActive: true,
      lastSeenAt: new Date().toISOString(),
    };

    setMemberDevices([...updatedDevices, newDev]);
    writeAuditLog(
      "owner-1",
      "REGISTER_DEVICE",
      "MemberDevice Linked",
      member.id,
      undefined,
      JSON.stringify(newDev),
    );

    playSynthChime(1000, "sine", 0.1);
    setSimShowConfirm(null);
    setSimSearchQuery("");

    // Simulate auto recognition check-in directly now that we registered the token
    handleCheckInNow(member.id);
  };

  const writeAuditLog = (
    userId: string,
    action: string,
    entity: string,
    entityId: string,
    oldValue: any,
    newValue: any,
  ) => {
    const freshLog: AuditLog = {
      id: "log-" + (auditLogs.length + 1),
      userId,
      action,
      entity,
      entityId,
      oldValue: oldValue ? JSON.stringify(oldValue) : undefined,
      newValue: newValue ? JSON.stringify(newValue) : undefined,
      ipAddress: "157.34.120.45 (Admin Session)",
      createdAt: new Date().toISOString(),
    };
    setAuditLogs([freshLog, ...auditLogs]);
  };

  // UI calculations
  const totalSubscribers = members.length;
  const activeCount = members.filter(
    (m) => m.status === MembershipStatus.ACTIVE,
  ).length;
  const expiredCount = members.filter(
    (m) => m.status === MembershipStatus.EXPIRED,
  ).length;
  const frozenCount = members.filter(
    (m) => m.status === MembershipStatus.FROZEN,
  ).length;

  const todayAttendance = useMemo(() => {
    const today = getConceptualTodayStr();
    return attendance.filter(
      (a) => a.checkedInAt.split("T")[0] === today && a.status === "success",
    ).length;
  }, [attendance, gymConfig]);

  const rosterCounts = useMemo(() => {
    const todayStr = getConceptualTodayStr();
    let present = 0;
    let currently = 0;
    const now = new Date();
    members.forEach(member => {
      const todaysLog = attendance.find(log => log.memberId === member.id && log.checkedInAt.startsWith(todayStr) && log.status === "success");
      if (todaysLog) {
        present++;
        const checkInTime = new Date(todaysLog.checkedInAt);
        const checkoutTime = todaysLog.checkedOutAt ? new Date(todaysLog.checkedOutAt) : new Date(checkInTime.getTime() + 90 * 60 * 1000);
        if (now < checkoutTime) {
          currently++;
        }
      }
    });

    return {
      all: members.length,
      present,
      absent: members.length - present,
      currently
    };
  }, [attendance, members]);

  const currentCrowdCount = useMemo(() => {
    const todayStr = getConceptualTodayStr();
    let count = 0;
    const now = new Date();
    members.forEach(member => {
      const todaysLog = attendance.find(log => log.memberId === member.id && log.checkedInAt.startsWith(todayStr) && log.status === "success");
      if (todaysLog) {
        const checkInTime = new Date(todaysLog.checkedInAt);
        const checkoutTime = todaysLog.checkedOutAt ? new Date(todaysLog.checkedOutAt) : new Date(checkInTime.getTime() + 90 * 60 * 1000);
        if (now < checkoutTime) {
          count++;
        }
      }
    });
    return count;
  }, [attendance, members]);

  const monthRevenueTotal = useMemo(() => {
    return payments.reduce((sum, p) => sum + p.amount, 0);
  }, [payments]);

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchS =
        memberSearch === "" ||
        m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
        m.phone.includes(memberSearch);
      const matchF = memberFilter === "ALL" || m.status === memberFilter;
      return matchS && matchF;
    });
  }, [members, memberSearch, memberFilter]);

  const activePlansCountMap = useMemo(() => {
    const counts: Record<string, number> = {};
    members.forEach((m) => {
      counts[m.planId] = (counts[m.planId] || 0) + 1;
    });
    return counts;
  }, [members]);

  const selectedMember = members.find((m) => m.id === selectedMemberId);

  // Quick reset all simulation data helper
  const handleResetSimulatorData = () => {
    localStorage.removeItem("gf_gym_info");
    localStorage.removeItem("gf_plans");
    localStorage.removeItem("gf_members");
    localStorage.removeItem("gf_attendance");
    localStorage.removeItem("gf_payments");
    localStorage.removeItem("gf_audit_logs");
    localStorage.removeItem("gf_completed_steps");
    localStorage.removeItem("gf_member_devices");

    setGymInfo(initialGymInfo);
    setPlans(initialPlans);
    setMembers(initialMembers);
    setAttendance(initialAttendance);
    setPayments(initialPayments);
    setAuditLogs(initialAuditLogs);
    setCompletedSteps({});
    setMemberDevices([
      {
        id: "dev-1",
        memberId: "mbr-5",
        deviceToken: "amit-pwa-token-123",
        fingerprint: "Android Chrome / Asia/Kolkata",
        label: "My Pixel 8 Pro",
        isActive: true,
        lastSeenAt: new Date().toISOString(),
      },
      {
        id: "dev-2",
        memberId: "mbr-1",
        deviceToken: "rahul-pwa-token-456",
        fingerprint: "iPhone Safari / Asia/Kolkata",
        label: "Rahul's iPhone 15",
        isActive: true,
        lastSeenAt: new Date().toISOString(),
      },
    ]);
    playSynthChime(660, "sine", 0.3);
  };

  // --- Core Mutation Actions on Members ---
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberPhone) {
      alert("Please provide member name and active phone.");
      return;
    }

    const assignedPlan = plans.find((p) => p.id === newMemberPlan) || plans[0];
    const joinedStr = newMemberJoinedDate || new Date().toISOString().split("T")[0];

    // Calculate exact expiration date correctly based on joined date
    const expDate = new Date(joinedStr);
    expDate.setDate(expDate.getDate() + assignedPlan.durationDays);
    const expDateStr = expDate.toISOString().split("T")[0];

    const newMbr: Member = {
      id: "mbr-" + (members.length + 1),
      name: newMemberName,
      phone: newMemberPhone.startsWith("+91")
        ? newMemberPhone
        : "+91 " + newMemberPhone,
      email:
        newMemberEmail ||
        `${newMemberName.toLowerCase().replace(/\s+/g, "")}@example.com`,
      photoUrl:
        newMemberPhoto ||
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60",
      joinedAt: joinedStr,
      status: MembershipStatus.ACTIVE,
      planId: assignedPlan.id,
      emergencyContact: "Contact reception in emergency",
      freezeDays: 0,
      expirationDate: expDateStr,
      checkInStreak: 0,
    };

    const newPayment: Payment = {
      id: "pay-" + (payments.length + 1),
      memberId: newMbr.id,
      memberName: newMbr.name,
      amount: assignedPlan.price,
      type: "NEW_MEMBERSHIP",
      method: "UPI",
      paidAt: new Date().toISOString(),
      notes: `Joined ${assignedPlan.name}`,
      recordedBy: "Abhishek Singh",
    };

    setMembers([newMbr, ...members]);
    setPayments([newPayment, ...payments]);
    writeAuditLog(
      "owner-1",
      "CREATE_MEMBER",
      "Member Added",
      newMbr.id,
      undefined,
      newMbr,
    );
    writeAuditLog(
      "owner-1",
      "REVENUE_RECORDED",
      "Add payment ledger entry",
      newMbr.id,
      undefined,
      newPayment,
    );

    // Reset Form
    setNewMemberName("");
    setNewMemberPhone("");
    setNewMemberEmail("");
    setNewMemberJoinedDate(new Date().toISOString().split("T")[0]);
    setNewMemberPhoto("");
    setShowAddMemberModal(false);
    setOwnerSubTab("overview");
    playSynthChime(850, "sine", 0.2);
    alert("Successfully added new member: " + newMbr.name);
  };

  const handleRenewMember = (
    memberId: string,
    planId: string,
    method: "UPI" | "CASH" | "CARD",
  ) => {
    const targetMbr = members.find((m) => m.id === memberId);
    if (!targetMbr) return;

    const selectedPl = plans.find((p) => p.id === planId) || plans[0];

    // Transactional math safeguards
    let newStartDate = new Date();
    // If active, extend from existing expiration, else start today
    const currentExp = new Date(targetMbr.expirationDate);
    if (
      targetMbr.status === MembershipStatus.ACTIVE &&
      currentExp > new Date()
    ) {
      newStartDate = currentExp;
    }

    const nextExpDate = new Date(newStartDate.getTime());
    nextExpDate.setDate(nextExpDate.getDate() + selectedPl.durationDays);
    const nextExpStr = nextExpDate.toISOString().split("T")[0];

    const prevMbrState = { ...targetMbr };
    const updatedMbr: Member = {
      ...targetMbr,
      status: MembershipStatus.ACTIVE,
      planId: selectedPl.id,
      expirationDate: nextExpStr,
    };

    const newPay: Payment = {
      id: "pay-" + (payments.length + 1),
      memberId: targetMbr.id,
      memberName: targetMbr.name,
      amount: selectedPl.price,
      type: "RENEWAL",
      method: method,
      paidAt: new Date().toISOString(),
      notes: `Renewed ${selectedPl.name}. Date Extended.`,
      recordedBy: "Admin Portal",
    };

    setMembers((prev) => prev.map((m) => (m.id === memberId ? updatedMbr : m)));
    setPayments([newPay, ...payments]);
    writeAuditLog(
      "owner-1",
      "RESIZE_MEMBERSHIP_RENEW",
      "Membership Expiry Date Shift Correctly",
      memberId,
      prevMbrState,
      updatedMbr,
    );
    writeAuditLog(
      "owner-1",
      "REVENUE_RECORDED",
      "Renewal Payment Ledger Created",
      memberId,
      undefined,
      newPay,
    );

    playSynthChime(950, "sine", 0.1);
    setTimeout(() => playSynthChime(1300, "sine", 0.15), 80);
  };

  // Mathematical Resolution to the Off-by-one bug details highlighted in critical issue 11
  const handleFreezeToggle = (memberId: string) => {
    const targetMbr = members.find((m) => m.id === memberId);
    if (!targetMbr) return;

    const prevMbrState = { ...targetMbr };

    if (targetMbr.status === MembershipStatus.FROZEN) {
      // UNFREEZE OPERATION: Compute exact elapsed frozen milliseconds, avoiding differenceInDays bugs!
      const frozenTime = targetMbr.frozenAt
        ? new Date(targetMbr.frozenAt).getTime()
        : new Date().getTime();
      const elapsedMs = Date.now() - frozenTime;

      // Extend expiration date by exact elapsed milliseconds
      const currentExp = new Date(targetMbr.expirationDate);
      const extendedExp = new Date(currentExp.getTime() + elapsedMs);
      const extendedExpStr = extendedExp.toISOString().split("T")[0];

      // Round exact extra days represented
      const addedDays = Math.ceil(elapsedMs / 86400000);

      const updatedMbr: Member = {
        ...targetMbr,
        status: MembershipStatus.ACTIVE,
        expirationDate: extendedExpStr,
        freezeDays: targetMbr.freezeDays + addedDays,
        frozenAt: undefined,
      };

      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? updatedMbr : m)),
      );
      writeAuditLog(
        "owner-1",
        "UNFREEZE_MEMBERSHIP",
        "Unfreeze & Extended Membership Date Safeguard",
        memberId,
        prevMbrState,
        updatedMbr,
      );
      playSynthChime(750, "sine", 0.2);
    } else {
      // FREEZE OPERATION
      const updatedMbr: Member = {
        ...targetMbr,
        status: MembershipStatus.FROZEN,
        frozenAt: new Date().toISOString(),
      };

      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? updatedMbr : m)),
      );
      writeAuditLog(
        "owner-1",
        "FREEZE_MEMBERSHIP",
        "Freeze Membership Triggered",
        memberId,
        prevMbrState,
        updatedMbr,
      );
      playSynthChime(420, "triangle", 0.25);
    }
  };

  const handleResetDevicesAction = (memberId: string) => {
    // Clear all simulated linked tokens for this key (Emergency security revoke!)
    const prevDevices = [...memberDevices];
    const revoked = memberDevices.map((d) =>
      d.memberId === memberId
        ? { ...d, isActive: false, label: d.label + " (Revoked by Admin)" }
        : d,
    );
    setMemberDevices(revoked);

    writeAuditLog(
      "owner-1",
      "REVOKE_DEVICES",
      "Revoked and Cleared Member Linked Phones",
      memberId,
      prevDevices,
      revoked,
    );
    playSynthChime(370, "triangle", 0.2);
    alert(
      "Simulated Device tokens revoked successfully. Member must link their device again on next fallback search!",
    );
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanName || newPlanPrice <= 0 || newPlanDuration <= 0) {
      alert("Invalid inputs to construct pricing package.");
      return;
    }

    const createdPlan: Plan = {
      id: "plan-" + (plans.length + 1),
      name: newPlanName,
      durationDays: Number(newPlanDuration),
      price: Number(newPlanPrice),
      description: newPlanDescription || "A professional workout bundle plan.",
      isActive: true,
    };

    setPlans([...plans, createdPlan]);
    writeAuditLog(
      "owner-1",
      "CREATE_PLAN",
      "Pricing Package Constructed",
      createdPlan.id,
      undefined,
      createdPlan,
    );

    setNewPlanName("");
    setNewPlanDescription("");
    setNewPlanPrice(1000);
    setNewPlanDuration(30);
    setShowAddPlanModal(false);
    playSynthChime(850, "sine", 0.2);
  };

  // Step checklist counters
  const totalRoadmapSteps = initialBuildPhases.reduce(
    (acc, p) => acc + p.steps.length,
    0,
  );
  const totalCheckedSteps =
    Object.values(completedSteps).filter(Boolean).length;
  const roadmapPercentage = Math.round(
    (totalCheckedSteps / totalRoadmapSteps) * 100,
  );

  const toggleStepCompleted = (phaseId: number, idx: number) => {
    const key = `${phaseId}-${idx}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    playSynthChime(700, "sine", 0.05);
  };

  if (viewMode === "landing") {
    return <LandingPage onEnterApp={() => setViewMode("auth")} />;
  }

  if (viewMode === "auth") {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-zinc-50 font-sans flex flex-col items-center justify-center p-6 selection:bg-[#EEFF00] selection:text-black">
        <div className="w-full max-w-sm bg-[#0C0C0D] border border-zinc-800 rounded-lg p-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-[#EEFF00] rounded-sm mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(238,255,0,0.2)]">
            <span className="text-black font-black text-xl font-mono tracking-tighter">GF</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-center text-zinc-100">Owner Access</h1>
          <p className="text-zinc-400 text-sm mb-8 text-center px-4">Authenticate via Google to manage your facility infrastructure.</p>
          
          <button
            onClick={() => {
              playSynthChime(600, "sine", 0.1);
              if (gymConfig) {
                setViewMode("admin");
              } else {
                setViewMode("setup");
              }
            }}
            className="w-full py-3.5 px-4 bg-zinc-900 border border-zinc-800 hover:border-[#EEFF00]/50 hover:bg-zinc-800 hover:text-white text-zinc-300 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-3 rounded-sm group relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/10 via-[#34A853]/10 to-[#FBBC05]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
             <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            <span className="relative z-10">Continue with Google</span>
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === "setup") {
    return (
      <GymSetupForm 
        initialConfig={gymConfig}
        onComplete={(config) => {
          setGymConfig(config);
          playSynthChime(800, "sine", 0.15);
          setViewMode("admin");
        }} 
      />
    );
  }

  if (viewMode === "member_device") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 selection:bg-blue-200">
        <div className="w-full max-w-sm h-[750px] max-h-[90vh] bg-white border-[6px] border-slate-200 rounded-[44px] relative overflow-hidden shadow-2xl flex flex-col flex-shrink-0 pt-6 pb-2">
          <div className="absolute top-2 w-32 h-5 bg-slate-200 rounded-b-xl left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
            <div className="w-12 h-1.5 bg-slate-400 rounded-full"></div>
          </div>
          <div className="flex-1 w-full bg-white relative p-5 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 p-0.5 text-blue-700 bg-blue-50 rounded" />
                <span className="font-display font-bold text-xs text-slate-900">
                  gf_checkin
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    localStorage.removeItem("gf_current_device_token");
                    setCurrentDeviceId(
                      "dev-token-" +
                        Math.random().toString(36).substring(2, 10),
                    );
                    setCheckInResult({ status: null });
                  }}
                  className="text-[9px] font-mono bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded hover:bg-amber-100 cursor-pointer transition"
                >
                  RESET DEVICE ID
                </button>
                <button
                  onClick={() => setViewMode("admin")}
                  className="text-[9px] font-mono bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer transition"
                >
                  EXIT APP
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              {checkInResult.status === null && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
                    <QrCode className="w-10 h-10 text-blue-600 animate-pulse animate-duration-[3000ms]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">
                      Smartphone scanner active
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2 leading-normal">
                      Ready to Check In
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto mt-2">
                      Tap below to simulate scanning the gym's wall QR code with
                      your device camera.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCheckInNow()}
                    className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide shadow-md transition transform active:scale-95 cursor-pointer"
                  >
                    Simulate QR Scan
                  </button>
                </div>
              )}
              {checkInResult.status === "loading" && (
                <div className="text-center space-y-3">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-blue-600 mx-auto"></div>
                  <span className="text-xs font-mono text-slate-600 block mt-4 tracking-widest uppercase">
                    Authorizing...
                  </span>
                </div>
              )}
              {checkInResult.status === "success" && (
                <div className="text-center space-y-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <img
                      src={checkInResult.memberPhoto}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 mx-auto shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-1 rounded-full">
                      Scanned Success
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-4">
                      Welcome Back!
                    </h4>
                    <p className="text-2xl font-black text-blue-700 font-display tracking-tight leading-none mt-1">
                      {checkInResult.memberName}
                    </p>
                    <div className="mt-5 space-y-2 text-slate-600 font-mono text-[11px] max-w-[240px] mx-auto bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-400 uppercase tracking-widest text-[9px]">
                          Package:
                        </span>
                        <span className="text-slate-900 font-sans font-bold">
                          {checkInResult.planName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-2">
                        <span className="font-semibold text-slate-400 uppercase tracking-widest text-[9px]">
                          Streak:
                        </span>
                        <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                          {checkInResult.streak} visits
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCheckInResult({ status: null })}
                    className="mt-8 text-[11px] cursor-pointer font-bold text-slate-500 hover:text-slate-900 transition underline tracking-wide"
                  >
                    Return to Home
                  </button>
                </div>
              )}
              {checkInResult.status === "already_checked_in" && (
                <div className="text-center space-y-5">
                  <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-100 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-12 h-12 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200 font-bold">
                      Already Checked In
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-4 leading-none">
                      Welcome Back,
                    </h4>
                    <p className="text-xl font-bold text-blue-700 mt-1">
                      {checkInResult.memberName}!
                    </p>
                    <p className="text-xs text-slate-500 mt-3 max-w-[220px] mx-auto leading-relaxed">
                      You are already registered present today. Go grab those
                      dumbbells!
                    </p>
                  </div>

                  {checkInResult.canCheckOut && (
                    <div className="pt-2">
                      <button
                        onClick={handleCheckOutNow}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition shadow-md w-full max-w-[200px] cursor-pointer"
                      >
                        Check Out Now
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setCheckInResult({ status: null })}
                    className="mt-4 block mx-auto text-[11px] font-bold text-slate-500 hover:text-slate-900 cursor-pointer transition underline tracking-wide"
                  >
                    Return to Home
                  </button>
                </div>
              )}
              {checkInResult.status === "checked_out" && (
                <div className="text-center space-y-5">
                  <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 mx-auto flex items-center justify-center shadow-inner">
                    <Check className="w-12 h-12 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold">
                      Checked Out
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 font-display mt-4 leading-none">
                      See you next time,
                    </h4>
                    <p className="text-xl font-bold text-emerald-700 mt-1">
                      {checkInResult.memberName}!
                    </p>
                  </div>
                  <button
                    onClick={() => setCheckInResult({ status: null })}
                    className="mt-8 text-[11px] font-bold text-slate-500 hover:text-slate-900 cursor-pointer transition underline tracking-wide"
                  >
                    Return to Home
                  </button>
                </div>
              )}
              {checkInResult.status === "membership_expired" && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-rose-50 border-4 border-rose-100 mx-auto flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-rose-500" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono bg-rose-500 text-white font-bold px-2.5 py-1 rounded-full tracking-widest shadow-sm">
                      Admission Restricted
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-4 font-display">
                      Membership Expired
                    </h4>
                    <p className="text-sm font-bold text-rose-500 mt-1">
                      {checkInResult.memberName}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-4 max-w-[240px] mx-auto leading-relaxed bg-rose-50/50 p-4 rounded-xl border border-rose-100 font-medium">
                      Your subscription has run out. Contact Admin/Owner{" "}
                      <strong className="text-slate-900 block font-sans mt-1">
                        Abhishek Singh (+91 95000 12345)
                      </strong>{" "}
                      to extend your workout access.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-8">
                    <button
                      onClick={() => {
                        if (
                          checkInResult.memberId &&
                          checkInResult.memberName
                        ) {
                          setAdvanceRequests((prev) => [
                            ...prev,
                            {
                              id: `req-${Date.now()}`,
                              memberId: checkInResult.memberId as string,
                              memberName: checkInResult.memberName as string,
                              memberPhoto: checkInResult.memberPhoto,
                              requestedAt: new Date().toISOString(),
                              expiresAt: new Date(
                                Date.now() + 60000,
                              ).toISOString(), // 1 min expire
                            },
                          ]);
                          setCheckInResult({ status: null });
                          // Optionally show a "Request sent!" toast or just go back to home
                        }
                      }}
                      className="bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg hover:bg-slate-800 transition cursor-pointer"
                    >
                      Request Advance Day Check-In
                    </button>
                    <button
                      onClick={() => setCheckInResult({ status: null })}
                      className="text-[11px] font-bold cursor-pointer text-slate-500 hover:text-slate-900 transition underline tracking-wide"
                    >
                      Cancel Scan
                    </button>
                  </div>
                </div>
              )}
              {checkInResult.status === "device_not_found" && (
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
                    <span className="text-[10px] font-mono tracking-widest text-amber-600 font-bold uppercase block mb-1">
                      Device Link Required
                    </span>
                    <p className="text-xs leading-relaxed">
                      It looks like this is your first time scanning from this
                      device. Please complete the quick one-time verification
                      below.
                    </p>
                  </div>
                  <div className="space-y-3 mt-4 relative">
                    <label className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
                      Type Your Name
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search your name..."
                        value={simSearchQuery}
                        onChange={(e) => {
                          setSimSearchQuery(e.target.value);
                          setSimShowConfirm(null);
                        }}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      />
                    </div>
                    {simSearchQuery.length >= 2 && !simShowConfirm && (
                      <div className="bg-white border border-slate-200 rounded-xl mt-2 max-h-48 overflow-y-auto divide-y divide-slate-100 shadow-lg absolute w-full z-10">
                        {members
                          .filter((m) =>
                            m.name
                              .toLowerCase()
                              .includes(simSearchQuery.toLowerCase()),
                          )
                          .map((m) => (
                            <div
                              key={m.id}
                              onClick={() => {
                                setSimShowConfirm(m);
                                playSynthChime(600, "sine", 0.05);
                              }}
                              className="p-3 flex items-center gap-3 hover:bg-slate-50 transition cursor-pointer"
                            >
                              <img
                                src={m.photoUrl}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                              />
                              <span className="text-sm font-semibold text-slate-900">
                                {m.name}
                              </span>
                            </div>
                          ))}
                        {members.filter((m) =>
                          m.name
                            .toLowerCase()
                            .includes(simSearchQuery.toLowerCase()),
                        ).length === 0 && (
                          <div className="p-4 text-slate-500 italic text-xs text-center border-t border-slate-100">
                            No matches found. Contact Admin.
                          </div>
                        )}
                      </div>
                    )}
                    {simShowConfirm && (
                      <div className="bg-white border-2 border-blue-100 p-5 rounded-xl text-center shadow-lg transform transition animate-in fade-in slide-in-from-bottom-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block bg-blue-50 py-1 rounded inline-block px-3 mb-4">
                          Identity Confirmation
                        </span>
                        <div className="space-y-3">
                          <img
                            src={simShowConfirm.photoUrl}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-blue-50 shadow-sm"
                          />
                          <div>
                            <h5 className="text-lg font-bold text-slate-900">
                              {simShowConfirm.name}
                            </h5>
                            <span className="text-xs text-slate-500 font-mono block mt-1">
                              Joined: {simShowConfirm.joinedAt}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 mt-5">
                          <button
                            onClick={() => handleRegisterDevice(simShowConfirm)}
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-sm shadow-md transition active:scale-95 cursor-pointer"
                          >
                            Yes, This Is Me (Link Phone)
                          </button>
                          <button
                            onClick={() => {
                              setSimShowConfirm(null);
                              setSimSearchQuery("");
                            }}
                            className="w-full py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {checkInResult.status === "closed" && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto border border-slate-200 shadow-sm relative">
                    <span className="w-12 h-1 bg-red-500 absolute rotate-45"></span>
                    <span className="w-12 h-1 bg-red-500 absolute -rotate-45"></span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-red-50 text-red-700 border border-red-200 font-bold px-2.5 py-1 rounded-full">
                      FACILITY CLOSED
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-4 leading-normal">
                      Check-in Unavailable
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto mt-2">
                      The facility is currently closed based on its operating hours.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gymConfig && viewMode !== "landing" && viewMode !== "auth" && viewMode !== "setup" && viewMode !== "member_device") {
    // If we reach here, meaning we are on admin but no gymConfig.
    return (
      <GymSetupForm 
        onComplete={(config) => {
          setGymConfig(config);
          playSynthChime(800, "sine", 0.15);
          setViewMode("admin");
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-50 font-sans selection:bg-[#EEFF00] selection:text-black flex flex-col justify-between">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* --- Visual Premium Header Section --- */}
      <header className="border-b border-zinc-800/80 bg-[#0A0A0B]/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#EEFF00] p-[1.5px] shadow-[0_0_15px_rgba(238,255,0,0.3)] flex items-center justify-center">
              <div className="w-full h-full bg-[#0A0A0B] rounded-[2px] flex items-center justify-center">
                <Activity className="w-5 p-0.5 text-[#EEFF00] font-bold" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-lg tracking-tight text-white leading-none">
                  GymFlex
                </h1>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-semibold tracking-wider">
                  OS V2.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 font-mono tracking-tight">
                zero_friction_core // active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setViewMode("landing")}
              className={`text-xs font-mono px-4 py-2 rounded-sm transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:bg-zinc-800 bg-transparent text-zinc-400 border border-transparent hover:border-zinc-700`}
            >
              <Globe className="w-3.5 h-3.5" />
              PUBLIC_SITE
            </button>
            <button
              onClick={() => setActiveTab("owner")}
              className={`text-xs font-mono px-4 py-2 rounded-sm transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                activeTab === "owner"
                  ? "bg-[#EEFF00] text-black font-semibold border-[#EEFF00] shadow-[0_0_15px_rgba(238,255,0,0.2)]"
                  : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              CONSOLE
            </button>
            <button
              onClick={() => setViewMode("member_device")}
              className={`text-xs font-mono px-4 py-2 rounded-sm transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:bg-zinc-800 border border-transparent hover:border-zinc-700 text-zinc-400`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              QR_GATEWAY
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EEFF00] rounded-full animate-pulse shadow-[0_0_10px_#EEFF00]"></span>
            </button>
            <button
              onClick={() => setActiveTab("steps")}
              className={`text-xs font-mono px-4 py-2 rounded-sm transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                activeTab === "steps"
                  ? "bg-zinc-800 text-white font-semibold border-zinc-700"
                  : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              DEPLOYMENT_LOG
              <span className="text-[9px] opacity-75">
                [{roadmapPercentage}%]
              </span>
            </button>
            <button
              onClick={() => setActiveTab("issues")}
              className={`text-xs font-mono px-4 py-2 rounded-sm transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                activeTab === "issues"
                  ? "bg-zinc-800 text-white font-semibold border-zinc-700"
                  : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              AUDIT
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Contents Dynamic Container --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 relative">
        {/* --- 1. OWNER CONSOLE VIEW --- */}
        {activeTab === "owner" && (
          <div className="space-y-6">
            {/* Owner Section Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
              <div className="flex-1 min-w-[200px]">
                <h2 className="font-semibold text-xl text-zinc-100 tracking-tight uppercase">
                  Owner Portal
                </h2>
                <p className="text-xs text-zinc-500 mt-1 font-mono">
                  Operational view for {gymConfig?.name || gymInfo.name}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-sm border border-zinc-800">
                {(
                  ["overview", "members", "plans", "payments", "audit"] as const
                ).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setOwnerSubTab(sub);
                      playSynthChime(650, "sine", 0.05);
                    }}
                    className={`px-4 py-1.5 rounded-sm text-xs font-mono uppercase transition-all cursor-pointer border ${
                      ownerSubTab === sub
                        ? "bg-[#EEFF00] text-black font-semibold border-transparent"
                        : "text-zinc-500 hover:text-zinc-200 border-transparent hover:border-zinc-700"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* A. Overview Subtab */}
            {ownerSubTab === "overview" && (
              <div className="space-y-6">
                {/* Visual Widgets Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div 
                    onClick={() => setOwnerSubTab("members")}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-5 relative group cursor-pointer hover:border-[#EEFF00]/50"
                  >
                    <div className="absolute right-3 top-3 w-8 h-8 rounded-sm bg-[#EEFF00]/10 flex items-center justify-center group-hover:bg-[#EEFF00] transition-colors">
                      <Users className="w-4 h-4 text-[#EEFF00] group-hover:text-black transition-colors" />
                    </div>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                      Total Members
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-3xl font-mono tracking-tight text-zinc-50">
                        {totalSubscribers}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EEFF00] animate-pulse shadow-[0_0_5px_#EEFF00]"></span>
                      <span className="group-hover:text-[#EEFF00] transition-colors">VIEW DIRECTORY // {frozenCount} FROZEN</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-5 relative group cursor-default hover:border-blue-500/50"
                  >
                    <div className="absolute right-3 top-3 w-8 h-8 rounded-sm bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                      Current Crowd
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-3xl font-mono tracking-tight text-zinc-50">
                        {currentCrowdCount}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span>LIVE AT FACILITY</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-5 relative group cursor-default hover:border-emerald-500/50"
                  >
                    <div className="absolute right-3 top-3 w-8 h-8 rounded-sm bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <DollarSign className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                      Monthly Revenue
                    </span>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-mono tracking-tight text-zinc-50">
                        ₹{monthRevenueTotal}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-500/50 mt-4 block font-mono uppercase tracking-widest">
                      SYSTEM FINANCES
                    </span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`bg-[#0C0C0D] border rounded-sm p-5 relative group flex flex-col justify-between ${isGymOpen ? "border-emerald-500/30 hover:border-emerald-500/80" : "border-red-500/30 hover:border-red-500/80"}`}
                  >
                    <div>
                      <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono block">
                        Facility Status
                      </span>
                      <div className="mt-2 flex items-center gap-2">
                         <span className="text-3xl font-mono tracking-tight text-zinc-50">
                           {isGymOpen ? "OPEN" : "CLOSED"}
                         </span>
                         <span className={`w-2.5 h-2.5 rounded-full ${isGymOpen ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"}`}></span>
                      </div>
                    </div>
                    
                    <div className="w-full mt-4 py-2 px-3 flex justify-between items-center gap-2 rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest border border-zinc-800 bg-zinc-900/50 text-zinc-500">
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        AUTO-CONTROLLED SCHEDULE
                      </span>
                      <button 
                        onClick={() => setViewMode("setup")}
                        className="text-zinc-400 hover:text-[#EEFF00] transition"
                        title="Edit Schedule"
                      >
                        EDIT
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Peak Attendance Hourly Chart */}
                  <div className="lg:col-span-2 bg-[#0C0C0D] border border-zinc-800 rounded-sm p-5">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                      <div>
                        <h3 className="font-semibold text-sm text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
                          <Activity className="w-4 h-4 text-[#EEFF00]" />
                          Peak Attendance Analytics
                        </h3>
                        <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                          Drawn using local gym timezone coordinates
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400">
                        ASIA/KOLKATA
                      </span>
                    </div>

                    {/* Custom SVG Hourly & Daily Charts */}
                    {(() => {
                      const hourlyCounts = Array(24).fill(0);
                      const dailyCounts = Array(7).fill(0);
                      
                      const todayStr = getConceptualTodayStr();
                      
                      // Calculate the 7 conceptual strings for "this week"
                      const todayDateObj = new Date();
                      // Determine earliest open mins to conceptually adjust "today" for week calc too
                      let earliestOpenMins = 0;
                      if (gymConfig && gymConfig.slots && gymConfig.slots.length > 0) {
                        const allOpenMins = gymConfig.slots.map(s => {
                          const [h, m] = s.openTime.split(':').map(Number);
                          return (h * 60) + m;
                        }).filter(m => !isNaN(m));
                        if (allOpenMins.length > 0) earliestOpenMins = Math.min(...allOpenMins);
                      }
                      
                      let conceptualTodayObj = new Date(todayDateObj);
                      if (todayDateObj.getHours() * 60 + todayDateObj.getMinutes() < earliestOpenMins) {
                        conceptualTodayObj.setDate(conceptualTodayObj.getDate() - 1);
                      }
                      
                      const dayOfWk = conceptualTodayObj.getDay(); 
                      const daysToSubtract = dayOfWk === 0 ? 6 : dayOfWk - 1; // Mon = 0
                      const mondayDateObj = new Date(conceptualTodayObj);
                      mondayDateObj.setDate(conceptualTodayObj.getDate() - daysToSubtract);
                      
                      const thisWeekStrs: string[] = [];
                      for (let i = 0; i < 7; i++) {
                         const d = new Date(mondayDateObj);
                         d.setDate(mondayDateObj.getDate() + i);
                         const yyyy = d.getFullYear();
                         const mm = String(d.getMonth() + 1).padStart(2, '0');
                         const dd = String(d.getDate()).padStart(2, '0');
                         thisWeekStrs.push(`${yyyy}-${mm}-${dd}`);
                      }

                      attendance.forEach((a) => {
                        if (a.status === "success") {
                          const date = new Date(a.checkedInAt);
                          
                          let conceptualDay = new Date(date);
                          const currentMins = date.getHours() * 60 + date.getMinutes();
                          if (currentMins < earliestOpenMins) {
                            conceptualDay.setDate(conceptualDay.getDate() - 1);
                          }
                          const yyyy = conceptualDay.getFullYear();
                          const mm = String(conceptualDay.getMonth() + 1).padStart(2, '0');
                          const dd = String(conceptualDay.getDate()).padStart(2, '0');
                          const recordDateStr = `${yyyy}-${mm}-${dd}`;

                          if (recordDateStr === todayStr) {
                             hourlyCounts[date.getHours()]++;
                          }
                          
                          const weekIndex = thisWeekStrs.indexOf(recordDateStr);
                          if (weekIndex !== -1) {
                             dailyCounts[weekIndex]++;
                          }
                        }
                      });
                      
                      const chartData = [];
                      for (let h = 6; h <= 21; h++) {
                        const formatHour = (hr: number) => {
                          if (hr === 0) return "12 AM";
                          if (hr === 12) return "12 PM";
                          return hr > 12 ? `${hr - 12} PM` : `${hr} AM`;
                        };
                        chartData.push({
                          label: `${formatHour(h)} - ${formatHour((h + 1) % 24)}`,
                          shortLabel: formatHour(h).replace(' ', ''),
                          count: hourlyCounts[h],
                          rawHour: h,
                        });
                      }
                      
                      const maxRealCount = Math.max(...chartData.map((d) => d.count));
                      const maxCount = Math.max(maxRealCount, 1);
                      const minCount = Math.min(...chartData.map((d) => d.count));
                      const peakHourObj = chartData.find((d) => d.count === maxRealCount);
                      const lowHourObj = chartData.find((d) => d.count === minCount);

                      const maxDailyReal = Math.max(...dailyCounts);
                      const maxDaily = Math.max(maxDailyReal, 1);

                      return (
                        <div className="flex flex-col h-full mt-2">
                          <div className="flex flex-col bg-white/[0.02] rounded-sm p-4 border border-white/[0.03]">
                            
                            <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
                              <div>
                                <div className="text-xs text-zinc-100 font-bold uppercase tracking-wider mb-1">
                                  Peak Attendance — {chartTimeframe === "today" ? "Today" : "This Week"}
                                </div>
                                <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">
                                  Local gym time // ASIA/KOLKATA
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                {/* Toggle Control */}
                                <div className="flex border border-zinc-800 rounded-sm overflow-hidden p-0.5 bg-black/40">
                                  <button
                                    onClick={() => setChartTimeframe("today")}
                                    className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-all rounded-sm ${
                                      chartTimeframe === "today" 
                                      ? "bg-zinc-800 text-zinc-100" 
                                      : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                                  >
                                    Today
                                  </button>
                                  <button
                                    onClick={() => setChartTimeframe("week")}
                                    className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-all rounded-sm ${
                                      chartTimeframe === "week" 
                                      ? "bg-zinc-800 text-zinc-100" 
                                      : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                                  >
                                    This Week
                                  </button>
                                </div>
                                {chartTimeframe === "today" && (
                                  <span className="text-[10px] text-[#EEFF00] font-mono flex items-center gap-1.5 border border-[#EEFF00]/20 px-2 py-1 rounded-sm bg-[#EEFF00]/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#EEFF00]" /> LIVE
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {chartTimeframe === "today" ? (
                              <div className="flex flex-col flex-1 h-[200px] animate-in fade-in duration-300">
                                <div className="flex items-end gap-1 flex-1 min-h-[160px] pb-2">
                                  {chartData.map((item, i) => {
                                    const heightPct = (item.count / maxCount) * 100;
                                    const isActive = item.count === maxRealCount && maxRealCount > 0;
                                    return (
                                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group cursor-default relative">
                                        <span className="absolute bottom-full mb-1 scale-0 group-hover:scale-100 transition-all duration-100 px-2 py-0.5 bg-[#EEFF00] text-black font-bold font-mono text-[9px] rounded-sm shadow-[0_0_10px_rgba(238,255,0,0.3)] z-10 whitespace-nowrap">
                                          {item.count} members
                                        </span>
                                        <div
                                          style={{ height: `${Math.max(heightPct, 2)}%` }}
                                          className={`w-full rounded-t-[2px] transition-all duration-300 ${isActive ? "bg-gradient-to-b from-[#EEFF00] to-[#EEFF00]/10" : "bg-white/10"}`}
                                        />
                                        <div className={`text-[9px] mt-2 font-mono ${isActive ? "text-[#EEFF00]" : "text-zinc-500"} hidden sm:block`}>
                                          {item.shortLabel.replace(/AM|PM/, '')}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between border-t border-dashed border-white/10 pt-3 mt-2 h-auto text-[9px] font-mono uppercase text-zinc-500 gap-2">
                                  <div className="flex items-center gap-1.5 text-[#EEFF00]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#EEFF00]" />
                                    PEAK STRENGTH: {maxRealCount} MEMBERS ({peakHourObj?.label})
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                    LOW STRENGTH: {minCount} MEMBERS ({lowHourObj?.label})
                                  </div>
                                </div>
                              </div>
                            ) : (
                                <div className="flex flex-col flex-1 h-[200px] animate-in fade-in duration-300">
                                  <div className="flex items-end gap-2 sm:gap-3 flex-1 min-h-[160px] pb-2">
                                    {dailyCounts.map((count, i) => {
                                      const heightPct = (count / maxDaily) * 100;
                                      const isPeak = count === maxDailyReal && maxDailyReal > 0;
                                      const isCurrentDayIndex = i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
                                      const isHighlight = isCurrentDayIndex || isPeak;
                                      return (
                                        <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-default">
                                          <span className="absolute bottom-full mb-1 scale-0 group-hover:scale-100 transition-all duration-100 px-2 py-0.5 bg-emerald-400 text-black font-bold font-mono text-[9px] rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] z-10 whitespace-nowrap">
                                            {count} members
                                          </span>
                                          <div
                                            style={{ height: `${Math.max(heightPct, 2)}%` }}
                                            className={`w-full max-w-[40px] rounded-t-[2px] transition-all duration-300 relative ${isHighlight ? "bg-gradient-to-b from-emerald-500 to-emerald-500/10" : "bg-white/10"}`}
                                          >
                                            {isHighlight && <div className="absolute -top-4 w-full text-center text-[10px] text-emerald-400 font-bold">{count}</div>}
                                          </div>
                                          <div className={`text-[10px] mt-2 font-mono ${isHighlight ? "text-emerald-400 font-bold" : "text-zinc-500"}`}>
                                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div className="flex flex-col sm:flex-row justify-between border-t border-dashed border-white/10 pt-3 mt-2 h-auto text-[9px] font-mono uppercase text-zinc-500 gap-2">
                                    <div className="flex items-center gap-1.5 text-emerald-400">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      PEAK DAY: {maxDailyReal} MEMBERS ({["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dailyCounts.findIndex(c => c === maxDailyReal)] || 'None'})
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                      LOWEST DAY: {Math.min(...dailyCounts)} MEMBERS ({["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dailyCounts.findIndex(c => c === Math.min(...dailyCounts))] || 'None'})
                                    </div>
                                  </div>
                                </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Operational Settings panel */}
                  <div className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
                        <Sparkles className="w-4 h-4 text-[#EEFF00] animate-pulse" />
                        Quick Admin Actions
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                        Instant control functions directly in browser state
                      </p>

                      <div className="mt-4 space-y-2.5">
                        <button
                          onClick={() => setShowAddMemberModal(true)}
                          className="w-full text-left p-3 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-[#EEFF00]/50 hover:bg-zinc-800 text-xs font-mono tracking-tight text-zinc-100 transition flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Plus className="w-4 h-4 text-[#EEFF00]" />
                            ADD_GYM_MEMBER
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                        </button>

                        <button
                          onClick={() => {
                            setViewMode("member_device");
                            playSynthChime(800, "sine", 0.1);
                          }}
                          className="w-full text-left p-3 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-[#EEFF00]/50 hover:bg-zinc-800 text-xs font-mono tracking-tight text-zinc-100 transition flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <QrCode className="w-4 h-4 text-[#EEFF00]" />
                            SCAN_STATIC_QR
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                        </button>

                        <button
                          onClick={() => setShowAddPlanModal(true)}
                          className="w-full text-left p-3 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-[#EEFF00]/50 hover:bg-zinc-800 text-xs font-mono tracking-tight text-zinc-100 transition flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-[#EEFF00]" />
                            ADD_MEMBERSHIP_PKG
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 mt-4 flex items-center justify-between">
                      <div className="text-[10px] text-zinc-500 font-mono uppercase">
                        Sandbox state:
                      </div>
                      <button
                        onClick={handleResetSimulatorData}
                        className="text-[10px] font-semibold text-red-500 hover:text-red-400 transition flex items-center gap-1 cursor-pointer font-mono bg-red-400/10 px-2 py-1 rounded-sm border border-red-500/20"
                      >
                        <RotateCcw className="w-3 h-3" />
                        WIPE_DB_STATE
                      </button>
                    </div>
                  </div>
                </div>

                {/* Today's Roster / Live Feed */}
                <div className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-5">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                    <div>
                      <h3 className="font-semibold text-sm text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
                        <Clock className="w-4 h-4 text-[#EEFF00]" />
                        Today's Roster
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                        Logs reset daily at next open time. Showing who checked in today.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                       <select 
                         value={rosterFilter}
                         onChange={(e) => setRosterFilter(e.target.value as "all" | "present" | "absent" | "currently")}
                         className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono uppercase px-2 py-1 rounded-sm focus:outline-none focus:border-[#EEFF00]/50"
                       >
                         <option value="all">Filter: All ({rosterCounts.all})</option>
                         <option value="present">Filter: Present Today ({rosterCounts.present})</option>
                         <option value="currently">Filter: Currently at Gym ({rosterCounts.currently})</option>
                         <option value="absent">Filter: Absent ({rosterCounts.absent})</option>
                       </select>
                       <span className="text-[10px] bg-[#EEFF00]/10 text-[#EEFF00] font-mono px-2 py-1 rounded-sm font-semibold border border-[#EEFF00]/20">
                         ● LIVE_DATA
                       </span>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {(() => {
                      const todayStr = getConceptualTodayStr();

                      const sortedMembers = [...members].sort((a, b) => {
                        const aLog = attendance.find(log => log.memberId === a.id && log.checkedInAt.startsWith(todayStr) && log.status === "success");
                        const bLog = attendance.find(log => log.memberId === b.id && log.checkedInAt.startsWith(todayStr) && log.status === "success");
                        if (aLog && bLog) return new Date(bLog.checkedInAt).getTime() - new Date(aLog.checkedInAt).getTime();
                        if (aLog) return -1;
                        if (bLog) return 1;
                        return a.name.localeCompare(b.name);
                      });

                      const filteredMembers = sortedMembers.filter(member => {
                         const todaysLog = attendance.find(log => log.memberId === member.id && log.checkedInAt.startsWith(todayStr) && log.status === "success");
                         const isPresentToday = !!todaysLog;
                         const checkInTime = todaysLog ? new Date(todaysLog.checkedInAt) : null;
                         const checkoutTime = todaysLog?.checkedOutAt ? new Date(todaysLog.checkedOutAt) : checkInTime ? new Date(checkInTime.getTime() + 90 * 60 * 1000) : null;
                         const isCurrentlyInGym = checkoutTime ? new Date() < checkoutTime : false;
                         
                         if (rosterFilter === "present" && !isPresentToday) return false;
                         if (rosterFilter === "absent" && isPresentToday) return false;
                         if (rosterFilter === "currently" && !isCurrentlyInGym) return false;
                         return true;
                      });

                      return filteredMembers.map((member) => {
                        const todaysLog = attendance.find(log => log.memberId === member.id && log.checkedInAt.startsWith(todayStr) && log.status === "success");
                        const checkInTime = todaysLog ? new Date(todaysLog.checkedInAt) : null;
                        const checkoutTime = todaysLog?.checkedOutAt ? new Date(todaysLog.checkedOutAt) : checkInTime ? new Date(checkInTime.getTime() + 90 * 60 * 1000) : null;
                        const isCurrentlyInGym = checkoutTime ? new Date() < checkoutTime : false;
                        const isPresentToday = !!todaysLog;

                        return (
                          <div
                            key={member.id}
                            onClick={() => {
                              setSelectedMemberId(member.id);
                              setOwnerSubTab("members");
                              playSynthChime(650, "sine", 0.05);
                            }}
                            className={`group flex items-center justify-between p-3 rounded-sm border transition cursor-pointer ${isPresentToday ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700" : "bg-[#0A0A0B] border-zinc-800/50 opacity-60 hover:opacity-100 hover:border-zinc-700"}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={member.photoUrl}
                                  alt=""
                                  referrerPolicy="no-referrer"
                                  className={`w-10 h-10 rounded-sm object-cover border ${isCurrentlyInGym ? "border-[#EEFF00] ring-1 ring-[#EEFF00]/30" : isPresentToday ? "border-zinc-700" : "border-zinc-800 opacity-40 grayscale filter"}`}
                                />
                                {isCurrentlyInGym && (
                                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#EEFF00] rounded-full animate-pulse shadow-[0_0_10px_#EEFF00]"></div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-zinc-100 uppercase tracking-tight">
                                    {member.name}
                                  </span>
                                  {isPresentToday ? (
                                    <span className="text-[8px] bg-[#EEFF00]/10 text-[#EEFF00] font-mono px-1.5 py-0.5 rounded-sm uppercase tracking-wider border border-[#EEFF00]/20">
                                      PRESENT
                                    </span>
                                  ) : (
                                    <span className="text-[8px] bg-red-500/10 text-red-500 font-mono px-1.5 py-0.5 rounded-sm uppercase tracking-wider border border-red-500/20">
                                      ABSENT
                                    </span>
                                  )}
                                </div>
                                {isPresentToday && checkInTime ? (
                                  <p className="text-[9px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wide">
                                    IN: {checkInTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    {checkoutTime && ` | OUT: ${checkoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                                  </p>
                                ) : (
                                  <p className="text-[9px] text-zinc-600 font-mono mt-0.5 uppercase tracking-wide">
                                    NOT SCANNED IN LOGS
                                  </p>
                                )}
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 text-zinc-600 hidden sm:block transition-colors group-hover:text-zinc-300`} />
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* B. Members Directory Subtab */}
            {ownerSubTab === "members" && (
              <div className="space-y-4">
                {/* Search Bar / Filter Tabs */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0C0C0D] p-3 rounded-sm border border-zinc-800">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="SEARCH_DB..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm py-2 pl-9 pr-4 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#EEFF00]/50 transition-colors uppercase tracking-tight"
                    />
                  </div>

                  <div className="flex gap-1 items-center bg-zinc-900 border border-zinc-800 p-1 rounded-sm">
                    {(
                      [
                        "ALL",
                        MembershipStatus.ACTIVE,
                        MembershipStatus.EXPIRED,
                        MembershipStatus.FROZEN,
                      ] as const
                    ).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setMemberFilter(filter)}
                        className={`px-3 py-1.5 rounded-sm text-[10px] font-mono tracking-wider transition leading-none cursor-pointer border ${
                          memberFilter === filter
                            ? "bg-[#EEFF00] text-black font-semibold border-transparent shadow-[0_0_10px_rgba(238,255,0,0.2)]"
                            : "bg-transparent text-zinc-500 hover:text-zinc-300 border-transparent hover:border-zinc-700"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Members list and detail layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Interactive List */}
                  <div className="lg:col-span-2 space-y-2">
                    {filteredMembers.length === 0 ? (
                      <div className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-8 text-center text-zinc-500 text-xs font-mono uppercase tracking-widest">
                        NO_RECORDS_FOUND
                      </div>
                    ) : (
                      filteredMembers.map((m) => {
                        const daysRemaining = Math.ceil(
                          (new Date(m.expirationDate).getTime() -
                            new Date().getTime()) /
                            86400000,
                        );
                        const isExpired =
                          daysRemaining < 0 ||
                          m.status === MembershipStatus.EXPIRED;
                        return (
                          <div
                            key={m.id}
                            onClick={() => {
                              setSelectedMemberId(m.id);
                              playSynthChime(500, "sine", 0.05);
                            }}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-sm transition cursor-pointer border ${
                              selectedMemberId === m.id
                                ? "bg-zinc-800 border-[#EEFF00]/30 shadow-[0_0_10px_rgba(238,255,0,0.05)] text-zinc-100"
                                : "bg-[#0C0C0D] hover:bg-zinc-900 border-zinc-800 text-zinc-400"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={m.photoUrl}
                                alt={m.name}
                                referrerPolicy="no-referrer"
                                className={`w-11 h-11 rounded-sm object-cover border ${selectedMemberId === m.id ? "border-[#EEFF00]/50" : "border-zinc-800 grayscale filter"}`}
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-tight">
                                    {m.name}
                                  </h4>
                                  <span
                                    className={`text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-sm border ${
                                      m.status === MembershipStatus.ACTIVE
                                        ? "bg-[#EEFF00]/10 text-[#EEFF00] border-[#EEFF00]/20"
                                        : m.status === MembershipStatus.FROZEN
                                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                          : "bg-red-500/10 text-red-500 border-red-500/20"
                                    }`}
                                  >
                                    {m.status}
                                  </span>
                                </div>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">
                                  {m.phone} | JOINED: {m.joinedAt}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-start gap-4">
                              <div className="text-right">
                                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block">
                                  TIME_REMAINING
                                </span>
                                <span
                                  className={`text-xs font-mono tracking-tight ${isExpired ? "text-red-500" : "text-zinc-100"}`}
                                >
                                  {isExpired
                                    ? "EXPIRED"
                                    : `${daysRemaining} DAYS`}
                                </span>
                              </div>
                              <ChevronRight className={`w-4 h-4 ${selectedMemberId === m.id ? "text-[#EEFF00]" : "text-zinc-600"} hidden sm:block transition-colors`} />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Mobile Blur Overlay */}
                  {selectedMember && (
                    <div 
                      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
                      onClick={() => setSelectedMemberId(null)}
                    />
                  )}

                  {/* Right: Dossier / Context Panel */}
                  <div className={`
                    text-zinc-300 transition-all duration-300
                    ${selectedMember 
                      ? "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] max-h-[85vh] overflow-y-auto bg-[#0C0C0D] border border-zinc-800 p-5 shadow-2xl rounded-sm " + 
                        "lg:relative lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:z-auto lg:w-auto lg:max-h-none lg:overflow-visible lg:shadow-none lg:block" 
                      : "hidden lg:block lg:border lg:border-zinc-800 lg:rounded-sm lg:h-fit bg-[#0C0C0D] p-5"}
                  `}>
                    {selectedMember ? (
                      <div className="space-y-5 relative mt-4 lg:mt-0 pb-12 lg:pb-0">
                        <button 
                          className="lg:hidden absolute -top-4 -right-2 z-10 text-zinc-400 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 p-2 rounded-full transition-colors" 
                          onClick={() => setSelectedMemberId(null)}
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-4 border-b border-zinc-800 pb-4 pr-10 lg:pr-0">
                          <img
                            src={selectedMember.photoUrl}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-sm object-cover border border-zinc-700 grayscale filter"
                          />
                          <div>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-[#EEFF00]">
                              TARGET_DOSSIER
                            </span>
                            <h3 className="font-semibold text-lg text-zinc-100 mt-0.5 uppercase tracking-tight">
                              {selectedMember.name}
                            </h3>
                            <p className="text-[10px] text-zinc-500 font-mono">
                              {selectedMember.email}
                            </p>
                          </div>
                        </div>

                        {/* Info details */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-zinc-900/50 p-2.5 rounded-sm border border-zinc-800">
                            <span className="text-[9px] text-zinc-500 uppercase font-mono block">
                              PKG_ASSIGNED
                            </span>
                            <span className="font-semibold text-zinc-100 mt-1 block">
                              {plans.find((p) => p.id === selectedMember.planId)
                                ?.name || "N/A Plan"}
                            </span>
                          </div>
                          <div className="bg-zinc-900/50 p-2.5 rounded-sm border border-zinc-800">
                            <span className="text-[9px] text-zinc-500 uppercase font-mono block">
                              EXPIRATION
                            </span>
                            <span className="font-semibold text-zinc-100 mt-1 block font-mono">
                              {selectedMember.expirationDate}
                            </span>
                          </div>
                          <div
                            className="bg-zinc-900/50 p-2.5 rounded-sm border border-zinc-800 hover:border-[#EEFF00]/50 hover:bg-[#EEFF00]/10 cursor-pointer transition relative group"
                            onClick={() =>
                              setShowScanHistoryModal(selectedMember.id)
                            }
                          >
                            <span className="text-[9px] text-zinc-500 uppercase font-mono block group-hover:text-[#EEFF00] transition">
                              SCANS_STREAK
                            </span>
                            <span className="font-semibold text-zinc-100 mt-1 block font-mono group-hover:text-[#EEFF00] transition">
                              {
                                attendance.filter(
                                  (a) =>
                                    a.memberId === selectedMember.id &&
                                    a.status === "success",
                                ).length
                              }{" "}
                              VISITS{" "}
                              <span className="text-[10px] ml-1 underline opacity-0 group-hover:opacity-100 transition absolute right-2 bottom-2 font-sans tracking-tight">
                                LOG
                              </span>
                            </span>
                          </div>
                          <div className="bg-zinc-900/50 p-2.5 rounded-sm border border-zinc-800">
                            <span className="text-[9px] text-zinc-500 uppercase font-mono block">
                              EMERGENCY_CTC
                            </span>
                            <span className="font-semibold text-zinc-100 mt-1 block text-[10px] truncate">
                              {selectedMember.emergencyContact}
                            </span>
                          </div>
                        </div>

                        {/* Safe device count list linked */}
                        <div className="border-t border-zinc-800 pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-tight">
                              <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                              LINKED_AUTHENTICATORS
                            </h4>
                            <span className="text-[9px] font-mono bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded-sm border border-purple-500/20">
                              LIMIT_2
                            </span>
                          </div>

                          {memberDevices.filter(
                            (d) =>
                              d.memberId === selectedMember.id && d.isActive,
                          ).length === 0 ? (
                            <p className="text-[10px] text-zinc-600 font-mono italic">
                              NO_DEVICES_FOUND
                            </p>
                          ) : (
                            <div className="space-y-1.5">
                              {memberDevices
                                .filter(
                                  (d) =>
                                    d.memberId === selectedMember.id &&
                                    d.isActive,
                                )
                                .map((d) => (
                                  <div
                                    key={d.id}
                                    className="flex items-center justify-between bg-zinc-900 px-2 py-1.5 rounded-sm font-mono text-[9px] text-zinc-500"
                                  >
                                    <span>[APP] {d.label}</span>
                                    <span className="text-purple-400">
                                      ACTIVE_TOKEN
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>

                        {/* Interactive Management Controls (Freeze/Extend/Revoke) */}
                        <div className="border-t border-zinc-800 pt-4 space-y-2">
                          <h4 className="text-xs font-semibold text-zinc-100 mb-2 uppercase tracking-tight">
                            SYSTEM_OVERRIDE_CONTROLS
                          </h4>

                          <div className="grid grid-cols-2 gap-2">
                            {/* Freeze toggle */}
                            <button
                              onClick={() =>
                                handleFreezeToggle(selectedMember.id)
                              }
                              className={`px-3 py-2 rounded-sm text-[10px] font-mono uppercase tracking-widest text-center transition cursor-pointer flex items-center justify-center gap-1.5 border ${
                                selectedMember.status ===
                                MembershipStatus.FROZEN
                                  ? "bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30"
                                  : "bg-transparent text-amber-500 border-amber-500/20 hover:border-amber-500/50"
                              }`}
                            >
                              <History className="w-3.5 h-3.5" />
                              {selectedMember.status === MembershipStatus.FROZEN
                                ? "UNFREEZE (MATH_SYNC)"
                                : "FREEZE_ACCOUNT"}
                            </button>

                            {/* Reset devices button */}
                            <button
                              onClick={() =>
                                handleResetDevicesAction(selectedMember.id)
                              }
                              className="px-3 py-2 rounded-sm text-[10px] font-mono uppercase tracking-widest text-center transition cursor-pointer bg-transparent border border-red-500/20 text-red-500 hover:border-red-500/50 hover:bg-red-500/10 flex items-center justify-center gap-1.5"
                            >
                              <UserX className="w-3.5 h-3.5" />
                              REVOKE_TOKENS
                            </button>
                          </div>

                          {/* Admin Manual Check-In */}
                          <div className="flex flex-col gap-2 pt-2">
                            <button
                              onClick={() =>
                                handleAdminManualCheckIn(selectedMember.id)
                              }
                              className="px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-widest text-black font-semibold text-center transition cursor-pointer bg-[#EEFF00] hover:bg-[#D4E600] flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(238,255,0,0.1)]"
                            >
                              <Check className="w-4 h-4" />
                              FORCE_LOG_ENTRY
                            </button>
                            {adminCheckInMsg && (
                              <div
                                className={`text-center text-[10px] font-mono p-1.5 rounded-sm border ${adminCheckInMsg.includes("Successful") ? "text-[#EEFF00] bg-[#EEFF00]/10 border-[#EEFF00]/20" : "text-red-500 bg-red-500/10 border-red-500/20"}`}
                              >
                                {adminCheckInMsg}
                              </div>
                            )}
                          </div>

                          {/* Quick Extension Renewal */}
                          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm space-y-2.5 mt-2">
                            <span className="text-[9px] font-mono tracking-widest text-zinc-500 block uppercase">
                              FAST_RENEWAL_MODULE
                            </span>
                            <div className="flex flex-col gap-1.5">
                              {plans.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() =>
                                    handleRenewMember(
                                      selectedMember.id,
                                      p.id,
                                      "UPI",
                                    )
                                  }
                                  className="w-full text-left px-2.5 py-2 rounded-sm bg-zinc-900 border border-zinc-700 hover:border-[#EEFF00]/50 hover:bg-[#EEFF00]/5 text-[11px] text-zinc-400 hover:text-zinc-100 transition flex items-center justify-between cursor-pointer"
                                >
                                  <span className="font-mono uppercase tracking-tight">
                                    {p.name} (₹{p.price})
                                  </span>
                                  <span className="text-[#EEFF00] font-mono text-[9px] tracking-widest uppercase">
                                    ADD +{p.durationDays}D
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center py-20 text-zinc-600">
                        <Users className="w-12 h-12 text-[#EEFF00]/20 stroke-1 mb-4 flex-shrink-0" />
                        <p className="text-xs font-mono uppercase tracking-widest">
                          AWAITING_SELECTION
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* C. Plans Management Subtab */}
            {ownerSubTab === "plans" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-100 uppercase tracking-widest">
                      SYSTEM_CATALOG
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase">
                      Packages scoped manually to domain namespace
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddPlanModal(true)}
                    className="bg-[#EEFF00] text-black px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-[#D4E600] transition cursor-pointer shadow-[0_0_10px_rgba(238,255,0,0.1)]"
                  >
                    <Plus className="w-4 h-4" />
                    NEW_PACKAGE
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((p) => {
                    const memberCountOnThisPlan =
                      activePlansCountMap[p.id] || 0;
                    return (
                      <div
                        key={p.id}
                        className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-5 flex flex-col justify-between hover:border-[#EEFF00]/50 transition-colors group"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono tracking-widest text-[#EEFF00] bg-[#EEFF00]/10 px-2 py-0.5 rounded-sm border border-[#EEFF00]/20 uppercase">
                              SCOPED_ACTIVE
                            </span>
                            <span className="text-[10px] font-mono tracking-wide text-zinc-500 uppercase">
                              {p.durationDays}D DURATION
                            </span>
                          </div>
                          <h4 className="font-semibold text-lg text-zinc-100 mt-4 uppercase tracking-tight group-hover:text-[#EEFF00] transition-colors">
                            {p.name}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-2 leading-relaxed tracking-wide">
                            {p.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-800 mt-6 flex items-end justify-between">
                          <div>
                            <span className="text-[9px] font-mono text-zinc-600 block uppercase tracking-widest">
                              ADMISSION_FEE
                            </span>
                            <span className="text-xl font-mono tracking-tight text-zinc-100 block mt-1">
                              ₹{p.price}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-mono text-zinc-600 block uppercase tracking-widest">
                              ENROLLED_SUBS
                            </span>
                            <button
                              onClick={() => setShowPlanMembersModal(p.id)}
                              className="text-sm font-semibold text-zinc-300 font-mono block mt-1 hover:text-[#EEFF00] hover:underline transition-colors text-right cursor-pointer"
                            >
                              {memberCountOnThisPlan} ACTIVE
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* D. Payments Ledger Subtab */}
            {ownerSubTab === "payments" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-100 uppercase tracking-widest">
                      FINANCIAL_LEDGER
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase">
                      Audit log matching exact bank entries scoped per-gymId
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      playSynthChime(600, "sine", 0.05);
                      alert(
                        "Simulating excel export. Copied ledger CSV string to clipboard!",
                      );
                    }}
                    className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-100 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest transition cursor-pointer text-zinc-400"
                  >
                    EXPORT_CSV_RECEIPTS
                  </button>
                </div>

                <div className="bg-[#0C0C0D] border border-zinc-800 rounded-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900/50 border-b border-zinc-800 font-mono text-zinc-500 text-[10px] uppercase tracking-wider">
                          <th className="p-3.5">REF_RECORD</th>
                          <th className="p-3.5">MEMBER_NAME</th>
                          <th className="p-3.5">PACKAGE/METHOD</th>
                          <th className="p-3.5">AMOUNT_SCORED</th>
                          <th className="p-3.5">PAID_AT</th>
                          <th className="p-3.5">NOTES</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 text-zinc-400 font-mono">
                        {payments.map((p) => (
                          <tr
                            key={p.id}
                            className="hover:bg-zinc-900 transition-colors"
                          >
                            <td className="p-3.5 text-zinc-600 text-[11px] font-mono whitespace-nowrap">
                              {p.id}
                            </td>
                            <td className="p-3.5 font-sans font-semibold text-zinc-200">
                              {p.memberName}
                            </td>
                            <td className="p-3.5">
                              <span className="font-medium text-[11px] text-[#EEFF00] bg-[#EEFF00]/10 px-2 py-0.5 rounded-sm border border-[#EEFF00]/20 tracking-wider">
                                {p.type}
                              </span>
                              <span className="ml-1.5 text-zinc-500 text-[11px] uppercase">
                                [{p.method}]
                              </span>
                            </td>
                            <td className="p-3.5 text-zinc-100 font-mono tracking-tight">
                              ₹{p.amount}
                            </td>
                            <td className="p-3.5 text-zinc-500 text-[11px] whitespace-nowrap">
                              {new Date(p.paidAt).toLocaleString()}
                            </td>
                            <td className="p-3.5 text-zinc-500 text-[11px] max-w-[200px] truncate uppercase">
                              {p.notes || "RECORDED"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* E. Audit Trails Subtab */}
            {ownerSubTab === "audit" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-zinc-800">
                  <h3 className="font-semibold text-sm text-zinc-100 uppercase tracking-widest">
                    TAMPER_EVIDENT_SYSTEM_LOG
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase">
                    Audit log monitoring intercepting mutating calls (Security
                    Issue 12 Resolved)
                  </p>
                </div>

                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="bg-[#0C0C0D] p-4 rounded-sm border border-zinc-800 font-mono text-xs text-zinc-400 hover:border-zinc-700 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-900 pb-2 mb-2 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-zinc-600">
                            [{log.id}]
                          </span>
                          <span className="font-semibold text-red-500 uppercase tracking-widest bg-red-500/10 px-1 border border-red-500/20 rounded-sm">
                            {log.action}
                          </span>
                          <span className="text-zinc-500 uppercase">
                            ON {log.entity} #{log.entityId}
                          </span>
                        </div>
                        <span className="text-zinc-600 text-[11px]">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1.5 text-[11px] text-zinc-500 font-mono">
                        {log.newValue && (
                          <div className="bg-zinc-900 p-2 rounded-sm border border-zinc-800">
                            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">
                              TX_PAYLOAD_VALUES
                            </span>
                            <pre className="overflow-x-auto whitespace-pre-wrap max-h-24 font-mono text-[10px] text-[#EEFF00] leading-normal">
                              {JSON.stringify(
                                JSON.parse(log.newValue),
                                null,
                                2,
                              )}
                            </pre>
                          </div>
                        )}
                        <div className="flex flex-col justify-between p-2 bg-zinc-900 rounded-sm border border-zinc-800">
                          <div>
                            <span className="text-[9px] font-mono tracking-widest text-[#EEFF00] uppercase block">
                              OPERATOR_SIG_ID
                            </span>
                            <span className="text-zinc-100 font-mono tracking-tight block mt-1">
                              {log.userId}
                            </span>
                          </div>
                          <div className="mt-2 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                            INGRESS_IP: {log.ipAddress}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- 2. MEMBERS CHECK-IN PWA SIMULATOR VIEW --- */}
        {/* --- 3. INFRASTRUCTURE MASTER BUILD PLAN VIEW (Polished version of user's HTML!) --- */}
        {activeTab === "steps" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex-1 min-w-[200px]">
                <h2 className="font-display font-medium text-xl text-slate-900">
                  Startup Master Engineering Build Plan
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Interlock code milestones checklist tracked directly inside
                  this interface.
                </p>
              </div>

              {/* Progress HUD */}
              <div className="bg-white/60 p-4 rounded-2xl border border-slate-200 flex items-center gap-4 min-w-[260px]">
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">
                      {roadmapPercentage}% Complete
                    </span>
                    <span className="font-mono text-slate-500">
                      {totalCheckedSteps}/{totalRoadmapSteps} steps
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${roadmapPercentage}%` }}
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    ></div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-display font-bold text-sm text-blue-700">
                  {totalCheckedSteps}
                </div>
              </div>
            </div>

            {/* Render phases layout */}
            <div className="space-y-8">
              {initialBuildPhases.map((phase) => {
                const phaseCheckedCount = phase.steps.filter(
                  (_, idx) => completedSteps[`${phase.id}-${idx}`],
                ).length;
                const phaseDone = phaseCheckedCount === phase.steps.length;

                return (
                  <div
                    key={phase.id}
                    className="bg-white/10 border border-slate-200 rounded-3xl p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                            phaseDone
                              ? "bg-blue-600 text-slate-900 shadow"
                              : "bg-white text-blue-700 border border-slate-200"
                          }`}
                        >
                          {phase.id + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display font-medium text-[15px] text-slate-900">
                              {phase.title}
                            </h3>
                            <span className="text-[10px] text-slate-500 font-mono">
                              [{phase.label}]
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {phase.desc}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex items-center sm:block gap-2">
                        <span className="text-[10.5px] font-mono text-slate-500 bg-white/60 px-2 py-0.5 rounded block">
                          {phase.days}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                          ({phaseCheckedCount} of {phase.steps.length} solved)
                        </span>
                      </div>
                    </div>

                    {/* Step list items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {phase.steps.map((step, idx) => {
                        const stepKey = `${phase.id}-${idx}`;
                        const isDone = completedSteps[stepKey];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleStepCompleted(phase.id, idx)}
                            className={`p-3.5 rounded-2xl border transition cursor-pointer flex gap-3 items-start group ${
                              isDone
                                ? "bg-blue-600/5 border-blue-100 text-slate-600 hover:border-blue-600/40"
                                : "bg-white/30 border-slate-200 hover:border-slate-200 text-slate-500"
                            }`}
                          >
                            <div
                              className={`mt-0.5 w-4.5 h-4.5 rounded flex items-center justify-center border transition ${
                                isDone
                                  ? "bg-blue-600 border-blue-600 text-slate-900"
                                  : "bg-slate-50 border-slate-200 group-hover:border-slate-300"
                              }`}
                            >
                              {isDone && (
                                <Check className="w-3 h-3 font-bold stroke-[3]" />
                              )}
                            </div>

                            <div className="flex-1 space-y-1">
                              <h4
                                className={`text-xs font-semibold leading-snug transition-colors ${isDone ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}
                              >
                                {step.title}
                              </h4>
                              <p className="text-[11px] text-slate-500/90 leading-normal">
                                {step.desc}
                              </p>

                              <div className="flex flex-wrap gap-1 pt-1.5">
                                {step.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`text-[8.5px] font-mono uppercase tracking-wider font-bold px-1.5 py-0.2 rounded-md ${
                                      tag === "fe"
                                        ? "bg-slate-200/10 text-amber-400 border border-slate-200/20"
                                        : tag === "be"
                                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                                          : tag === "db"
                                            ? "bg-blue-500/10 text-indigo-400 border border-indigo-505/20"
                                            : "bg-white text-slate-500"
                                    }`}
                                  >
                                    {tag === "fe"
                                      ? "Frontend"
                                      : tag === "be"
                                        ? "Backend"
                                        : tag === "db"
                                          ? "Prisma Db"
                                          : tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- 4. ARCHITECTURAL AUDIT VIEW SECTION --- */}
        {activeTab === "issues" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="font-display font-medium text-xl text-slate-900">
                Full Architectural Assessment &amp; Security Auditing
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                We assessed the draft architecture against production-readiness
                guidelines. Here are 11 issues highlighted and our mathematical
                adjustments implemented in this mockup.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {staticArchitecturalIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="bg-white/20 border border-slate-200 p-5 rounded-2xl flex gap-4 items-start hover:border-slate-200 transition"
                >
                  <div
                    className={`mt-0.5 p-1 rounded-md ${issue.severity === "Critical" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-slate-200/10 text-amber-400 border border-slate-200/20"}`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-sm font-semibold text-slate-900 leading-normal">
                        {issue.title}
                      </h4>
                      <span
                        className={`text-[8.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded leading-none ${
                          issue.severity === "Critical"
                            ? "bg-red-500/20 text-red-400 border border-red-550/30"
                            : "bg-slate-200/10 text-amber-400 border border-amber-505/20"
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {issue.desc}
                    </p>

                    <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-blue-700 leading-relaxed">
                      <span className="font-bold text-slate-500 uppercase text-[9.5px] block tracking-wide mb-1">
                        Mockup Solution &amp; Fix
                      </span>
                      {issue.fix}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- EXPANDED MODAL: SCAN HISTORY --- */}
      <AnimatePresence>
        {showScanHistoryModal && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex justify-between items-center bg-slate-50 -mx-6 -mt-6 p-6 rounded-t-3xl border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200">
                    <History className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Scan History
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Attendance Records
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowScanHistoryModal(null)}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 rounded-full text-slate-500 hover:text-slate-900 transition shadow-sm cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pt-2">
                {attendance
                  .filter((a) => a.memberId === showScanHistoryModal)
                  .sort(
                    (a, b) =>
                      new Date(b.checkedInAt).getTime() -
                      new Date(a.checkedInAt).getTime(),
                  )
                  .map((record) => (
                    <div
                      key={record.id}
                      className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex flex-col gap-1 hover:border-blue-200 transition"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-900">
                          {new Date(record.checkedInAt).toLocaleDateString(
                            undefined,
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${record.status === "success" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}
                        >
                          {record.status === "success"
                            ? "Valid Check-In"
                            : record.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        Time:{" "}
                        {new Date(record.checkedInAt).toLocaleTimeString(
                          undefined,
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-200/50 flex items-center justify-between">
                        <span>Source: {record.source}</span>
                        <span>ID: {record.id}</span>
                      </div>
                    </div>
                  ))}
                {attendance.filter((a) => a.memberId === showScanHistoryModal)
                  .length === 0 && (
                  <div className="py-8 text-center text-slate-500 text-sm">
                    No scan history available for this member yet.
                  </div>
                )}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setShowScanHistoryModal(null)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Close History
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD EXPANDED MODAL: NEW MEMBER FORM --- */}
      <AnimatePresence>
        {showAddMemberModal && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h3 className="font-display font-medium text-sm text-slate-900 uppercase tracking-wider">
                  Add New Subscription Member
                </h3>
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleCreateMember}
                className="space-y-4 text-xs font-mono"
              >
                <div className="space-y-1.5">
                  <label className="text-slate-500 block">
                    Full Name (Required)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Roy"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-600 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 block">
                    WhatsApp Active Phone (Required)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9876543210 (10-digit Indian No)"
                    value={newMemberPhone}
                    onChange={(e) => setNewMemberPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-600 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 block">
                    E-mail Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="r@example.com"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-600 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 block">
                    Select Gym Duration Package
                  </label>
                  <select
                    value={newMemberPlan}
                    onChange={(e) => setNewMemberPlan(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₹{p.price} ({p.durationDays} days)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 block">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    value={newMemberJoinedDate}
                    onChange={(e) => setNewMemberJoinedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-600 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 block">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {newMemberPhoto ? (
                        <img
                          src={newMemberPhoto}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const img = new Image();
                              img.onload = () => {
                                const canvas = document.createElement("canvas");
                                const MAX_DIM = 256;
                                let w = img.width;
                                let h = img.height;
                                if (w > h) {
                                  if (w > MAX_DIM) {
                                    h *= MAX_DIM / w;
                                    w = MAX_DIM;
                                  }
                                } else {
                                  if (h > MAX_DIM) {
                                    w *= MAX_DIM / h;
                                    h = MAX_DIM;
                                  }
                                }
                                canvas.width = w;
                                canvas.height = h;
                                const ctx = canvas.getContext("2d");
                                ctx?.drawImage(img, 0, 0, w, h);
                                setNewMemberPhoto(
                                  canvas.toDataURL("image/jpeg", 0.7),
                                );
                              };
                              img.src = reader.result as string;
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition w-full justify-center"
                      >
                        <Camera className="w-4 h-4" />
                        Take Photo / Upload
                      </label>
                      <p className="text-[10px] text-slate-400 mt-1 text-center">
                        Capture instantly or select from gallery
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-600 text-slate-900 font-bold font-display cursor-pointer text-xs uppercase"
                  >
                    Confirm Member &amp; Admission Receipt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD EXPANDED MODAL: NEW PLAN PACKAGE FORM --- */}
      <AnimatePresence>
        {showAddPlanModal && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h3 className="font-display font-medium text-sm text-slate-900 uppercase tracking-wider">
                  Configure Gym Package Plan
                </h3>
                <button
                  onClick={() => setShowAddPlanModal(false)}
                  className="text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleCreatePlan}
                className="space-y-4 text-xs font-mono"
              >
                <div className="space-y-1.5">
                  <label className="text-slate-500 block">Package Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Quarterly Power Elite"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-600 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-slate-500 block">
                      Duration Days
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newPlanDuration}
                      onChange={(e) =>
                        setNewPlanDuration(Number(e.target.value))
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-500 block">
                      Price (INR ₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newPlanPrice}
                      onChange={(e) => setNewPlanPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 block">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Description of included gym sessions..."
                    value={newPlanDescription}
                    onChange={(e) => setNewPlanDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-600 focus:outline-none focus:border-blue-600 resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-teal-400 text-slate-900 font-bold font-display cursor-pointer text-xs uppercase"
                  >
                    Confirm Pricing Package
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* --- EXPANDED MODAL: VIEW PLAN MEMBERS --- */}
      <AnimatePresence>
        {showPlanMembersModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0C0C0D] border border-zinc-800 rounded-sm p-6 w-full max-w-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800 mb-3 shrink-0">
                <div>
                  <h3 className="font-semibold text-sm text-zinc-100 uppercase tracking-widest">
                    Plan Subscriptions
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    {plans.find((p) => p.id === showPlanMembersModal)?.name || "Unknown Plan"}
                  </p>
                </div>
                <button
                  onClick={() => setShowPlanMembersModal(null)}
                  className="text-zinc-500 hover:text-zinc-100 cursor-pointer p-2 bg-zinc-900 rounded-sm border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pt-2">
                {members
                  .filter((m) => m.planId === showPlanMembersModal)
                  .map((member) => (
                    <div
                      key={member.id}
                      onClick={() => {
                        setSelectedMemberId(member.id);
                        setOwnerSubTab("members");
                        setShowPlanMembersModal(null);
                        playSynthChime(650, "sine", 0.05);
                      }}
                      className="p-3 border border-zinc-800 rounded-sm bg-zinc-900/50 flex items-center gap-3 hover:border-[#EEFF00]/50 transition cursor-pointer"
                    >
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-sm object-cover border border-zinc-700 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-tight">
                            {member.name}
                          </h4>
                          <span
                            className={`text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-sm border ${
                              member.status === MembershipStatus.ACTIVE
                                ? "bg-[#EEFF00]/10 text-[#EEFF00] border-[#EEFF00]/20"
                                : member.status === MembershipStatus.FROZEN
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  : "bg-red-500/10 text-red-500 border-red-500/20"
                            }`}
                          >
                            {member.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  ))}
                {members.filter((m) => m.planId === showPlanMembersModal)
                  .length === 0 && (
                  <div className="py-8 text-center text-zinc-600 text-xs font-mono uppercase tracking-widest">
                    No active members enrolled in this package.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Advance Check In Requests Overlay --- */}
      <AnimatePresence>
        {viewMode !== "member_device" && advanceRequests.length > 0 && (
          <motion.div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
            {advanceRequests.map((req) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                key={req.id}
                className="bg-white border-2 border-amber-300 shadow-2xl rounded-2xl p-4 w-80 space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-100">
                  <div
                    className="h-full bg-amber-400"
                    style={{
                      width: "100%",
                      transition: "width 60s linear",
                    }}
                  />
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <div className="w-10 h-10 shrink-0">
                    {req.memberPhoto ? (
                      <img
                        src={req.memberPhoto}
                        alt={req.memberName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex justify-center items-center">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm font-display tracking-tight leading-tight mb-0.5">
                      Advance Request
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      <strong className="text-slate-800">
                        {req.memberName}
                      </strong>{" "}
                      requested check-in override.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const todayDate = getConceptualTodayStr();
                      const alreadyCheckedIn = attendance.some(
                        (a) =>
                          a.memberId === req.memberId &&
                          a.checkedInAt.startsWith(todayDate) &&
                          a.status === "success",
                      );

                      if (alreadyCheckedIn) {
                        alert("Member is already checked in today.");
                        setAdvanceRequests((prev) =>
                          prev.filter((r) => r.id !== req.id),
                        );
                        return;
                      }

                      const updatedMembers = members.map((m) => {
                        if (m.id === req.memberId) {
                          return {
                            ...m,
                            checkInStreak: m.checkInStreak + 1,
                            lastCheckIn: new Date().toISOString(),
                          };
                        }
                        return m;
                      });
                      setMembers(updatedMembers);

                      const checkInDate = new Date();
                      const checkOutDate = new Date(
                        checkInDate.getTime() + 90 * 60 * 1000,
                      );
                      const newRecord = {
                        id: "att-" + (attendance.length + 1),
                        memberId: req.memberId,
                        memberName: req.memberName,
                        memberPhoto: req.memberPhoto || "",
                        checkedInAt: checkInDate.toISOString(),
                        checkedOutAt: checkOutDate.toISOString(),
                        source: "ADMIN",
                        status: "success" as const,
                      };
                      setAttendance([newRecord, ...attendance]);
                      setAdvanceRequests((prev) =>
                        prev.filter((r) => r.id !== req.id),
                      );
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition shadow-sm cursor-pointer"
                  >
                    Log Present
                  </button>
                  <button
                    onClick={() => {
                      setAdvanceRequests((prev) =>
                        prev.filter((r) => r.id !== req.id),
                      );
                    }}
                    className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Visual Slate Modern Footer --- */}
      <footer className="border-t border-slate-200 bg-slate-50 py-4 px-4 text-center mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10.5px] text-slate-500 font-mono">
          <span>
            ⚡ Designed for Extreme low-bandwidth offline-first gym conditions.
          </span>
          <span>© 2026 GymFlex Inc. All Rights Reserved. Patna, Bihar.</span>
        </div>
      </footer>
    </div>
  );
}
