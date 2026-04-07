"use client";
import React, { useState } from "react";
import AddRoles from "./AddRoles";
import UpdateRoles from "./UpdateRoles";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";

type Role = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string[];
  createdAt: string;
};

function Roles() {
  const [role, setRole] = useState<Role[]>([
    {
      id: 1,
      name: "ADMIN",
      description: "Full system access",
      isActive: true,
      permissions: ["Create Incident", "Delete Asset"],
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "MANAGER",
      description: "Manage team operations",
      isActive: true,
      permissions: ["Create Incident"],
      createdAt: new Date().toDateString(),
    },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<Role | null>(null);

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleAndPermissionFilter, setRoleAndPermissionFilter] = useState("");

  //filter step-2
  const filteredRoleAndPermission = role.filter((rol) => {
    const matchesSearch =
      search === "" ||
      rol.name.toLowerCase().includes(search.toLowerCase()) ||
      rol.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && rol.isActive) ||
      (statusFilter === "Inactive" && !rol.isActive);
    const matchesRole =
      roleAndPermissionFilter === "" || rol.name === roleAndPermissionFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  //pagination step-2
  const totalPages = Math.ceil(filteredRoleAndPermission.length / itemsPerPage);
  const paginatedRoles = filteredRoleAndPermission.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //api call
  const handleAddRoles = (data: Omit<Role, "id" | "createdAt">) => {
    const newRole: Role = {
      ...data,
      id: role.length + 1,
      createdAt: new Date().toDateString(),
    };
    setRole((prev) => [newRole, ...prev]);
    toast.success("Role added successfully");
  };

  const handleEdit = (rol: Role) => {
    setSelectedRoles(rol);
    setIsUpdateOpen(true);
  };

  //api call
  const handleUpdateRoles = (updatedData: Role) => {
    setRole((prev) =>
      prev.map((r) =>
        r.id === selectedRoles?.id ? { ...r, ...updatedData } : r,
      ),
    );
    toast.success("Role updated successfully");
  };

  //Delete Api
  const handleDelete = (id: number) => {
    toast.success("User role deleted successfully");
    setRole((prev) => prev.filter((r) => r.id !== id));
  };

  const bulkUploadHandler = () => {};

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            Roles & Permissions
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400
              focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={roleAndPermissionFilter}
              onChange={(e) => setRoleAndPermissionFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select Roles & Permissions</option>
              {role.map((rol) => (
                <option key={rol.id} value={rol.name}>
                  {rol.name}
                </option>
              ))}
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <ExcelActions
              data={role}
              fileName="asset-subcategories"
              headers={[
                "ID",
                "Role Name",
                "Description",
                "Permissions",
                "Status",
              ]}
              onUpload={bulkUploadHandler}
            />

            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-normal rounded-md bg-black text-white hover:bg-gray-900"
            >
              <GoPlusCircle size={18} />
              Create
            </button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-4">ID</th>
              <th className="text-left px-6 py-4">Role Name</th>
              <th className="text-left px-6 py-4">Description</th>
              <th className="text-left px-6 py-4">Permissions</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedRoles?.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Roles & Permission Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Roles & Permission yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Add Roles & Permission
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedRoles.map((rol) => (
                <tr
                  key={rol.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {rol.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {rol.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {rol.description}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {rol.permissions.length} Permissions
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          rol.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {rol.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(rol)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(rol.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <AddRoles
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddRoles}
      />
      <UpdateRoles
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedRoles={selectedRoles}
        onUpdate={handleUpdateRoles}
      />{" "}
      <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Roles;
