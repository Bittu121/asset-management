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
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  ImageIcon,
  Lock,
} from "lucide-react";
import { FaChevronUp } from "react-icons/fa";

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
    desc: "Generate unique QR tags for every asset. Scan with any device to instantly retrieve full asset details.",
  },
  {
    icon: <Layers size={20} />,
    title: "Hierarchical Classification",
    desc: "Organise assets into Categories → Sub-Categories → Asset Types.",
  },
  {
    icon: <Package size={20} />,
    title: "Full Lifecycle Management",
    desc: "Track every asset from procurement through allocation, transfer, and gate-pass movement in one place.",
  },
  {
    icon: <Truck size={20} />,
    title: "Vendor & Contract Management",
    desc: "Maintain a vendor directory with GST numbers, contract expiry dates, and linked assets.",
  },
  {
    icon: <FileSpreadsheet size={20} />,
    title: "Bulk Import / Export",
    desc: "Upload hundreds of assets via Excel in seconds. Export filtered views to spreadsheets for audits and reporting.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Reports & Audit Trail",
    desc: "Real-time dashboards, allocation reports, gate-pass logs, and an audit trail of every allocation and gate-pass action.",
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
      "Overdue allocation reports",
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
      "Allocation & gate-pass audit trail",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Setup Masters",
    desc: "Set up asset categories, sub-categories, asset types, vendors, departments, locations, and user roles in the admin panel.",
  },
  {
    num: "02",
    title: "Register Assets",
    desc: "Add assets with details. Generate QR tags for physical labelling instantly.",
  },
  {
    num: "03",
    title: "Track & Manage",
    desc: "Allocate assets to employees, issue gate passes, and generate compliance reports.",
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
    desc: "View team assets, approve gate passes and manage allocations.",
    perms: ["View & update assets", "Approve gate pass requests"],
  },
  {
    role: "Technician",
    desc: "Handle asset operations, maintenance and tracking.",
    perms: [
      "View asset details",
      "Update asset status",
      "Raise gate pass requests",
    ],
  },
  {
    role: "End User",
    desc: "View assigned assets and gate pass requests.",
    perms: [
      "View own assigned assets",
      "Raise gate pass requests",
      "View allocation history",
      "Scan QR for asset info",
    ],
  },
];

const stats = [
  { value: "4", label: "Access Roles" },
  { value: "QR", label: "Code Asset Tag" },
  { value: "Full", label: "Audit Trail" },
  { value: "Gate Pass", label: "Movement Approval" },
];

// Replace `image: null` with a screenshot path once captured (e.g. "/previews/dashboard.png")
const previewSlides = [
  {
    image: null as string | null,
    caption: "Live dashboard with real asset & allocation data",
  },
  {
    image: null as string | null,
    caption: "Asset registry populated with seeded records",
  },
  {
    image: null as string | null,
    caption: "Gate pass approval workflow in action",
  },
  {
    image: null as string | null,
    caption: "QR code generated for a real asset",
  },
];

// typography classes
const sectionEyebrow =
  "text-xs font-semibold uppercase tracking-widest text-gray-500";
const sectionHeading =
  "mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900";
const sectionSubtext = "mt-3 text-gray-500 max-w-xl mx-auto text-sm";
const cardDesc = "text-sm text-gray-500 leading-relaxed";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);

  const prevSlide = () =>
    setPreviewIndex(
      (i) => (i - 1 + previewSlides.length) % previewSlides.length,
    );
  const nextSlide = () =>
    setPreviewIndex((i) => (i + 1) % previewSlides.length);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060c2c] text-white font-sans antialiased">
      {/* NAVBAR  */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className={`text-lg font-bold tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}
            >
              Asset Management
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
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
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-md"
            >
              Get Started
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
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
                onClick={(e) => handleNavClick(e, l.href)}
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

      {/* HERO*/}
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
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-tight">
            Manage Every Asset.
          </h1>

          {/* Sub */}
          <p className="mt-5 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The complete IT asset lifecycle management platform — from
            procurement and QR tagging to allocation, gate passes, and
            compliance reporting.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, "#how-it-works")}
              className="flex items-center gap-2 px-7 py-3 border border-white/20 hover:border-white/40 hover:bg-white/5 text-gray-300 hover:text-white font-semibold rounded-md text-sm transition"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* PRODUCT PREVIEW */}
        <section id="preview" className="py-24 px-5 bg-[#070D2D]">
          <div className="max-w-5xl mx-auto text-center">
            <span className={sectionEyebrow}>Product Preview</span>
            <div className="mt-10">
              <div className="aspect-video w-full bg-[#0f172a] rounded-md border border-gray-200 shadow-lg flex flex-col items-center justify-center gap-3 overflow-hidden">
                {previewSlides[previewIndex].image ? (
                  <img
                    src={previewSlides[previewIndex].image}
                    alt={previewSlides[previewIndex].caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <ImageIcon size={32} className="text-white/20" />
                    <p className="text-xs text-white/40">
                      coming soon
                    </p>
                  </>
                )}
              </div>
              <p className="mt-4 text-sm text-gray-600 font-medium">
                {previewSlides[previewIndex].caption}
              </p>
            </div>

            <div className="mt-6 inline-flex items-center gap-3 bg-gray-900 rounded-full px-3 py-2">
              <button
                onClick={prevSlide}
                aria-label="Previous screenshot"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1.5">
                {previewSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === previewIndex ? "bg-white w-4" : "bg-white/30 w-1.5"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                aria-label="Next screenshot"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </section>

      {/*STATS BAR */}
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

      {/* FEATURES */}
      <section id="features" className="py-24 px-5 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className={sectionEyebrow}>Features</span>
            <h2 className={sectionHeading}>
              Everything you need in one platform
            </h2>
            <p className={sectionSubtext}>
              Designed for IT teams, operations managers, and departments who
              need complete visibility over physical assets.
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
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {f.title}
                </h3>
                <p className={cardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className={sectionEyebrow}>Modules</span>
            <h2 className={sectionHeading}>
              Four powerful modules, one platform
            </h2>
            <p className={sectionSubtext}>
              Each module is purpose-built and works seamlessly with the others,
              giving you full control over asset registration, allocation, and
              movement.
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
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  {m.title}
                </h3>
                <ul className="space-y-2.5">
                  {m.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                    >
                      <span className="text-green-500 mt-0.5 shrink-0 text-xs">
                        ✔
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-5 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className={sectionEyebrow}>How It Works</span>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-gray-200 z-0" />
            <div className="grid sm:grid-cols-3 gap-8 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="text-center">
                  <div className="w-14 h-14 rounded-xl border-2 border-gray-900 bg-white flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <span className="text-lg font-black text-gray-900">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">
                    {s.title}
                  </h3>
                  <p className={cardDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QR Code */}
      <section className="py-20 px-5 bg-[#060c2c]">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 mb-5">
              <QrCode size={12} />
              QR Code
            </span>
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Scan any asset tag.
              <br />
              Get instant details.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Every asset gets a unique QR code with the asset tag, serial
              number, category, and other details. Scan the QR code using any
              phone camera or third-party QR scanner app.
            </p>
            <ul className="space-y-3">
              {[
                "Print-ready QR cards with asset info",
                "Download as PNG or print directly",
                "Works with any QR scanner app",
              ].map((pt) => (
                <li
                  key={pt}
                  className="flex items-center gap-2.5 text-sm text-gray-300"
                >
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
                <p className="text-[10px] font-bold text-white mb-0.5">
                  Asset Management
                </p>
                <p className="text-base font-extrabold text-white tracking-widest mb-1">
                  LAP-001
                </p>
                <p className="text-[10px] text-gray-500 mb-3">
                  Dell Latitude 5540
                </p>
                <p className="text-[9px] text-gray-500">Scan to get details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*ROLES  */}
      <section id="roles" className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className={sectionEyebrow}>Right Access Control</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roles.map((r, i) => (
              <div
                key={r.role}
                className="bg-[#f8fafc] rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900" />
                  <span className="text-sm font-bold text-gray-900">
                    {r.role}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  {r.desc}
                </p>
                <ul className="space-y-2">
                  {r.perms.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <ChevronRight
                        size={11}
                        className="text-gray-400 mt-0.5 shrink-0"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY  */}
      <section className="py-20 px-5 bg-[#f8fafc] border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Secure, reliable, and enterprise-ready
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto text-sm">
              Built with security and auditability at the core so your
              organisation stays compliant and in control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                icon: <BadgeCheck size={18} />,
                title: "Audit Trail",
                desc: "Every allocation and gate-pass action is logged — who did what, when, and on which asset.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white mb-3">
                  {c.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*FOOTER */}
      <footer className="bg-[#0f172a] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top Footer */}
          <div className="flex flex-col lg:flex-row items-center justify-between py-6 gap-6">
            <div className="flex items-center">
              <h2 className="text-lg font-bold text-white">Asset Management</h2>
            </div>

            {/* Center - Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "#features")}
                className="text-gray-400 hover:text-white transition"
              >
                Features
              </a>

              <a
                href="#modules"
                onClick={(e) => handleNavClick(e, "#modules")}
                className="text-gray-400 hover:text-white transition"
              >
                Modules
              </a>

              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, "#how-it-works")}
                className="text-gray-400 hover:text-white transition"
              >
                How It Works
              </a>
            </nav>

            {/* Right - CTA */}
            <Link
              href="/login"
              className="group inline-flex items-center gap-1 rounded-md bg-white/10 backdrop-blur-xl 
              border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300
              hover:bg-white/20"
            >
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 py-5 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Asset Management. All rights reserved.
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-700 text-white shadow-lg flex items-center justify-center transition-colors"
        >
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 21}
              strokeDashoffset={2 * Math.PI * 21 * (1 - scrollProgress)}
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>
          <FaChevronUp size={16} className="relative" />
        </button>
      )}
    </div>
  );
}
