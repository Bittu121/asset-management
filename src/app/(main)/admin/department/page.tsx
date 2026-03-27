"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import AddDepartmentModal from "./AddDepartmentModal";
import UpdateDepartmentModal from "./UpdateDepartmentModal";

type Department = {
  id: number;
  name: string;
  code: string;
  head: string;
  createdAt: string;
};

function Department() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Accounts",
      code: "CC-ACC",
      head: "admin@gmail.com",
      createdAt: "Dec 17, 2025",
    },
    {
      id: 2,
      name: "Administration",
      code: "CC-ADMIN",
      head: "",
      createdAt: "Dec 17, 2025",
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const handleAdd = (data: Omit<Department, "id" | "createdAt">) => {
    const newDept: Department = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toDateString(),
    };
    setDepartments((prev) => [newDept, ...prev]);
  };

  const handleEdit = (dept: Department) => {
    setSelectedDept(dept);
    setIsUpdateOpen(true);
  };

  const handleUpdate = (updatedData: any) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === selectedDept?.id ? { ...d, ...updatedData } : d,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <>
      <div className="p-6 bg-[#f8fafc] min-h-screen">
        <div className="mb-6">
          {/* Row 1: Title + Add Button */}
          <div className="flex justify-between items-center mb-4">
            {/* Left: Title */}
            <h1 className="text-2xl font-semibold text-gray-900">
              Departments
            </h1>

            {/* Right: Add Button */}
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              + Add Department
            </button>
          </div>

          {/* Row 2: Search + Filter (LEFT ALIGNED) */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              placeholder="Search departments..."
              className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filter */}
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All Departments</option>
              <option>Assigned</option>
              <option>Unassigned</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            {/* Header */}
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="text-left px-6 py-4 font-medium">Department</th>
                <th className="text-left px-6 py-4">Code</th>
                <th className="text-left px-6 py-4">Head</th>
                <th className="text-left px-6 py-4">Created</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              {departments.map((dept) => (
                <tr
                  key={dept.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  {/* Department */}
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {dept.name}
                    </div>
                  </td>

                  {/* Code */}
                  <td className="px-6 py-5 text-sm text-gray-600">
                    {dept.code}
                  </td>

                  {/* Head */}
                  <td className="px-6 py-5">
                    {dept.head ? (
                      <span className="text-sm text-gray-700">{dept.head}</span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md">
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {dept.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(dept)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>

                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>

                      {/* Delete Icon */}
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <AddDepartmentModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />

        <UpdateDepartmentModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          department={selectedDept}
          onUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

export default Department;
