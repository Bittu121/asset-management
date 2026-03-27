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
  Boxes,
  Layers,
  Tag,
  Truck,
  LifeBuoy,
  Menu,
} from "lucide-react";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>("Admin");
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const role = localStorage.getItem("role") || "admin";

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path:
        role === "admin"
          ? "/admin"
          : role === "technician"
            ? "/technician"
            : "/end-user",
    },

    ...(role === "admin"
      ? [
          {
            name: "Admin",
            icon: Layers,
            children: [
              {
                name: "User Account",
                path: "/admin/user-account",
                icon: Users,
              },
              {
                name: "Roles & Permissions",
                path: "/admin/roles",
                icon: Users,
              },
              { name: "Location", path: "/admin/location", icon: MapPin },
              {
                name: "Sub Location",
                path: "/admin/sub-location",
                icon: MapPin,
              },
              {
                name: "Department",
                path: "/admin/department",
                icon: Building2,
              },
              {
                name: "Sub Department",
                path: "/admin/sub-department",
                icon: Building2,
              },
              {
                name: "Asset Categories",
                path: "/admin/asset-categories",
                icon: Boxes,
              },
              {
                name: "Sub Categories",
                path: "/admin/sub-categories",
                icon: Boxes,
              },
              { name: "Asset Types", path: "/admin/asset-types", icon: Tag },
              { name: "Vendor", path: "/admin/vendor", icon: Truck },
              {
                name: "Support Group",
                path: "/admin/support-group",
                icon: LifeBuoy,
              },
            ],
          },
        ]
      : []),
    ...(role === "technician"
      ? [
          {
            name: "Technician",
            icon: Users,
            children: [
              { name: "Dashboard", path: "/technician", icon: LayoutDashboard },
              {
                name: "Assets",
                path: "/technician/technician-asset",
                icon: Layers,
              },
            ],
          },
        ]
      : []),

    ...(role === "user"
      ? [
          {
            name: "End User",
            icon: Users,
            children: [
              { name: "Dashboard", path: "/end-user", icon: LayoutDashboard },
              { name: "Requests", path: "/end-user/requests", icon: Layers },
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
          collapsed ? "w-20" : "w-80"
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
                Asset
              </h1>
            </div>
          )}

          <Menu
            size={20}
            className="cursor-pointer text-gray-400 hover:text-white transition"
            onClick={() => setCollapsed(!collapsed)}
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
