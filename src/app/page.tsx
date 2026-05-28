"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  QrCode,
  BarChart3,
  ShieldCheck,
  Users,
  Package,
  FileSpreadsheet,
  ArrowRight,
  Menu,
  X,
  Layers,
  Truck,
  ClipboardList,
  TrendingUp,
  BadgeCheck,
  ChevronRight,
  Globe,
  Lock,
  Cpu,
  Wifi,
} from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Roles", href: "#roles" },
];

const features = [
  {
    icon: <QrCode size={20} />,
    title: "QR Code Tracking",
    desc: "Generate unique QR tags for every asset. Scan with any device to instantly retrieve full asset details — no login required.",
  },
  {
    icon: <Layers size={20} />,
    title: "Hierarchical Classification",
    desc: "Organise assets into Categories → Sub-Categories → Asset Types. Filter and report at any level with one click.",
  },
  {
    icon: <Package size={20} />,
    title: "Full Lifecycle Management",
    desc: "Track every asset from procurement through allocation, transfer, maintenance, and eventual retirement or disposal.",
  },
  {
    icon: <Truck size={20} />,
    title: "Vendor & Contract Management",
    desc: "Maintain a vendor directory with GST numbers, contract expiry dates, and linked assets. Never miss a renewal.",
  },
  {
    icon: <FileSpreadsheet size={20} />,
    title: "Bulk Import / Export",
    desc: "Upload hundreds of assets via Excel in seconds. Export filtered views to spreadsheets for audits and reporting.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Reports & Audit Trail",
    desc: "Real-time dashboards, allocation reports, gate-pass logs, and a full audit trail for every change made in the system.",
  },
];

const modules = [
  {
    icon: <Package size={24} />,
    title: "Asset Registry",
    points: [
      "Unique asset tag & serial number",
      "Category, sub-category & asset type",
      "Technical specs: OS, RAM, processor, storage",
      "Network info: hostname, IP, MAC address",
      "Financial info: cost, vendor, warranty & AMC",
    ],
  },
  {
    icon: <Users size={24} />,
    title: "Asset Allocation",
    points: [
      "Assign assets to employees by department",
      "Track active allocations in real time",
      "Process returns with condition notes",
      "Overdue allocation alerts and reports",
      "Full allocation history per asset or user",
    ],
  },
  {
    icon: <ClipboardList size={24} />,
    title: "Gate Pass Management",
    points: [
      "Raise gate pass requests for asset movement",
      "Approval workflow for managers",
      "In / out tracking with timestamps",
      "Auto-expiry and return reminders",
      "Printable pass with asset and user details",
    ],
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Reports & Analytics",
    points: [
      "Asset status overview dashboard",
      "Allocation & return history reports",
      "Gate pass logs with filter & export",
      "Vendor-wise and category-wise breakdown",
      "Full audit trail for compliance",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Configure Masters",
    desc: "Set up asset categories, sub-categories, vendors, departments, locations, and user roles in the admin panel.",
  },
  {
    num: "02",
    title: "Register Assets",
    desc: "Add assets with full technical and financial details. Generate QR tags for physical labelling instantly.",
  },
  {
    num: "03",
    title: "Track & Manage",
    desc: "Allocate assets to employees, issue gate passes, monitor lifecycle, and generate compliance reports.",
  },
];

const roles = [
  {
    role: "Admin",
    desc: "Full system control. Manage users, roles, masters, and all asset operations.",
    perms: [
      "All asset CRUD operations",
      "User & role management",
      "Master data configuration",
      "Full reports & audit access",
    ],
  },
  {
    role: "Manager",
    desc: "Oversee team assets, approve gate passes and manage allocations.",
    perms: [
      "View & update assets",
      "Approve gate pass requests",
      "Manage team allocations",
      "Access team-level reports",
    ],
  },
  {
    role: "Technician",
    desc: "Handle day-to-day asset operations, maintenance and tracking.",
    perms: [
      "View asset details",
      "Update asset status",
      "Process allocations & returns",
      "Raise gate pass requests",
    ],
  },
  {
    role: "End User",
    desc: "View assigned assets and raise service or gate pass requests.",
    perms: [
      "View own assigned assets",
      "Raise gate pass requests",
      "View allocation history",
      "Scan QR for asset info",
    ],
  },
];

const stats = [
  { value: "10K+", label: "Assets Tracked" },
  { value: "500+", label: "Organisations" },
  { value: "99.9%", label: "Uptime" },
  { value: "4", label: "Access Roles" },
];

// ── QR cell pattern (static — no Math.random) ─────────────
const QR_CELLS = [
  1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1,
  0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#060c2c] text-white font-sans antialiased">
      {/* ── NAVBAR ──────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white border-b border-gray-200 shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border ${scrolled ? "bg-gray-900 border-gray-700" : "bg-white/5 border-white/10"}`}
            >
              <Package size={15} className={scrolled ? "text-white" : "text-white"} />
            </div>
            <span
              className={`text-base font-bold tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}
            >
              AssetFlow
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm font-medium transition ${scrolled ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className={`text-sm font-medium transition px-3 py-1.5 ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
            >
              Login
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-md transition"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-md transition ${scrolled ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 hover:bg-white/10"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className={`md:hidden border-b px-5 py-4 space-y-3 ${scrolled ? "bg-white border-gray-200" : "bg-[#060c2c] border-white/10"}`}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm font-medium py-1.5 ${scrolled ? "text-gray-700" : "text-gray-300"}`}
              >
                {l.label}
              </a>
            ))}
            <div
              className={`pt-2 flex flex-col gap-2 border-t ${scrolled ? "border-gray-100" : "border-white/10"}`}
            >
              <Link
                href="/login"
                className={`text-sm font-medium text-center py-2 border rounded-md ${scrolled ? "border-gray-300 text-gray-700 hover:bg-gray-50" : "border-white/20 text-white hover:bg-white/10"}`}
              >
                Login
              </Link>
              <Link
                href="/login"
                className="text-sm font-semibold text-white text-center py-2 bg-gray-900 rounded-md hover:bg-gray-700"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-5 bg-[#060c2c] relative overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Enterprise Asset Management Platform
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-tight">
            Manage Every Asset.
            <br />
            <span className="text-gray-400">Track Every Movement.</span>
          </h1>

          {/* Sub */}
          <p className="mt-5 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The complete IT asset lifecycle management platform — from procurement and QR tagging to
            allocation, gate passes, and compliance reporting. Built for modern organisations.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 px-7 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-md text-sm transition active:scale-95"
            >
              Start Free Trial
              <ArrowRight size={15} />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-7 py-3 border border-white/20 hover:border-white/40 hover:bg-white/5 text-gray-300 hover:text-white font-semibold rounded-md text-sm transition"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-4 text-xs text-gray-600">
            No credit card required &nbsp;·&nbsp; Setup in minutes &nbsp;·&nbsp; Role-based access
            included
          </p>
        </div>

        {/* Mock dashboard */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="bg-[#0f172a] rounded-xl border border-white/5 shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1e293b] border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="flex-1 mx-4 h-5 bg-white/5 rounded-md" />
            </div>
            {/* Dashboard content */}
            <div className="p-5">
              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Total Assets", val: "1,284", color: "text-white" },
                  { label: "Allocated", val: "947", color: "text-green-400" },
                  { label: "Available", val: "312", color: "text-gray-300" },
                  { label: "Maintenance", val: "25", color: "text-gray-400" },
                ].map((c) => (
                  <div key={c.label} className="bg-[#1e293b] rounded-lg border border-white/5 p-3">
                    <p className="text-[10px] text-gray-500 font-medium mb-1">{c.label}</p>
                    <p className={`text-xl font-bold ${c.color}`}>{c.val}</p>
                  </div>
                ))}
              </div>
              {/* Table */}
              <div className="bg-[#1e293b] rounded-lg border border-white/5 overflow-hidden">
                <div className="grid grid-cols-5 px-4 py-2.5 border-b border-white/5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                  {["Asset Tag", "Device", "Category", "Status", "Warranty"].map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>
                {[
                  ["LAP-001", "Dell Latitude 5540", "Laptop", "Active", "2027-01-15"],
                  ["DESK-002", "HP EliteDesk 800", "Desktop", "Active", "2026-09-10"],
                  ["MAC-003", "MacBook Pro 14 M3", "Laptop", "Allocated", "2026-11-01"],
                  ["TAB-004", "Samsung Galaxy Tab", "Tablet", "Inactive", "2025-12-20"],
                ].map(([tag, dev, cat, status]) => (
                  <div
                    key={tag}
                    className="grid grid-cols-5 px-4 py-2.5 border-b border-white/5 text-[10px] text-gray-400 last:border-0"
                  >
                    <span className="font-semibold text-white">{tag}</span>
                    <span className="truncate">{dev}</span>
                    <span>{cat}</span>
                    <span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${
                          status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : status === "Allocated"
                              ? "bg-white/10 text-gray-300"
                              : "bg-white/5 text-gray-500"
                        }`}
                      >
                        {status}
                      </span>
                    </span>
                    <span className="text-gray-500">—</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#060c2c] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────── */}
      <section className="py-10 bg-[#0f172a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section id="features" className="py-24 px-5 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Features
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Everything you need in one platform
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
              Designed for IT teams, operations managers, and finance departments who need complete
              visibility over physical assets.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white mb-4 group-hover:bg-gray-700 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ─────────────────────────────────────── */}
      <section id="modules" className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Modules
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Four powerful modules, one platform
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
              Each module is purpose-built and works seamlessly with the others, giving you
              end-to-end control over your asset ecosystem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {modules.map((m) => (
              <div
                key={m.title}
                className="bg-[#f8fafc] rounded-xl border border-gray-100 p-7 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white mb-5">
                  {m.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-4">{m.title}</h3>
                <ul className="space-y-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 shrink-0 text-xs">✔</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-5 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              How It Works
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Up and running in three steps
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
              No complex onboarding. Configure your masters, add your assets, and start tracking in
              minutes.
            </p>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-gray-200 z-0" />
            <div className="grid sm:grid-cols-3 gap-8 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="text-center">
                  <div className="w-14 h-14 rounded-xl border-2 border-gray-900 bg-white flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <span className="text-lg font-black text-gray-900">{s.num}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QR HIGHLIGHT ────────────────────────────────── */}
      <section className="py-20 px-5 bg-[#060c2c]">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 mb-5">
              <QrCode size={12} />
              QR Code System
            </span>
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Scan any asset tag.
              <br />
              Get instant details.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Every registered asset gets a unique QR code that encodes key details directly — asset
              tag, serial number, category, status, and warranty expiry. Scan with any phone camera.
              No app, no login needed.
            </p>
            <ul className="space-y-3">
              {[
                "Print-ready QR cards with asset info",
                "Download as PNG or print directly",
                "Works with any QR scanner app",
                "Instant identification in the field",
              ].map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="text-green-400 text-xs shrink-0">✔</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* Mock QR card — matching login card style */}
          <div className="shrink-0 w-52">
            <div className="bg-[#0f172a] rounded-xl border border-white/5 shadow-xl overflow-hidden">
              <div className="h-1 bg-white/10" />
              <div className="px-5 py-5 text-center">
                <p className="text-[10px] font-bold text-white mb-0.5">Asset Management</p>
                <p className="text-[9px] text-gray-500 mb-4">Asset Identification Card</p>
                <p className="text-base font-extrabold text-white tracking-widest mb-1">LAP-001</p>
                <p className="text-[10px] text-gray-500 mb-3">Dell Latitude 5540</p>
                {/* Static QR grid */}
                <div className="w-24 h-24 mx-auto bg-white rounded-lg p-2 mb-3 grid grid-cols-7 gap-px">
                  {QR_CELLS.map((cell, i) => (
                    <div key={i} className={`rounded-[1px] ${cell ? "bg-gray-900" : "bg-white"}`} />
                  ))}
                </div>
                <p className="text-[9px] text-gray-500">Scan to get details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLES ───────────────────────────────────────── */}
      <section id="roles" className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Access Control
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              The right access for every team member
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
              Four predefined roles with granular permissions. Assign the right level of access to
              every person in your organisation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roles.map((r, i) => (
              <div
                key={r.role}
                className="bg-[#f8fafc] rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900" />
                  <span className="text-sm font-bold text-gray-900">{r.role}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{r.desc}</p>
                <ul className="space-y-2">
                  {r.perms.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-gray-600">
                      <ChevronRight size={11} className="text-gray-400 mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY ────────────────────────────────────── */}
      <section className="py-20 px-5 bg-[#f8fafc] border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Secure, reliable, and enterprise-ready
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto text-sm">
              Built with security and auditability at the core so your organisation stays compliant
              and in control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Lock size={18} />,
                title: "JWT Authentication",
                desc: "Secure token-based auth with httpOnly cookies. Sessions expire automatically.",
              },
              {
                icon: <ShieldCheck size={18} />,
                title: "Role-Based Access",
                desc: "Every API endpoint is protected with role and permission checks.",
              },
              {
                icon: <Globe size={18} />,
                title: "Cloud-Hosted",
                desc: "MongoDB Atlas backend with automatic backups and 99.9% uptime SLA.",
              },
              {
                icon: <BadgeCheck size={18} />,
                title: "Full Audit Trail",
                desc: "Every change is logged — who did what, when, and on which asset.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white mb-3">
                  {c.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-5 bg-[#060c2c]">
        <div className="max-w-3xl mx-auto">
          {/* Card matching login's dark card style */}
          <div className="bg-[#0f172a] rounded-xl p-10 border border-white/5 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={22} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to take control of your assets?
            </h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Join hundreds of organisations that use AssetFlow to track, manage, and optimise their
              physical assets every day.
            </p>
            <div className="space-y-3">
              {[
                "Real-time asset tracking",
                "Reduce risks and costs",
                "End-to-end lifecycle management",
              ].map((pt) => (
                <div
                  key={pt}
                  className="flex items-center justify-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-green-400 text-xs">✔</span>
                  {pt}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="flex items-center gap-2 px-7 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-md text-sm transition active:scale-95"
              >
                Start Free Trial
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-7 py-3 border border-white/20 hover:border-white/40 hover:bg-white/5 text-gray-300 font-semibold rounded-md text-sm transition"
              >
                Login to Dashboard
              </Link>
            </div>
            <p className="mt-5 text-xs text-gray-600">
              No credit card required &nbsp;·&nbsp; All modules included
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="bg-[#0f172a] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Package size={13} className="text-white" />
                </div>
                <span className="font-bold text-white">AssetFlow</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                The complete IT asset lifecycle management platform for modern organisations.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-gray-400 mb-3">Platform</p>
                <ul className="space-y-2 text-gray-500">
                  <li>
                    <a href="#features" className="hover:text-white transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#modules" className="hover:text-white transition">
                      Modules
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:text-white transition">
                      How It Works
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-400 mb-3">Access</p>
                <ul className="space-y-2 text-gray-500">
                  <li>
                    <a href="#roles" className="hover:text-white transition">
                      Roles
                    </a>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-white transition">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-white transition">
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-400 mb-3">Company</p>
                <ul className="space-y-2 text-gray-500">
                  <li>
                    <span>About</span>
                  </li>
                  <li>
                    <span>Contact</span>
                  </li>
                  <li>
                    <span>Privacy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} AssetFlow. All rights reserved.</p>
            <p>Built for enterprise IT asset management</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
