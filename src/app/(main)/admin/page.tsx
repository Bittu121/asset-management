// // async function getData() {
// //   await new Promise((res) => setTimeout(res, 1000));
// //   return "data";
// // }

// // async  function AdminDashboard() {
// //   const data = await getData();
// //   return (
// //     <div>
// //       <h1 className="text-xl font-semibold">Dashboardhhh{data}</h1>
// //     </div>
// //   );
// // }
// // export default AdminDashboard;

"use client";

import { useState, useEffect, useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  AreaChart, Area,
} from "recharts";
import {
  Bell, Search, Package, ClipboardList, ShieldCheck,
  TrendingUp, AlertTriangle, CheckCircle2, Clock,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter,
  Download, ChevronRight, Users, Monitor, Activity,
  Home, Wrench, MapPin, ArrowLeftRight, Zap,
} from "lucide-react";

type BadgeColor = "green" | "red" | "yellow" | "blue" | "purple" | "gray" | "orange" | "teal";
type Role = "admin" | "user" | "manager";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];

const assetCategoryData = [
  { name: "Laptop", value: 28 }, { name: "Desktop", value: 14 },
  { name: "Server", value: 8 },  { name: "Printer", value: 10 },
  { name: "Networking", value: 12 },
];
const monthlyAllocation = [
  { month: "Jan", allocated: 8,  returned: 3 }, { month: "Feb", allocated: 12, returned: 5 },
  { month: "Mar", allocated: 10, returned: 4 }, { month: "Apr", allocated: 18, returned: 7 },
  { month: "May", allocated: 14, returned: 6 }, { month: "Jun", allocated: 20, returned: 9 },
];
const assetTrend = [
  { month: "Jan", total: 60 }, { month: "Feb", total: 63 }, { month: "Mar", total: 65 },
  { month: "Apr", total: 68 }, { month: "May", total: 70 }, { month: "Jun", total: 72 },
];
const departmentData = [
  { dept: "IT", assets: 22 },   { dept: "HR", assets: 10 },
  { dept: "Finance", assets: 14 }, { dept: "Ops", assets: 16 }, { dept: "Design", assets: 10 },
];
const locationData = [
  { name: "Head Office", value: 30 }, { name: "Branch Mumbai", value: 18 },
  { name: "Branch Delhi", value: 14 }, { name: "Warehouse", value: 10 },
];
const depreciationData = [
  { month: "Jan", value: 820000 }, { month: "Feb", value: 815000 },
  { month: "Mar", value: 808000 }, { month: "Apr", value: 800000 },
  { month: "May", value: 795000 }, { month: "Jun", value: 785000 },
];
const userAssetData = [
  { name: "Laptop", value: 1 }, { name: "Phone", value: 1 }, { name: "Monitor", value: 1 },
];
const managerDeptAlloc = [
  { month: "Jan", it: 4, hr: 2, finance: 3 }, { month: "Feb", it: 6, hr: 3, finance: 4 },
  { month: "Mar", it: 5, hr: 2, finance: 3 }, { month: "Apr", it: 8, hr: 4, finance: 5 },
  { month: "May", it: 7, hr: 3, finance: 4 }, { month: "Jun", it: 9, hr: 5, finance: 6 },
];

const badgeClasses: Record<BadgeColor, string> = {
  green:  "bg-green-50  text-green-600  border-green-200",
  red:    "bg-red-50    text-red-500    border-red-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  blue:   "bg-blue-50   text-blue-600   border-blue-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  gray:   "bg-gray-50   text-gray-500   border-gray-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
  teal:   "bg-teal-50   text-teal-600   border-teal-200",
};

function Badge({ label, color = "gray" }: { label: string | number; color?: BadgeColor }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${badgeClasses[color] ?? badgeClasses.gray}`}>
      {label}
    </span>
  );
}

function Trend({ up, value }: { up: boolean; value: string }) {
  return (
    <span className={`flex items-center gap-0.5 text-xs font-medium ${up ? "text-green-500" : "text-red-500"}`}>
      {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{value}
    </span>
  );
}

function StatCard({
  title, value, icon,
  iconBg = "bg-indigo-50", iconColor = "text-indigo-600",
  trend, trendUp, sub,
}: {
  title: string; value: string | number; icon: React.ReactNode;
  iconBg?: string; iconColor?: string; trend?: string; trendUp?: boolean; sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide truncate">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-1">{value}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {trend && <Trend up={!!trendUp} value={trend} />}
          {sub   && <span className="text-xs text-gray-400">{sub}</span>}
        </div>
      </div>
      <div className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 ml-3`}>
        {icon}
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children, action }: {
  title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {action ?? <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={16} /></button>}
      </div>
      <div className="h-60">{children}</div>
    </div>
  );
}

function SectionCard({ title, subtitle, children, action }: {
  title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function THead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr className="border-b border-gray-100">
        {cols.map((c) => (
          <th key={c} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap">
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function ProgressRow({ label, value, max, color, count }: {
  label: string; value: number; max: number; color: string; count: number | string;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />{label}
        </span>
        <span className="font-medium">{count}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
      </div>
    </div>
  );
}

function ActivityItem({ icon, iconBg, title, sub, time, badge, badgeColor }: {
  icon: React.ReactNode; iconBg: string; title: string;
  sub: string; time: string; badge?: string; badgeColor?: BadgeColor;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          {badge && badgeColor && <Badge label={badge} color={badgeColor} />}
        </div>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{sub}</p>
      </div>
      <span className="text-xs text-gray-300 whitespace-nowrap">{time}</span>
    </div>
  );
}

function ViewAll({ label = "View All" }: { label?: string }) {
  return (
    <button className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium">
      {label} <ChevronRight size={13} />
    </button>
  );
}

function GradDef({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%"  stopColor={color} stopOpacity={0.18} />
        <stop offset="95%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`text-xs font-semibold border px-2 py-0.5 rounded ${type === "OUT" ? "text-yellow-600 border-yellow-300 bg-yellow-50" : "text-blue-600 border-blue-300 bg-blue-50"}`}>
      ⊕ {type}
    </span>
  );
}

//  ADMIN
function AdminDashboard() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Assets"      value="72"    icon={<Package size={20}/>}       trend="↑ 4 this month"  trendUp  iconBg="bg-indigo-50" iconColor="text-indigo-600"/>
        <StatCard title="Allocated Assets"  value="41"    icon={<ClipboardList size={20}/>}  trend="57% utilization" trendUp  iconBg="bg-blue-50"   iconColor="text-blue-600"/>
        <StatCard title="Available Assets"  value="31"    icon={<CheckCircle2 size={20}/>}   sub="Ready for use"              iconBg="bg-green-50"  iconColor="text-green-600"/>
        <StatCard title="Total Asset Value" value="₹8.4L" icon={<TrendingUp size={20}/>}     trend="↓ 2.1% depr."   trendUp={false} iconBg="bg-purple-50" iconColor="text-purple-600"/>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="In Maintenance"    value="4"  icon={<Wrench size={20}/>}         sub="Avg 3 days repair"  iconBg="bg-orange-50" iconColor="text-orange-600"/>
        <StatCard title="Expired Warranty"  value="9"  icon={<AlertTriangle size={20}/>}  sub="Needs renewal"      iconBg="bg-red-50"    iconColor="text-red-500"/>
        <StatCard title="Pending Gate Pass" value="6"  icon={<ShieldCheck size={20}/>}    trend="2 urgent"         trendUp={false} iconBg="bg-yellow-50" iconColor="text-yellow-600"/>
        <StatCard title="Total Users"       value="28" icon={<Users size={20}/>}           trend="↑ 3 new"          trendUp  iconBg="bg-teal-50"   iconColor="text-teal-600"/>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <ChartCard title="Asset Category Distribution" subtitle="By device type">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={assetCategoryData} cx="50%" cy="50%" outerRadius={85} innerRadius={38} dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}>
                {assetCategoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="xl:col-span-2">
          <ChartCard title="Monthly Allocation vs Returns" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAllocation} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip /><Legend iconType="circle" iconSize={8} />
                <Bar dataKey="allocated" fill="#4f46e5" radius={[6,6,0,0]} name="Allocated" />
                <Bar dataKey="returned"  fill="#22c55e" radius={[6,6,0,0]} name="Returned" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ChartCard title="Asset Growth Trend" subtitle="Total registered assets over time">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={assetTrend}>
                <GradDef id="assetGrad" color="#4f46e5" />
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[55, 75]} />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={2.5} fill="url(#assetGrad)" name="Total Assets" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Assets by Location" subtitle="Distribution across sites">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={locationData} cx="50%" cy="50%" outerRadius={85} innerRadius={38} dataKey="value"
                label={({ name }: { name: string }) => name} labelLine={false}>
                {locationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        <ChartCard title="Assets by Department" subtitle="Current distribution">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={55} />
              <Tooltip />
              <Bar dataKey="assets" fill="#6366f1" radius={[0,6,6,0]} name="Assets" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Asset Value Depreciation" subtitle="Portfolio value over time (₹)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={depreciationData}>
              <GradDef id="deprGrad" color="#ef4444" />
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => `₹${(v/1000).toFixed(0)}K`} />
              <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fill="url(#deprGrad)" name="Value" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <SectionCard title="Recent Asset Allocations" subtitle="Latest assignments" action={<ViewAll />}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <THead cols={["Asset Tag","Device","Assigned To","Department","Date","Status"]} />
                <tbody>
                  {(
                    [
                      ["LAP-001",  "Dell Latitude 7430","John Doe",      "IT",      "12 Apr 2026","ACTIVE",   "green"],
                      ["TAB-004",  "iPad Pro 12.9",     "Bittu Kumar",   "Design",  "10 Apr 2026","ACTIVE",   "green"],
                      ["DESK-009", "HP EliteDesk",      "Danish Naseem", "Finance", "08 Apr 2026","OVERDUE",  "red"],
                      ["SRV-002",  "Dell PowerEdge",    "Zeeshan Ahmed", "IT",      "05 Apr 2026","ACTIVE",   "green"],
                      ["PRN-007",  "Canon LaserJet",    "Rahul Singh",   "HR",      "01 Apr 2026","RETURNED", "gray"],
                    ] as [string,string,string,string,string,string,BadgeColor][]
                  ).map(([tag,device,user,dept,date,status,color],i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-semibold text-indigo-600 text-sm">{tag}</td>
                      <td className="py-3 pr-4 text-gray-700">{device}</td>
                      <td className="py-3 pr-4 text-gray-600">{user}</td>
                      <td className="py-3 pr-4 text-gray-500 text-xs">{dept}</td>
                      <td className="py-3 pr-4 text-gray-400 text-xs whitespace-nowrap">{date}</td>
                      <td className="py-3"><Badge label={status} color={color} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Live Activity" subtitle="Real-time asset events" action={<ViewAll />}>
          <ActivityItem icon={<Package size={14} className="text-indigo-500"/>}      iconBg="bg-indigo-50"  title="Asset Allocated"   sub="LAP-001 → John Doe"      time="2m ago"  badge="allocation" badgeColor="blue"/>
          <ActivityItem icon={<ShieldCheck size={14} className="text-yellow-500"/>}  iconBg="bg-yellow-50" title="Gate Pass Created"  sub="GP-2026-0012 pending"    time="15m ago" badge="gatepass"   badgeColor="yellow"/>
          <ActivityItem icon={<CheckCircle2 size={14} className="text-green-500"/>}  iconBg="bg-green-50"  title="Asset Returned"    sub="TAB-003 ← Bittu Kumar"  time="1h ago"  badge="return"     badgeColor="green"/>
          <ActivityItem icon={<AlertTriangle size={14} className="text-red-500"/>}   iconBg="bg-red-50"    title="Warranty Expired"  sub="SRV-001 needs renewal"  time="2h ago"  badge="alert"      badgeColor="red"/>
          <ActivityItem icon={<ArrowLeftRight size={14} className="text-blue-500"/>} iconBg="bg-blue-50"   title="Asset Transferred" sub="MON-005 IT → Finance"   time="3h ago"  badge="transfer"   badgeColor="blue"/>
        </SectionCard>
      </div>

      <div className="grid xl:grid-cols-4 gap-5">
        <SectionCard title="Asset Status" subtitle="Current breakdown">
          <ProgressRow label="Active"      value={41} max={72} color="bg-green-500"  count={41}/>
          <ProgressRow label="Available"   value={31} max={72} color="bg-blue-500"   count={31}/>
          <ProgressRow label="Maintenance" value={4}  max={72} color="bg-yellow-400" count={4}/>
          <ProgressRow label="Disposed"    value={2}  max={72} color="bg-gray-400"   count={2}/>
        </SectionCard>

        <SectionCard title="Warranty Status" subtitle="Expiry overview">
          <ProgressRow label="Valid"         value={50} max={72} color="bg-green-400"  count={50}/>
          <ProgressRow label="Expiring Soon" value={13} max={72} color="bg-yellow-400" count={13}/>
          <ProgressRow label="Expired"       value={9}  max={72} color="bg-red-400"    count={9}/>
        </SectionCard>

        <SectionCard title="Gate Passes" subtitle="This month">
          {(
            [["Pending",6,"yellow"],["Approved",8,"blue"],["Issued",5,"purple"],["Returned",4,"green"],["Rejected",2,"red"]] as [string,number,BadgeColor][]
          ).map(([label,count,color]) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600">{label}</span>
              <Badge label={count} color={color}/>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Quick Stats" subtitle="At a glance">
          {[
            {label:"Avg Asset Age",    val:"2.4 yrs", icon:<Clock    size={13} className="text-gray-400"/>},
            {label:"Utilization Rate", val:"57%",     icon:<Activity size={13} className="text-gray-400"/>},
            {label:"Locations",        val:"6",        icon:<MapPin   size={13} className="text-gray-400"/>},
            {label:"New This Month",   val:"+4",       icon:<Zap      size={13} className="text-gray-400"/>},
            {label:"Departments",      val:"8",        icon:<Users    size={13} className="text-gray-400"/>},
          ].map(({label,val,icon}) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="flex items-center gap-2 text-sm text-gray-500">{icon}{label}</span>
              <span className="text-sm font-bold text-gray-800">{val}</span>
            </div>
          ))}
        </SectionCard>
      </div>

      <SectionCard title="Gate Pass Records" subtitle="All recent asset movements"
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50"><Filter size={11}/> Filter</button>
            <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50"><Download size={11}/> Export</button>
          </div>
        }>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["Gate Pass #","Asset","Type","Purpose","Carrier","Status","Date"]}/>
            <tbody>
              {(
                [
                  ["GP-2026-0001","LAPTOP-2025-001","Latitude 7430",  "OUT","Client Meeting",    "John Doe",     "PENDING",  "yellow","03 Apr 2026"],
                  ["GP-2026-0002","TABLET-2025-001","iPad Pro 12.9",  "OUT","Site Inspection",   "Danish Naseem","APPROVED", "blue",  "04 Apr 2026"],
                  ["GP-2026-0003","PRJ-2025-001",   "Epson Projector","IN", "Return after event","Zeeshan Ahmed","ISSUED",   "purple","02 Apr 2026"],
                  ["GP-2026-0004","SWITCH-2025-001","Cisco 9300",     "OUT","Network setup",     "Bittu Kumar",  "REJECTED", "red",   "01 Apr 2026"],
                ] as [string,string,string,string,string,string,string,BadgeColor,string][]
              ).map(([gp,asset,sub,type,purpose,carrier,status,sColor,date]) => (
                <tr key={gp} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-indigo-600">{gp}</td>
                  <td className="py-3 pr-4"><div className="font-medium text-gray-700">{asset}</div><div className="text-xs text-gray-400">{sub}</div></td>
                  <td className="py-3 pr-4"><TypeBadge type={type}/></td>
                  <td className="py-3 pr-4 text-gray-600">{purpose}</td>
                  <td className="py-3 pr-4 text-gray-500">{carrier}</td>
                  <td className="py-3 pr-4"><Badge label={status} color={sColor}/></td>
                  <td className="py-3 text-gray-400 text-xs whitespace-nowrap">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Asset Inventory" subtitle="All registered assets with current status" action={<ViewAll />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["Asset Tag","Device Name","Category","Location","Assigned To","Purchase Date","Value","Status"]}/>
            <tbody>
              {(
                [
                  ["LAPTOP-2025-001","Dell Latitude 7430",  "Laptop",     "Head Office",   "John Doe",     "2025-01-15","₹85,000",   "ALLOCATED","orange"],
                  ["SWITCH-2025-001","Cisco Catalyst 9300", "Networking", "Branch Mumbai", "IT Team",      "2025-02-10","₹1,20,000", "ALLOCATED","orange"],
                  ["UPS-2025-001",   "APC Smart-UPS",       "Power",      "Warehouse",     "—",            "2025-03-05","₹25,000",   "AVAILABLE","green"],
                  ["PRJ-2025-001",   "Epson Projector",     "AV",         "Branch Delhi",  "Finance Dept", "2025-01-20","₹45,000",   "AVAILABLE","green"],
                  ["TAB-2025-001",   "iPad Pro 12.9",       "Tablet",     "Head Office",   "Bittu Kumar",  "2025-04-01","₹70,000",   "ALLOCATED","orange"],
                ] as [string,string,string,string,string,string,string,string,BadgeColor][]
              ).map(([tag,name,cat,loc,user,date,val,status,sColor],i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-indigo-600 text-xs">{tag}</td>
                  <td className="py-3 pr-4 font-medium text-gray-800">{name}</td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{cat}</td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{loc}</td>
                  <td className="py-3 pr-4 text-gray-600 text-xs">{user}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs whitespace-nowrap">{date}</td>
                  <td className="py-3 pr-4 text-gray-700 text-xs font-medium">{val}</td>
                  <td className="py-3"><Badge label={status} color={sColor}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

    </div>
  );
}

//  USER
function UserDashboard() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="My Assets"        value="3" icon={<Monitor size={20}/>}       sub="Currently assigned"  iconBg="bg-indigo-50" iconColor="text-indigo-600"/>
        <StatCard title="Pending Requests" value="1" icon={<ClipboardList size={20}/>}  sub="Awaiting approval"   iconBg="bg-yellow-50" iconColor="text-yellow-600"/>
        <StatCard title="Gate Passes"      value="2" icon={<ShieldCheck size={20}/>}    sub="Active passes"       iconBg="bg-blue-50"   iconColor="text-blue-600"/>
        <StatCard title="Return Due"       value="1" icon={<Clock size={20}/>}           trend="Due in 3 days"    trendUp={false} iconBg="bg-red-50" iconColor="text-red-500"/>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        <ChartCard title="My Assets by Type" subtitle="Current allocation">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={userAssetData} cx="50%" cy="50%" outerRadius={85} innerRadius={38} dataKey="value"
                label={({ name }: { name: string }) => name}>
                {userAssetData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="My Asset Value" subtitle="Current portfolio worth">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{name:"Laptop",value:85000},{name:"Phone",value:70000},{name:"Monitor",value:15000}]} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
              <XAxis dataKey="name" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}} tickFormatter={(v)=>`₹${(v/1000).toFixed(0)}K`}/>
              <Tooltip formatter={(v:number)=>`₹${v.toLocaleString()}`}/>
              <Bar dataKey="value" fill="#4f46e5" radius={[6,6,0,0]} name="Value"/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <SectionCard title="My Assigned Assets" subtitle="Full inventory assigned to you">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <THead cols={["Type","Model","Asset Tag","Since","Warranty Expiry","Status"]}/>
                <tbody>
                  {(
                    [
                      ["Laptop",  "Dell Latitude 7430","LAP-007","Jan 2026","2027-01-15","green"],
                      ["Phone",   "iPhone 14 Pro",      "PHN-003","Mar 2026","2028-03-10","green"],
                      ["Monitor", "LG 24 inch",         "MON-011","Feb 2026","2026-08-20","yellow"],
                    ] as [string,string,string,string,string,BadgeColor][]
                  ).map(([type,model,tag,since,warranty,color],i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 text-gray-500">{type}</td>
                      <td className="py-3 pr-4 font-medium text-gray-800">{model}</td>
                      <td className="py-3 pr-4 font-semibold text-indigo-600">{tag}</td>
                      <td className="py-3 pr-4 text-gray-400 text-xs">{since}</td>
                      <td className="py-3 pr-4"><Badge label={warranty} color={color}/></td>
                      <td className="py-3"><Badge label="ACTIVE" color="green"/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="My Asset Activity" subtitle="Recent events on your assets">
          <ActivityItem icon={<Package size={14} className="text-indigo-500"/>}      iconBg="bg-indigo-50"  title="Laptop Assigned"    sub="Dell Latitude 7430 allocated"    time="Jan 2026"   badge="allocated" badgeColor="blue"/>
          <ActivityItem icon={<ShieldCheck size={14} className="text-blue-500"/>}    iconBg="bg-blue-50"    title="Gate Pass Issued"   sub="Laptop taken out — Client visit" time="5 days ago" badge="gatepass"  badgeColor="blue"/>
          <ActivityItem icon={<CheckCircle2 size={14} className="text-green-500"/>}  iconBg="bg-green-50"   title="Gate Pass Returned" sub="Laptop back in premises"         time="4 days ago" badge="returned"  badgeColor="green"/>
          <ActivityItem icon={<AlertTriangle size={14} className="text-yellow-500"/>} iconBg="bg-yellow-50" title="Warranty Alert"     sub="Monitor warranty expiring soon"  time="1 wk ago"   badge="alert"     badgeColor="yellow"/>
        </SectionCard>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        <SectionCard title="My Gate Passes" subtitle="Asset movement history" action={<ViewAll />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <THead cols={["Pass #","Asset","Type","Purpose","Date","Status"]}/>
              <tbody>
                {(
                  [
                    ["GP-2026-0001","LAP-007","OUT","Client Meeting",   "03 Apr 2026","RETURNED","green"],
                    ["GP-2026-0008","PHN-003","OUT","Off-site work",    "10 Apr 2026","APPROVED","blue"],
                    ["GP-2026-0015","LAP-007","OUT","Training session", "14 Apr 2026","PENDING", "yellow"],
                  ] as [string,string,string,string,string,string,BadgeColor][]
                ).map(([gp,asset,type,purpose,date,status,sColor],i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 pr-4 font-semibold text-indigo-600 text-xs">{gp}</td>
                    <td className="py-3 pr-4 text-gray-700">{asset}</td>
                    <td className="py-3 pr-4"><TypeBadge type={type}/></td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{purpose}</td>
                    <td className="py-3 pr-4 text-gray-400 text-xs whitespace-nowrap">{date}</td>
                    <td className="py-3"><Badge label={status} color={sColor}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Upcoming Returns & Alerts" subtitle="Action items">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div>
              <p className="text-sm font-semibold text-gray-700">Dell Latitude 7430</p>
              <p className="text-xs text-gray-400">LAP-007 — Return due 15 Apr 2026</p>
            </div>
            <Badge label="Due Soon" color="yellow"/>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div>
              <p className="text-sm font-semibold text-gray-700">LG Monitor Warranty</p>
              <p className="text-xs text-gray-400">MON-011 — Expires Aug 2026</p>
            </div>
            <Badge label="Expiring" color="orange"/>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Gate Pass Pending</p>
              <p className="text-xs text-gray-400">GP-2026-0015 — Awaiting approval</p>
            </div>
            <Badge label="Pending" color="blue"/>
          </div>
        </SectionCard>
      </div>

    </div>
  );
}


//  MANAGER
function ManagerDashboard() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Dept Assets"      value="22"    icon={<Package size={20}/>}       sub="IT Department"      iconBg="bg-indigo-50" iconColor="text-indigo-600"/>
        <StatCard title="Allocated"        value="18"    icon={<ClipboardList size={20}/>}  trend="82% utilized"     trendUp  iconBg="bg-blue-50"   iconColor="text-blue-600"/>
        <StatCard title="Available"        value="4"     icon={<CheckCircle2 size={20}/>}   sub="Ready to assign"    iconBg="bg-green-50"  iconColor="text-green-600"/>
        <StatCard title="Dept Value"       value="₹3.2L" icon={<TrendingUp size={20}/>}     sub="Current portfolio"  iconBg="bg-purple-50" iconColor="text-purple-600"/>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Team Members"      value="12" icon={<Users size={20}/>}           sub="Active users"       iconBg="bg-teal-50"   iconColor="text-teal-600"/>
        <StatCard title="Gate Passes"       value="3"  icon={<ShieldCheck size={20}/>}     sub="This month"         iconBg="bg-yellow-50" iconColor="text-yellow-600"/>
        <StatCard title="Expiring Warranty" value="2"  icon={<AlertTriangle size={20}/>}   sub="Next 30 days"       iconBg="bg-orange-50" iconColor="text-orange-600"/>
        <StatCard title="Return Overdue"    value="1"  icon={<Clock size={20}/>}            trend="Action needed"   trendUp={false} iconBg="bg-red-50" iconColor="text-red-500"/>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        <ChartCard title="Department Asset Allocation" subtitle="Monthly trend by sub-team">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={managerDeptAlloc} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
              <XAxis dataKey="month" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/><Legend iconType="circle" iconSize={8}/>
              <Bar dataKey="it"      fill="#4f46e5" radius={[4,4,0,0]} name="IT"/>
              <Bar dataKey="hr"      fill="#22c55e" radius={[4,4,0,0]} name="HR"/>
              <Bar dataKey="finance" fill="#f59e0b" radius={[4,4,0,0]} name="Finance"/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Asset Category (My Dept)" subtitle="Breakdown by device type">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{name:"Laptop",value:10},{name:"Desktop",value:5},{name:"Networking",value:4},{name:"Printer",value:3}]}
                cx="50%" cy="50%" outerRadius={85} innerRadius={38} dataKey="value"
                label={({name}:{name:string})=>name} labelLine={false}>
                {[0,1,2,3].map((i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <SectionCard title="Team Asset Allocations" subtitle="All assets assigned to your team" action={<ViewAll/>}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <THead cols={["Asset Tag","Device","Assigned To","Since","Return Date","Status"]}/>
                <tbody>
                  {(
                    [
                      ["LAP-001", "Dell Latitude 7430", "John Doe",      "Jan 2026","Permanent",   "ACTIVE",  "green"],
                      ["LAP-003", "Lenovo ThinkPad",    "Priya Sharma",  "Feb 2026","Permanent",   "ACTIVE",  "green"],
                      ["DESK-002","HP EliteDesk 800",   "Raj Patel",     "Mar 2026","Permanent",   "ACTIVE",  "green"],
                      ["SWT-001", "Cisco Switch 2960",  "IT Team",       "Jan 2026","Permanent",   "ACTIVE",  "green"],
                      ["LAP-009", "MacBook Pro M2",     "Danish Naseem", "Apr 2026","15 May 2026", "OVERDUE", "red"],
                    ] as [string,string,string,string,string,string,BadgeColor][]
                  ).map(([tag,device,user,since,ret,status,color],i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-semibold text-indigo-600 text-xs">{tag}</td>
                      <td className="py-3 pr-4 text-gray-700">{device}</td>
                      <td className="py-3 pr-4 text-gray-600">{user}</td>
                      <td className="py-3 pr-4 text-gray-400 text-xs">{since}</td>
                      <td className="py-3 pr-4 text-gray-400 text-xs whitespace-nowrap">{ret}</td>
                      <td className="py-3"><Badge label={status} color={color}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Asset Status" subtitle="My department">
            <ProgressRow label="Allocated"   value={18} max={22} color="bg-blue-500"   count={18}/>
            <ProgressRow label="Available"   value={4}  max={22} color="bg-green-500"  count={4}/>
            <ProgressRow label="Maintenance" value={1}  max={22} color="bg-yellow-400" count={1}/>
          </SectionCard>

          <SectionCard title="Recent Events" subtitle="Dept asset activity">
            <ActivityItem icon={<Package size={14} className="text-indigo-500"/>}      iconBg="bg-indigo-50"  title="Asset Allocated" sub="LAP-009 → Danish"      time="2d ago" badge="new"     badgeColor="blue"/>
            <ActivityItem icon={<AlertTriangle size={14} className="text-red-500"/>}   iconBg="bg-red-50"     title="Return Overdue"  sub="LAP-009 past due date" time="1d ago" badge="overdue" badgeColor="red"/>
            <ActivityItem icon={<ShieldCheck size={14} className="text-yellow-500"/>}  iconBg="bg-yellow-50"  title="Gate Pass"       sub="GP-2026-0022 pending"  time="5h ago" badge="pending" badgeColor="yellow"/>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Department Gate Passes" subtitle="Asset movements for your team" action={<ViewAll/>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["Pass #","Asset","Carried By","Type","Purpose","Date","Status"]}/>
            <tbody>
              {(
                [
                  ["GP-2026-0018","LAP-001","Latitude 7430",  "John Doe",     "OUT","Client Demo",  "10 Apr 2026","RETURNED","green"],
                  ["GP-2026-0022","LAP-009","MacBook Pro M2", "Danish Naseem","OUT","Off-site work","14 Apr 2026","PENDING", "yellow"],
                  ["GP-2026-0025","SWT-001","Cisco Switch",   "IT Team",      "OUT","Branch setup", "15 Apr 2026","APPROVED","blue"],
                ] as [string,string,string,string,string,string,string,string,BadgeColor][]
              ).map(([gp,tag,device,user,type,purpose,date,status,sColor],i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-indigo-600 text-xs">{gp}</td>
                  <td className="py-3 pr-4"><div className="font-medium text-gray-700">{tag}</div><div className="text-xs text-gray-400">{device}</div></td>
                  <td className="py-3 pr-4 text-gray-600">{user}</td>
                  <td className="py-3 pr-4"><TypeBadge type={type}/></td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{purpose}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs whitespace-nowrap">{date}</td>
                  <td className="py-3"><Badge label={status} color={sColor}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

    </div>
  );
}

// DashboardPage
function DashboardPage() {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("role") as Role | null;
    if (saved && (["admin","user","manager"] as Role[]).includes(saved)) {
      setRole(saved);
    } else {
      setRole("user");
    }
  }, []);

  const meta: Record<Role, { title: string; avatarBg: string }> = {
    admin:   { title: "Admin Dashboard",    avatarBg: "bg-indigo-600" },
    user:    { title: "User Dashboard",     avatarBg: "bg-green-600"  },
    manager: { title: "Manager Dashboard",  avatarBg: "bg-orange-600" },
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  const { title} = meta[role];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
              <Package size={16} className="text-white" />
            </div>
          </div>
          <div className="h-5 w-px bg-gray-200" />
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">{title}</h1>
          </div>
        </div>
      </header>

      <main className="p-6">
        {role === "admin"   && <AdminDashboard />}
        {role === "user"    && <UserDashboard />}
        {role === "manager" && <ManagerDashboard />}
      </main>

    </div>
  );
}

export default DashboardPage