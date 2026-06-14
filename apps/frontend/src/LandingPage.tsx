import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import {
  Smartphone,
  ShieldAlert,
  WifiOff,
  Banknote,
  TrendingUp,
  ArrowRight,
  DatabaseZap,
  CheckCircle2,
} from "lucide-react";

const TEAL = "#2DD4BF";
const VIOLET = "#8B5CF6";

/* ─────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function GridCard({ feature, delay }: { feature: any; delay: number; key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      className="bg-[#111112] border border-zinc-800/50 p-6 sm:p-8 flex flex-col hover:border-zinc-700 transition-colors min-h-[200px]"
    >
      <div className="flex justify-between items-start mb-10 sm:mb-16">
        <span style={{ transform: "translateZ(20px)" }} className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
          {feature.subsystem}
        </span>
        <div style={{ transform: "translateZ(40px)" }} className="text-[#EEFF00]">
          <feature.icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-auto">
        <h3 style={{ transform: "translateZ(30px)" }} className="text-lg font-medium mb-3 text-zinc-100">
          {feature.title}
        </h3>
        <p style={{ transform: "translateZ(20px)" }} className="text-zinc-400 text-sm leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHONE FRAME — single source of truth for the chrome.
   Width drives everything. Height = width × (19/9) via aspect-ratio.
   All internal screens receive the frame's rendered size via a
   CSS custom property so they can use % or clamp() for fonts/spacing.
───────────────────────────────────────────── */
function PhoneFrame({
  children,
  widthClass = "w-[200px] sm:w-[230px] md:w-[260px] lg:w-[280px]",
}: {
  children: React.ReactNode;
  widthClass?: string;
}) {
  return (
    /* aspect-[9/19] gives the phone its height automatically */
    <div className={`relative ${widthClass} aspect-[9/19] mx-auto`}>
      {/* glow behind */}
      <div className="absolute inset-x-6 bottom-0 h-6 bg-[#0C0C0D]/80 blur-xl -z-10" />
      {/* bezel */}
      <div className="absolute inset-0 rounded-[2.2rem] border-[6px] border-zinc-800 shadow-2xl bg-[#0C0C0D] overflow-hidden ring-1 ring-white/5">
        {/* glass sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-30" />
        {/* notch */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[30%] h-[3.5%] bg-black rounded-full z-40 border border-zinc-800" />
        {/* screen content — fills full bezel interior */}
        <div className="absolute inset-0 font-sans">{children}</div>
      </div>
    </div>
  );
}

function PhoneScreenTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(4px)" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 w-full h-full"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHONE SCREENS
   All sizing uses % of container, clamp(), or Tailwind classes
   that are proportional — no fixed px that won't scale.
───────────────────────────────────────────── */

/** Screen 0 – QR scanner */
function ScanScreen() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-[8%] bg-[#0C0C0D]">
      {/* label */}
      <p className="text-[#EEFF00] font-mono uppercase tracking-widest mb-[6%]"
         style={{ fontSize: "clamp(7px, 2%, 11px)" }}>
        Auth Scanner
      </p>
      {/* QR box — 55% of phone width */}
      <div className="relative w-[55%] aspect-square border-2 border-zinc-700 rounded-lg overflow-hidden bg-zinc-900">
        {/* scanning beam */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-[#EEFF00] shadow-[0_0_12px_#EEFF00] z-10"
        />
        {/* dot grid */}
        <div className="absolute inset-[8%] grid grid-cols-6 gap-1 opacity-30">
          {[...Array(36)].map((_, i) => (
            <motion.div
              key={i}
              className="w-full h-full bg-[#EEFF00] rounded-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.random() > 0.5 ? 0.8 : 0.2 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.04 }}
            />
          ))}
        </div>
      </div>
      {/* status pill */}
      <div className="mt-[6%] px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-sm">
        <span className="text-zinc-300 font-mono uppercase tracking-widest"
              style={{ fontSize: "clamp(7px, 2%, 10px)" }}>
          Scanning Code...
        </span>
      </div>
    </div>
  );
}

/** Screen 1 – Access granted */
function SuccessScreen() {
  return (
    <div className="relative w-full h-full bg-[#0C0C0D] flex flex-col items-center justify-center px-[8%]">
      {/* flash overlay */}
      <motion.div
        className="absolute inset-0 bg-[#EEFF00] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0] }}
        transition={{ duration: 0.55 }}
      />
      {/* check badge — 18% of phone width */}
      <motion.div
        className="relative z-10 w-[18%] aspect-square bg-[#EEFF00] rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(238,255,0,0.25)] mb-[5%]"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
      >
        <CheckCircle2 className="w-[55%] h-[55%] text-black" />
      </motion.div>

      {/* heading */}
      <motion.p
        className="relative z-10 font-mono font-semibold text-zinc-100 uppercase tracking-widest text-center mb-[5%]"
        style={{ fontSize: "clamp(9px, 3.2%, 16px)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Access Granted
      </motion.p>

      {/* membership card */}
      <motion.div
        className="relative z-10 w-full bg-zinc-900 border border-zinc-800 rounded-sm px-[5%] py-[4%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }}
      >
        <p className="text-zinc-500 font-mono uppercase text-center tracking-widest mb-[4%]"
           style={{ fontSize: "clamp(6px, 2.2%, 10px)" }}>
          Membership Verified
        </p>
        {[
          { label: "Member",     value: "Om Gupta",   color: "text-zinc-100" },
          { label: "Plan",       value: "Pro Yearly", color: "text-zinc-100" },
          { label: "Expires in", value: "142 Days",   color: "text-emerald-400" },
        ].map((row, i, arr) => (
          <div
            key={i}
            className={`flex justify-between items-center py-[3%] ${i < arr.length - 1 ? "border-b border-zinc-800" : ""}`}
          >
            <span className="text-zinc-500" style={{ fontSize: "clamp(7px, 2.5%, 11px)" }}>{row.label}</span>
            <span className={`font-medium ${row.color}`} style={{ fontSize: "clamp(7px, 2.5%, 11px)" }}>{row.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Screen 2 – Dashboard */
function DashboardScreen() {
  const bars = [32, 45, 38, 51, 47, 68, 42];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="w-full h-full bg-[#0C0C0D] flex flex-col overflow-hidden">
      {/* macOS-style topbar */}
      <div className="flex items-center gap-[3%] px-[5%] py-[3%] border-b border-white/5 bg-white/[0.01] flex-shrink-0">
        {["#EF4444", "#F59E0B", "#10B981"].map((c, i) => (
          <div key={i} style={{ width: "8%", aspectRatio: "1", borderRadius: "50%", background: c, opacity: 0.75, flexShrink: 0 }} />
        ))}
        <p className="flex-1 text-center text-[#475569] font-mono" style={{ fontSize: "clamp(6px, 2%, 9px)" }}>
          Dashboard
        </p>
      </div>

      {/* 2×2 metrics */}
      <div className="grid grid-cols-2 gap-[3%] px-[5%] pt-[4%] pb-[3%] border-b border-white/5 flex-shrink-0">
        {[
          { label: "Total Members",       value: "6",      sub: "See member list",    subColor: "#EAB308" },
          { label: "Today's Check-ins",   value: "0 / 6",  sub: "of 6 members",       subColor: "#3B82F6" },
          { label: "Monthly Revenue",     value: "₹22,493",sub: "",                   subColor: "" },
          { label: "Gym Status",          value: "OPEN",   sub: "Open now",           subColor: "#10B981" },
        ].map((c, i) => (
          <div key={i} className="bg-[#111112] border border-white/5 rounded-md px-[8%] py-[6%]">
            <p className="text-[#71717A] font-mono uppercase tracking-wide mb-[6%]"
               style={{ fontSize: "clamp(5px, 1.8%, 8px)" }}>
              {c.label}
            </p>
            <p className="text-[#EDEDED] font-semibold mb-[4%]" style={{ fontSize: "clamp(9px, 3.5%, 14px)" }}>
              {c.value}
            </p>
            {c.sub && (
              <p style={{ fontSize: "clamp(5px, 1.6%, 7px)", color: c.subColor, fontFamily: "monospace", textTransform: "uppercase" }}>
                {c.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* bar chart */}
      <div className="flex flex-col flex-1 min-h-0 px-[5%] pt-[4%] pb-[5%]">
        <p className="text-[#475569] uppercase tracking-widest mb-[6%] flex-shrink-0"
           style={{ fontSize: "clamp(5px, 1.8%, 8px)" }}>
          Attendance — This Week
        </p>
        <div className="flex items-end gap-[3%] flex-1 min-h-0">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end gap-[4%]">
              <div
                style={{
                  width: "100%",
                  height: `${(h / 68) * 100}%`,
                  background: i === 5 ? "linear-gradient(180deg,#EEFF00,#B3C200)" : "rgba(255,255,255,0.08)",
                  borderRadius: "2px 2px 0 0",
                  position: "relative",
                }}
              >
                {i === 5 && (
                  <span style={{
                    position: "absolute", top: "-130%", left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "clamp(5px,1.8%,7px)", color: "#EEFF00", fontWeight: 600,
                  }}>68</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-[3%] mt-[4%] flex-shrink-0">
          {days.map((d, i) => (
            <p key={i} className="flex-1 text-center" style={{ fontSize: "clamp(5px,1.8%,8px)", color: i === 5 ? "#EEFF00" : "#334155" }}>
              {d}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED PHONE (desktop / tablet) — mouse tilt
───────────────────────────────────────────── */
function PremiumPhone({ activeStep }: { activeStep: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <PhoneFrame widthClass="w-[140px] md:w-[160px] lg:w-[200px]">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <PhoneScreenTransition key="scan"><ScanScreen /></PhoneScreenTransition>
          )}
          {activeStep === 1 && (
            <PhoneScreenTransition key="success"><SuccessScreen /></PhoneScreenTransition>
          )}
          {activeStep === 2 && (
            <PhoneScreenTransition key="dashboard"><DashboardScreen /></PhoneScreenTransition>
          )}
        </AnimatePresence>
      </PhoneFrame>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STORY CONTENT
───────────────────────────────────────────── */
const STORY = [
  {
    title: "Scan & Enter.",
    subtitle: "Members use their phone as a secure key. No app to download. Zero hardware required.",
  },
  {
    title: "Auto-Recognition.",
    subtitle: "Browser opens, device is recognized automatically, attendance recorded. No app, no login, no OTP, no waiting.",
  },
  {
    title: "Everything you need to see. In one place.",
    subtitle: "Open your phone and see how many members came today, how much money came in, and who is expiring this week.",
  },
];

/* ─────────────────────────────────────────────
   DESKTOP / TABLET  — sticky scroll storytelling
───────────────────────────────────────────── */
function ScrollStory() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 1 / 3) setActiveStep(0);
    else if (v < 2 / 3) setActiveStep(1);
    else setActiveStep(2);
  });

  return (
    /* 3 "pages" of scroll height — phone stays pinned the whole time */
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <div
        className="sticky top-14 flex items-center justify-center overflow-hidden w-full h-[calc(100vh-3.5rem)]"
      >
        <div className="w-full h-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-start lg:justify-center pt-2 md:pt-6 lg:pt-0 gap-6 sm:gap-8 md:gap-10 lg:gap-20">

          {/* ── PHONE (Top on mobile, Right on desktop) ── */}
          <div className="flex-shrink-0 flex items-center justify-center order-1 lg:order-2 mt-0 lg:mt-0">
            <PremiumPhone activeStep={activeStep} />
          </div>

          {/* ── TEXT (Bottom on mobile, Left on desktop) ── */}
          <div className="w-full lg:flex-1 min-w-0 flex justify-center lg:justify-start order-2 lg:order-1 text-center lg:text-left">
            {/* Fixed-height box so AnimatePresence swap never shifts layout */}
            <div className="relative w-full max-w-[500px] h-[220px] sm:h-[180px] md:h-[200px] lg:h-[300px] mx-auto lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={{ opacity: 0, filter: "blur(8px)", y: 14 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", y: -14 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.08] text-zinc-50 tracking-tight">
                    {STORY[activeStep].title}
                  </h3>
                  <p className="mt-3 lg:mt-5 text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {STORY[activeStep].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WRAPPER — decides which storytelling mode to use
───────────────────────────────────────────── */
function StickyScrollFeatures() {
  return (
    <section className="bg-[#0A0A0B] text-zinc-50 border-t border-zinc-900">
      <ScrollStory />
    </section>
  );
}

/* ─────────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────────── */
export function LandingPage({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-50 font-sans selection:bg-[#EEFF00] selection:text-black">
      {/* Background dot grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#0A0A0B]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#EEFF00]" />
            <span className="font-semibold tracking-tight text-lg">GymFlex</span>
          </div>
          <button
            onClick={onEnterApp}
            className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-6"
            >
              OS Version 2.0
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] lg:leading-[1.05] mb-4 sm:mb-6"
            >
              Run your gym without paperwork.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed"
            >
              Members check in by scanning one QR code on your wall. Attendance marked automatically. Fee reminders sent on WhatsApp. Revenue tracked daily. All from your phone.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={onEnterApp}
                className="bg-[#EEFF00] text-black w-full sm:w-auto px-6 sm:px-8 py-4 font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wide"
              >
                Start Free — Set Up in 10 Minutes
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Storytelling ── */}
      <StickyScrollFeatures />

      {/* ── Features grid ── */}
      <section className="py-16 sm:py-24 px-6 border-t border-zinc-900 bg-[#0C0C0D]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Six features that replace six problems.</h2>
            <p className="text-zinc-400 text-sm sm:text-base">Most gyms lose money on expired memberships, missed follow-ups, and attendance they never tracked. GymFlex fixes all of it.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { subsystem: "Check-in security",   icon: Smartphone, title: "One phone, one member",               desc: "Each member's phone is linked to their account when they first register. Someone sharing the QR with a friend won't work — the phone is the identity, not the QR." },
              { subsystem: "Works without internet", icon: WifiOff,  title: "No WiFi, no problem",                desc: "If your gym's internet goes down, members can still check in. Everything syncs automatically when the connection comes back. No attendance is ever lost." },
              { subsystem: "Live attendance view", icon: DatabaseZap, title: "See who came today",                desc: "Your dashboard updates the moment a member checks in. See today's count, this week's trend, and which hours are busiest — all in one screen." },
              { subsystem: "Peak hour insight",   icon: TrendingUp,  title: "Know your busiest times",            desc: "See which hours bring the most members — 6 AM to 8 AM, or 5 PM to 7 PM. Plan your staff schedule and avoid overcrowding based on real data from your own gym." },
              { subsystem: "Suspicious activity alerts", icon: ShieldAlert, title: "Catch problems early",        desc: "If someone is checking in from two different phones, or multiple unknown devices scan your QR in quick succession, you get a notification. Stay in control." },
              { subsystem: "Auto renewal reminders", icon: Banknote, title: "Never chase a payment manually again", desc: "3 days before a membership expires, the member automatically gets a WhatsApp message. Your payment record is updated the moment you receive money." },
            ].map((feature, i) => (
              <GridCard key={i} feature={feature} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-t border-zinc-900 bg-[#0A0A0B] py-16 sm:py-24 px-6">
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, letterSpacing: -2, marginBottom: 12, color: "#F1F5F9" }}>
                Start free. Pay only if you love it.
              </h2>
              <p style={{ fontSize: 16, color: "#64748B", maxWidth: 600, margin: "0 auto" }}>
                First 30 days free on any plan. No credit card when signing up. Cancel from your dashboard in one click.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {[
              { name: "Starter", price: "Free",   sub: "Up to 50 members",             accent: "#475569", features: ["QR check-in","Member directory","Expiry tracker","Basic dashboard"], missing: ["Automated WhatsApp alerts","Revenue trends and reports"], badge: null,           delay: 0 },
              { name: "Growth",  price: "₹999",   sub: "per month · up to 300 members", accent: TEAL,     features: ["Everything in Starter","WhatsApp renewal alerts","Revenue analytics","Membership freeze","Inactive member detection","PDF receipts","Crowd analytics"],          missing: [], badge: "Most Popular", delay: 0.1 },
              { name: "Pro",     price: "₹2,499", sub: "per month · unlimited members", accent: VIOLET,   features: ["Everything in Growth","Online fee collection","Multi-branch support","Member referral system","Priority support"],                                               missing: [], badge: null,           delay: 0.2 },
            ].map((p, i) => (
              <Reveal key={i} delay={p.delay}>
                <div
                  style={{
                    background: p.badge ? "rgba(45,212,191,0.04)" : "rgba(255,255,255,0.02)",
                    border: p.badge ? `2px solid ${TEAL}40` : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 20, padding: "32px 24px",
                    boxShadow: p.badge ? `0 0 60px ${TEAL}10` : "none",
                    transition: "transform 0.2s", position: "relative", overflow: "hidden", height: "100%",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {p.badge && (
                    <div style={{ position: "absolute", top: 0, right: 0, background: TEAL, color: "#020817", fontSize: 10, fontWeight: 800, padding: "5px 14px", borderRadius: "0 18px 0 12px", letterSpacing: 1, textTransform: "uppercase" }}>
                      {p.badge}
                    </div>
                  )}
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{p.name}</div>
                  <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -2, color: "#F1F5F9", lineHeight: 1 }}>{p.price}</div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 6, marginBottom: 28 }}>{p.sub}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: p.accent, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 13.5, color: "#94A3B8" }}>{f}</span>
                      </div>
                    ))}
                    {p.missing.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", opacity: 0.35 }}>
                        <span style={{ color: "#475569", fontSize: 14, flexShrink: 0, marginTop: 1 }}>✗</span>
                        <span style={{ fontSize: 13.5, color: "#475569", textDecoration: "line-through" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    style={{
                      width: "100%", padding: "12px 0",
                      background: p.badge ? `linear-gradient(135deg,${TEAL},${VIOLET})` : "transparent",
                      border: p.badge ? "none" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 99, color: p.badge ? "#020817" : "#94A3B8",
                      fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { if (!p.badge) { e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.color = "#F1F5F9"; } }}
                    onMouseLeave={e => { if (!p.badge) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94A3B8"; } }}
                  >
                    {p.price === "Free" ? "Get started free" : "Start free trial"}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p style={{ textAlign: "center", fontSize: 13, color: "#334155", marginTop: 24 }}>
              All plans include a 30-day free trial. No credit card required. Cancel anytime.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-32 px-6 border-t border-zinc-900 bg-[#0A0A0B] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 tracking-tight">
            Your members are already using WhatsApp and scanning QR codes every day.
          </h2>
          <p className="text-zinc-400 mb-10 text-base sm:text-lg">
            GymFlex just connects those two habits into an attendance and billing system that runs itself.
          </p>
          <button
            onClick={onEnterApp}
            className="bg-zinc-100 text-zinc-900 px-6 sm:px-8 py-4 font-semibold hover:bg-[#EEFF00] transition-colors inline-block text-xs sm:text-sm uppercase tracking-wide"
          >
            Start for free — takes 10 minutes to set up
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-zinc-500 text-xs flex flex-col md:flex-row justify-between items-center gap-2 max-w-7xl mx-auto text-center md:text-left">
        <p>Made for gym owners across India</p>
        <p>© 2026 GymFlex · support@gymflex.in</p>
      </footer>
    </div>
  );
}
