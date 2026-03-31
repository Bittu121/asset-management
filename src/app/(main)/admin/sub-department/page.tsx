"use client";
import React, { useState } from "react";
import AddSubDepartment from "./AddSubDepartment";
import UpdateSubDepartment from "./UpdateSubDepartment";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type SubDepartment = {
  id: number;
  name: string;
  parentDepartment: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
};

function SubDepartment() {
  const [subDepartment, setSubDepartment] = useState<SubDepartment[]>([
    {
      id: 1,
      name: "Visual Design",
      parentDepartment: "Accounts",
      description:
        "Handles UI/UX design, branding, and visual assets for digital products.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "Vendor Procurement",
      parentDepartment: "Hr",
      description:
        "Manages vendor sourcing, onboarding, and procurement processes.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 3,
      name: "Recruitment",
      parentDepartment: "Hr",
      description:
        "Responsible for hiring, interviews, and talent acquisition.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 4,
      name: "Payroll Management",
      parentDepartment: "Accounts",
      description:
        "Handles employee salary processing, deductions, and payslips.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 5,
      name: "IT Support",
      parentDepartment: "Engineering",
      description:
        "Provides technical support, system maintenance, and issue resolution.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 6,
      name: "Quality Assurance",
      parentDepartment: "Engineering",
      description:
        "Ensures product quality through testing and validation processes.",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedSubDepartment, setSelectedSubDepartment] =
    useState<SubDepartment | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [department] = useState([
    { id: 1, name: "UI / UX Design" },
    { id: 2, name: "Procurement" },
    { id: 3, name: "Engineering" },
    { id: 4, name: "HR" },
    { id: 5, name: "Product" },
  ]);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(subDepartment.length / itemsPerPage);

  const paginatedsubDepartment = subDepartment.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddSubDepartment = (
    data: Omit<SubDepartment, "id" | "createdAt">,
  ) => {
    //Create Api
    const newSubDept: SubDepartment = {
      ...data,
      id: subDepartment.length + 1,
      createdAt: new Date().toDateString(),
    };
    toast.success("Department added successfully");

    setSubDepartment((prev) => [newSubDept, ...prev]);
  };

  const handleEdit = (subDept: SubDepartment) => {
    setSelectedSubDepartment(subDept);
    setIsUpdateOpen(true);
  };

  const handleUpdateSubDepartment = (updatedData: any) => {
    //Update Api
    setSubDepartment((prev) =>
      prev.map((d) =>
        d.id === selectedSubDepartment?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Department updated successfully");
  };

  const handleDelete = (id: number) => {
    //Delete Api
    toast.success("Sub Department deleted successfully");
    setSubDepartment((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Sub-Department
          </h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            + Sub-Department
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
            <option>All Sub Departments</option>
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

      <div className="bg-white rounded-xl w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Sub Department</th>
              <th className="px-6 py-4 text-left">Parent Department</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedsubDepartment?.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Sub-Department Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Sub-Department yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Add Sub-Department
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedsubDepartment.map((subDept) => (
                <tr
                  key={subDept?.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subDept.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subDept.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subDept.parentDepartment}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          subDept.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {subDept.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(subDept)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(subDept.id)}
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

      <AddSubDepartment
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddSubDepartment}
        department={department}
      />
      <UpdateSubDepartment
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSubDepartment={selectedSubDepartment}
        onUpdate={handleUpdateSubDepartment}
        department={department}
      />
      <div className="bg-white border border-gray-200 rounded-b-xl px-6 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default SubDepartment;
