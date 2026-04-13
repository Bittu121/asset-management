// "use client";
// import { useRouter } from "next/navigation";
// import {
//   CubeIcon,
//   CheckCircleIcon,
//   WrenchScrewdriverIcon,
//   CurrencyRupeeIcon,
//   UserCircleIcon,
//   ExclamationTriangleIcon,
// } from "@heroicons/react/24/outline";

// function ActionBtn({ label, onClick }: any) {
//   return (
//     <button
//       onClick={onClick}
//       className="px-3 py-1.5 text-xs rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
//     >
//       {label}
//     </button>
//   );
// }

// export default function Dashboard() {
//   const router = useRouter();

//   const cards = [
//     {
//       title: "Total Assets",
//       value: 16,
//       icon: CubeIcon,
//       bg: "bg-indigo-50 border-indigo-100",
//       text: "text-indigo-600",
//     },
//     {
//       title: "Active",
//       value: 5,
//       icon: CheckCircleIcon,
//       bg: "bg-green-50 border-green-100",
//       text: "text-green-600",
//     },
//     {
//       title: "In Maintenance",
//       value: 1,
//       icon: WrenchScrewdriverIcon,
//       bg: "bg-amber-50 border-amber-100",
//       text: "text-amber-600",
//     },
//     {
//       title: "Total Value",
//       value: "₹8,000",
//       icon: CurrencyRupeeIcon,
//       bg: "bg-blue-50 border-blue-100",
//       text: "text-blue-600",
//     },
//     {
//       title: "Assigned",
//       value: 8,
//       icon: UserCircleIcon,
//       bg: "bg-purple-50 border-purple-100",
//       text: "text-purple-600",
//     },
//     {
//       title: "Warranty Issues",
//       value: 8,
//       icon: ExclamationTriangleIcon,
//       bg: "bg-red-50 border-red-100",
//       text: "text-red-600",
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         {/* LEFT */}
//         <div>
//           <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
//             Asset Dashboard
//           </h1>
//           <p className="text-xs sm:text-sm text-gray-500">
//             Manage assets, allocations, and lifecycle tracking
//           </p>
//         </div>

//         {/* RIGHT */}
//         <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//           {/* ACTION GROUP */}
//           <div className="flex flex-wrap items-center bg-gray-100 rounded-lg p-1 gap-2">
//             <button
//               onClick={() => router.push("/assets/asset")}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-indigo-100 border-indigo-500 text-indigo-600 hover:bg-indigo-200 transition"
//             >
//               + Add Assets
//             </button>

//             <button
//               onClick={() => router.push("/assets/asset-allocation")}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-green-100 border-gray-500 text-green-600 hover:bg-green-200 transition"
//             >
//               Asset Allocation
//             </button>

//             <button
//               onClick={() => router.push("/assets/asset-bulk-upload")}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-amber-100 border-amber-500 text-amber-600 hover:bg-amber-200 transition"
//             >
//               Bulk Upload
//             </button>

//             <button
//               onClick={() => router.push("/assets/asset-gate-pass")}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-purple-100 border-purple-500 text-purple-600 hover:bg-purple-200 transition"
//             >
//               Gate Pass
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full mt-10 mb-5">
//         {cards.map((card, i) => {
//           const Icon = card.icon;

//           return (
//             <div
//               key={i}
//               className="bg-white border border-gray-200 rounded-xl px-3 py-3 flex items-center justify-between hover:shadow-sm transition min-h-[70px]"
//             >
//               {/* LEFT */}
//               <div>
//                 <p className="text-[11px] text-gray-500 font-medium leading-tight">
//                   {card.title}
//                 </p>
//                 <h2 className="text-lg font-semibold text-gray-800 mt-1">
//                   {card.value}
//                 </h2>
//               </div>

//               {/* RIGHT ICON */}
//               <div
//                 className={`${card.bg} border p-1.5 rounded-md flex items-center justify-center`}
//               >
//                 <Icon className={`h-4 w-4 ${card.text}`} />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
//         <div className="bg-white border border-gray-200 rounded-xl p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">
//             Status Breakdown
//           </h3>

//           {[
//             { label: "Active", value: 5, color: "bg-green-500" },
//             { label: "Maintenance", value: 1, color: "bg-yellow-500" },
//             { label: "Retired", value: 0, color: "bg-gray-400" },
//             { label: "Disposed", value: 0, color: "bg-red-500" },
//           ].map((item, i) => (
//             <div key={i} className="flex items-center justify-between mb-3">
//               <div className="flex items-center gap-2">
//                 <span className={`w-2 h-2 rounded-full ${item.color}`} />
//                 <span className="text-sm text-gray-600">{item.label}</span>
//               </div>

//               <div className="flex items-center gap-2 w-28">
//                 <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div
//                     className={`${item.color} h-full`}
//                     style={{ width: `${item.value * 20}%` }}
//                   />
//                 </div>
//                 <span className="text-xs text-gray-500">{item.value}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="bg-white border border-gray-200 rounded-xl p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">
//             Warranty Status
//           </h3>

//           {[
//             { label: "Valid", value: 1, color: "text-green-600 bg-green-50" },
//             {
//               label: "Expiring Soon",
//               value: 0,
//               color: "text-yellow-600 bg-yellow-50",
//             },
//             { label: "Expired", value: 1, color: "text-red-600 bg-red-50" },
//             {
//               label: "No Warranty",
//               value: 14,
//               color: "text-gray-600 bg-gray-100",
//             },
//           ].map((item, i) => (
//             <div key={i} className="flex justify-between items-center mb-3">
//               <span className="text-sm text-gray-600">{item.label}</span>

//               <span
//                 className={`text-xs px-2 py-0.5 rounded-full ${item.color}`}
//               >
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div className="bg-white border border-gray-200 rounded-xl p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">
//             By Category
//           </h3>

//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Uncategorized</span>
//             <span className="text-sm font-medium text-gray-700">16</span>
//           </div>

//           <div className="mt-3 h-2 bg-gray-100 rounded-full">
//             <div className="h-2 bg-indigo-500 rounded-full w-full" />
//           </div>
//         </div>
//         <div className="bg-white border border-gray-200 rounded-xl p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">By Type</h3>

//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Other</span>
//             <span className="text-sm font-medium text-gray-700">16</span>
//           </div>

//           <div className="mt-3 h-2 bg-gray-100 rounded-full">
//             <div className="h-2 bg-gray-700 rounded-full w-full" />
//           </div>
//         </div>
//       </div>

//       {/* STATUS + WARRANTY */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* STATUS BREAKDOWN */}
//         <div className="bg-white border border-gray-200 rounded-xl p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">
//             Status Breakdown
//           </h3>

//           {[
//             { label: "Active", value: 5, color: "bg-green-500" },
//             { label: "Maintenance", value: 1, color: "bg-yellow-500" },
//             { label: "Retired", value: 0, color: "bg-gray-400" },
//             { label: "Disposed", value: 0, color: "bg-red-500" },
//           ].map((item, i) => (
//             <div key={i} className="flex items-center justify-between mb-3">
//               {/* Left */}
//               <div className="flex items-center gap-2">
//                 <span className={`w-2 h-2 rounded-full ${item.color}`} />
//                 <span className="text-sm text-gray-600">{item.label}</span>
//               </div>

//               {/* Right */}
//               <div className="flex items-center gap-3 w-32">
//                 <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div
//                     className={`${item.color} h-full`}
//                     style={{ width: `${item.value * 20}%` }}
//                   />
//                 </div>
//                 <span className="text-xs text-gray-500">{item.value}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* WARRANTY STATUS */}
//         <div className="bg-white border border-gray-200 rounded-xl p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">
//             Warranty Status
//           </h3>

//           {[
//             { label: "Valid", value: 1, style: "bg-green-50 text-green-600" },
//             {
//               label: "Expiring Soon",
//               value: 0,
//               style: "bg-yellow-50 text-yellow-600",
//             },
//             { label: "Expired", value: 1, style: "bg-red-50 text-red-600" },
//             {
//               label: "No Warranty",
//               value: 14,
//               style: "bg-gray-100 text-gray-600",
//             },
//           ].map((item, i) => (
//             <div key={i} className="flex justify-between items-center mb-3">
//               <span className="text-sm text-gray-600">{item.label}</span>

//               <span
//                 className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.style}`}
//               >
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* PREMIUM CARDS */}
//       <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
//         {/* VALUE */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
//           <h3 className="text-sm font-semibold text-gray-700">
//             Asset Value Overview
//           </h3>

//           <div className="flex justify-between">
//             <div>
//               <p className="text-xs text-gray-500">Total Purchase</p>
//               <h2 className="text-lg font-semibold text-gray-800">₹1,00,055</h2>
//             </div>

//             <div>
//               <p className="text-xs text-gray-500">Current Value</p>
//               <h2 className="text-lg font-semibold text-gray-800">₹89,110</h2>
//             </div>
//           </div>

//           <div className="border-t pt-3 flex justify-between text-sm">
//             <span className="text-gray-500">Depreciation</span>
//             <span className="text-red-500 font-medium">₹10,945 (10.9%)</span>
//           </div>
//         </div>

//         {/* ASSIGNMENT */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
//           <h3 className="text-sm font-semibold text-gray-700">
//             Assignment Overview
//           </h3>

//           <div className="flex justify-between">
//             <div>
//               <p className="text-xs text-gray-500">Assigned</p>
//               <h2 className="text-lg font-semibold text-gray-800">8</h2>
//             </div>

//             <div>
//               <p className="text-xs text-gray-500">Unassigned</p>
//               <h2 className="text-lg font-semibold text-gray-800">8</h2>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <div>
//               <div className="flex justify-between text-xs text-gray-500 mb-1">
//                 <span>Assigned</span>
//                 <span>50%</span>
//               </div>
//               <div className="h-2 bg-gray-100 rounded-full">
//                 <div className="h-2 bg-indigo-500 rounded-full w-1/2" />
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between text-xs text-gray-500 mb-1">
//                 <span>Unassigned</span>
//                 <span>50%</span>
//               </div>
//               <div className="h-2 bg-gray-100 rounded-full">
//                 <div className="h-2 bg-gray-400 rounded-full w-1/2" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import {
  CubeIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  CurrencyRupeeIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Types
type StatCard = {
  title: string;
  value: string | number;
  icon: any;
  iconBg: string;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
};

type QuickAction = {
  label: string;
  route: string;
  variant: "primary" | "secondary" | "tertiary" | "outline";
};

type StatusItem = {
  label: string;
  value: number;
  color: string;
  percentage: number;
};

type WarrantyItem = {
  label: string;
  value: number;
  badgeColor: string;
};

// Component: Stat Card
function StatCard({ card }: { card: StatCard }) {
  const Icon = card.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-1">
            {card.title}
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {card.value}
          </h3>
          {card.trend && (
            <div
              className={`inline-flex items-center text-xs font-medium ${
                card.trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>{card.trend.isPositive ? "↑" : "↓"}</span>
              <span className="ml-1">{card.trend.value}</span>
            </div>
          )}
        </div>
        <div className={`${card.iconBg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${card.iconColor}`} />
        </div>
      </div>
    </div>
  );
}

// Component: Quick Action Button
function QuickActionBtn({ action, onClick }: { action: QuickAction; onClick: () => void }) {
  const variants = {
    primary: "bg-slate-700 hover:bg-slate-800 text-white border-slate-700",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200",
    tertiary: "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200",
    outline: "bg-white hover:bg-gray-50 text-gray-700 border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors duration-200 ${variants[action.variant]}`}
    >
      {action.label}
    </button>
  );
}

// Component: Progress Bar
function ProgressBar({ percentage, color }: { percentage: number; color: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Component: Status Breakdown Card
function StatusBreakdown({ items }: { items: StatusItem[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          Status Breakdown
        </h3>
        <ChartBarIcon className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-700 font-medium">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.value}
              </span>
            </div>
            <ProgressBar percentage={item.percentage} color={item.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Warranty Status Card
function WarrantyStatus({ items }: { items: WarrantyItem[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          Warranty Status
        </h3>
        <ClockIcon className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-700">{item.label}</span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${item.badgeColor}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Category Distribution Card
function CategoryCard({ title, count, icon: Icon }: { title: string; count: number; icon: any }) {
  const total = 16;
  const percentage = (count / total) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Items</span>
          <span className="text-2xl font-bold text-gray-900">{count}</span>
        </div>
        <ProgressBar percentage={percentage} color="bg-slate-600" />
        <p className="text-xs text-gray-500 text-right">
          {percentage.toFixed(0)}% of total assets
        </p>
      </div>
    </div>
  );
}

// Component: Value Overview Card
function ValueOverview() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-5">
        Asset Value Overview
      </h3>

      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Purchase</p>
          <h4 className="text-2xl font-bold text-gray-900">₹1,00,055</h4>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Current Value</p>
          <h4 className="text-2xl font-bold text-gray-900">₹89,110</h4>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Depreciation</span>
          <div className="text-right">
            <span className="text-lg font-semibold text-red-600">₹10,945</span>
            <span className="text-xs text-red-500 ml-2">(10.9%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Assignment Overview Card
function AssignmentOverview() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-5">
        Assignment Overview
      </h3>

      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <p className="text-xs text-gray-500 mb-1">Assigned</p>
          <h4 className="text-2xl font-bold text-gray-900">8</h4>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Unassigned</p>
          <h4 className="text-2xl font-bold text-gray-900">8</h4>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-600">Assigned</span>
            <span className="text-xs font-semibold text-slate-700">50%</span>
          </div>
          <ProgressBar percentage={50} color="bg-slate-600" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-600">Unassigned</span>
            <span className="text-xs font-semibold text-gray-600">50%</span>
          </div>
          <ProgressBar percentage={50} color="bg-gray-400" />
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component

function Dashboard() {
  const router = useRouter();

  // Data
  const statCards: StatCard[] = [
    {
      title: "Total Assets",
      value: 16,
      icon: CubeIcon,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
      trend: { value: "12% vs last month", isPositive: true },
    },
    {
      title: "Active Assets",
      value: 5,
      icon: CheckCircleIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      trend: { value: "3 newly added", isPositive: true },
    },
    {
      title: "In Maintenance",
      value: 1,
      icon: WrenchScrewdriverIcon,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
    },
    {
      title: "Total Value",
      value: "₹89,110",
      icon: CurrencyRupeeIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      trend: { value: "10.9% depreciation", isPositive: false },
    },
    {
      title: "Assigned",
      value: 8,
      icon: UserCircleIcon,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-700",
    },
    {
      title: "Issues",
      value: 8,
      icon: ExclamationTriangleIcon,
      iconBg: "bg-red-100",
      iconColor: "text-red-700",
    },
  ];

  const quickActions: QuickAction[] = [
    { label: "Add Asset", route: "/assets/asset", variant: "primary" },
    { label: "Asset Allocation", route: "/assets/asset-allocation", variant: "secondary" },
    { label: "Bulk Upload", route: "/assets/asset-bulk-upload", variant: "tertiary" },
    { label: "Gate Pass", route: "/assets/asset-gate-pass", variant: "outline" },
  ];

  const statusItems: StatusItem[] = [
    { label: "Active", value: 5, color: "bg-green-500", percentage: 31 },
    { label: "Maintenance", value: 1, color: "bg-amber-500", percentage: 6 },
    { label: "Retired", value: 0, color: "bg-gray-400", percentage: 0 },
    { label: "Disposed", value: 0, color: "bg-red-500", percentage: 0 },
  ];

  const warrantyItems: WarrantyItem[] = [
    { label: "Valid", value: 1, badgeColor: "bg-green-50 text-green-700 border border-green-200" },
    { label: "Expiring Soon", value: 0, badgeColor: "bg-amber-50 text-amber-700 border border-amber-200" },
    { label: "Expired", value: 1, badgeColor: "bg-red-50 text-red-700 border border-red-200" },
    { label: "No Warranty", value: 14, badgeColor: "bg-gray-50 text-gray-700 border border-gray-200" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Asset Management Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitor and manage your organization's assets in real-time
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <QuickActionBtn
                key={index}
                action={action}
                onClick={() => router.push(action.route)}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((card, index) => (
            <StatCard key={index} card={card} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatusBreakdown items={statusItems} />
          <WarrantyStatus items={warrantyItems} />
          <CategoryCard title="By Category" count={16} icon={ChartBarIcon} />
          <CategoryCard title="By Type" count={16} icon={CubeIcon} />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ValueOverview />
          <AssignmentOverview />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
