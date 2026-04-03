"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Users,
  MapPin,
  Building2,
  Layers,
  Tag,
  Truck,
  LifeBuoy,
  Menu,
  Boxes,
  Laptop,
  UserCheck,
  UploadCloud,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  Wrench,
  ClipboardList,
  BarChart3,
} from "lucide-react";

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

function Sidebar({ onCollapseChange }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>("Admin");
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapseChange?.(next);
  };

  const role = localStorage.getItem("role") || "admin";

  const isAdmin = role === "admin" || role === "superadmin";
  const isTechnician = role === "technician" || role === "superadmin";
  const isUser = role === "user";

  const getDashboardPath = () => {
    if (role === "superadmin" || role === "admin") return "/admin";
    if (role === "technician") return "/technician";
    return "/end-user";
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: getDashboardPath(),
    },

    ...(isAdmin
      ? [
          {
            name: "Assets",
            icon: Boxes,
            children: [
              { name: "Overview", path: "/assets", icon: LayoutDashboard },
              { name: "Asset List", path: "/assets/asset", icon: Laptop },
              {
                name: "Allocations",
                path: "/assets/asset-allocation",
                icon: UserCheck,
              },
              {
                name: "Bulk Import",
                path: "/assets/asset-bulk-upload",
                icon: UploadCloud,
              },
              {
                name: "Gate Pass",
                path: "/assets/asset-gate-pass",
                icon: ShieldCheck,
              },
              { name: "Reports", path: "/assets/reports", icon: BarChart3 },
            ],
          },
          {
            name: "Admin",
            icon: Layers,
            children: [
              { name: "Roles", path: "/admin/roles", icon: Users },
              {
                name: "Support Groups",
                path: "/admin/support-group",
                icon: LifeBuoy,
              },
              { name: "Users", path: "/admin/user-account", icon: Users },
              { name: "Locations", path: "/admin/location", icon: MapPin },
              {
                name: "Sub Locations",
                path: "/admin/sub-location",
                icon: MapPin,
              },
              {
                name: "Departments",
                path: "/admin/department",
                icon: Building2,
              },
              { name: "Units", path: "/admin/sub-department", icon: Building2 },
              {
                name: "Categories",
                path: "/admin/asset-categories",
                icon: Boxes,
              },
              {
                name: "Subcategories",
                path: "/admin/sub-categories",
                icon: Boxes,
              },
              { name: "Types", path: "/admin/asset-types", icon: Tag },
              { name: "Vendors", path: "/admin/vendor", icon: Truck },
            ],
          },
        ]
      : []),

    ...(isTechnician
      ? [
          {
            name: "Operations",
            icon: Users,
            children: [
              { name: "Overview", path: "/technician", icon: LayoutDashboard },
              { name: "My Assets", path: "/technician/asset", icon: Laptop },

              {
                name: "Allocations",
                path: "/technician/asset-allocation",
                icon: UserCheck,
              },
              {
                name: "Returns",
                path: "/technician/asset-returns",
                icon: RotateCcw,
              },
              {
                name: "Overdue",
                path: "/technician/asset-overdue",
                icon: AlertTriangle,
              },

              {
                name: "Gate Pass",
                path: "/technician/asset-gate-pass",
                icon: ShieldCheck,
              },

              {
                name: "Asset History",
                path: "/technician/asset-history",
                icon: ClipboardList,
              },
            ],
          },
        ]
      : []),

    ...(isUser
      ? [
          {
            name: "My Workspace",
            icon: Users,
            children: [
              { name: "Overview", path: "/end-user", icon: LayoutDashboard },
              { name: "My Assets", path: "/end-user/assets", icon: Laptop },

              {
                name: "Requests",
                path: "/end-user/requests",
                icon: ClipboardList,
              },
              {
                name: "Gate Pass",
                path: "/end-user/gate-pass",
                icon: ShieldCheck,
              },
            ],
          },
        ]
      : []),
  ];

  const isActive = (path?: string) => pathname === path;

  return (
    <>
      <div
        className={`h-screen ${
          collapsed ? "w-20" : "w-72"
        } bg-linear-to-b from-[#0f172a] via-[#111827] to-[#020617] border-r border-white/10 text-gray-300 px-3 py-6 flex flex-col
        transition-all duration-300`}
      >
        <div
          className={`flex items-center mb-10 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <div className="cursor-pointer flex items-center gap-2">
              <h1 className="text-white font-semibold text-base tracking-wide">
                Asset Management
              </h1>
            </div>
          )}

          <Menu
            size={20}
            className="cursor-pointer text-gray-400 hover:text-white transition"
            onClick={handleToggle}
          />
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openMenu === item.name;

            return (
              <div key={index}>
                {/* Parent */}
                <div
                  onClick={() => {
                    if (item.children) {
                      toggleMenu(item.name);
                    } else if (item.path) {
                      router.push(item.path);
                    }
                  }}
                  className={`flex items-center ${
                    collapsed ? "justify-center px-0" : "justify-between px-3"
                  } py-2.5 rounded-xl cursor-pointer transition group
                ${
                  isActive(item.path)
                    ? "bg-linear-to-r from-blue-600/20 to-indigo-600/20 text-white shadow-inner"
                    : "hover:bg-white/5 hover:text-white"
                }`}
                >
                  <div
                    className={`flex items-center ${
                      collapsed ? "justify-center w-full" : "gap-3"
                    }`}
                  >
                    <Icon
                      size={collapsed ? 20 : 18}
                      className={`transition ${
                        isActive(item.path)
                          ? "text-blue-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    {!collapsed && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </div>

                  {!collapsed &&
                    item.children &&
                    (isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}

                  {/* Tooltip */}
                  {collapsed && (
                    <span className="absolute left-20 bg-black px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100">
                      {item.name}
                    </span>
                  )}
                </div>

                {/* Children */}
                {item.children && isOpen && !collapsed && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {item.children.map((child, i) => {
                      const ChildIcon = child.icon;
                      return (
                        <div
                          key={i}
                          onClick={() => router.push(child.path)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all${
                            isActive(child.path)
                              ? "bg-blue-500/10 text-blue-400"
                              : "hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <ChildIcon size={16} />
                          <span>{child.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
