"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import AddDepartmentModal from "./AddDepartmentModal";
import UpdateDepartmentModal from "./UpdateDepartmentModal";
import Pagination from "../../../components/common/Pagination";
import { HiPencilSquare } from "react-icons/hi2";

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
    {
      id: 3,
      name: "HR",
      code: "CC-HR",
      head: "hr@gmail.com",
      createdAt: "Dec 17, 2025",
    },
    { id: 4, name: "IT", code: "CC-IT", head: "", createdAt: "Dec 17, 2025" },
    {
      id: 5,
      name: "Finance",
      code: "CC-FIN",
      head: "",
      createdAt: "Dec 17, 2025",
    },
    {
      id: 6,
      name: "Legal",
      code: "CC-LEGAL",
      head: "",
      createdAt: "Dec 17, 2025",
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const paginatedDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAdd = (data: Omit<Department, "id" | "createdAt">) => {
    //Add Api
    const newDept: Department = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toDateString(),
    };
    toast.success("Department added successfully");

    setDepartments((prev) => [newDept, ...prev]);
  };

  const handleEdit = (dept: Department) => {
    setSelectedDept(dept);
    setIsUpdateOpen(true);
  };

  const handleUpdate = (updatedData: any) => {
    //Update Api
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === selectedDept?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Department updated successfully");
  };

  const handleDelete = (id: number) => {
    //Delete Api
    toast.success("Department deleted successfully");
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <>
      <div className="p-4 bg-[#f8fafc] min-h-screen">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold text-gray-900">Departments</h1>

            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              + Add Department
            </button>
          </div>

          {/* Row 2: Search + Filter (LEFT ALIGNED) */}
          <div className="flex items-center gap-4">
            <input
              placeholder="Search..."
              className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filter */}
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All Departments</option>
              <option>Assigned</option>
              <option>Unassigned</option>
            </select>
            <button
              onClick={() => console.log("Bulk Upload Clicked")}
              className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Bulk Upload
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-md overflow-hidden"></div>

        <div className="bg-white rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="text-left px-6 py-4 ">ID</th>
                <th className="text-left px-6 py-4 ">Department</th>
                <th className="text-left px-6 py-4">Code</th>
                <th className="text-left px-6 py-4">Head</th>
                <th className="text-left px-6 py-4">Created</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              {paginatedDepartments.map((dept) => (
                <tr
                  key={dept.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {dept.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {dept.name}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {dept.code}
                  </td>

                  <td className="px-6 py-5">
                    {dept.head ? (
                      <span className="text-sm text-gray-700">{dept.head}</span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md">
                        Unassigned
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {dept.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(dept)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={19} />
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
        <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Department;
