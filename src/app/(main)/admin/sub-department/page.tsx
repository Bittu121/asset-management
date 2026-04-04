"use client";
import React, { useState } from "react";
import AddSubDepartment from "./AddSubDepartment";
import UpdateSubDepartment from "./UpdateSubDepartment";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type SubDepartmentType = {
  id: number;
  name: string;
  department: string;
  manager: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
};

function SubDepartment() {
  const [department] = useState([
    { id: 1, name: "Accounts" },
    { id: 2, name: "Administration" },
    { id: 3, name: "HR" },
    { id: 4, name: "Finance" },
    { id: 5, name: "Legal" },
  ]);
  const [manager] = useState([
    { id: 1, name: "bittu@gmail.com" },
    { id: 2, name: "" },
    { id: 3, name: "" },
    { id: 4, name: "" },
    { id: 5, name: "" },
  ]);
  const [subDepartment, setSubDepartment] = useState<SubDepartmentType[]>([
    {
      id: 1,
      name: "Visual Design",
      department: "Accounts",
      manager: "bittu@gmail.com",
      description:
        "Handles UI/UX design, branding, and visual assets for digital products.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "Vendor Procurement",
      department: "Hr",
      manager: "bittu1@gmail.com",
      description:
        "Manages vendor sourcing, onboarding, and procurement processes.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 3,
      name: "Recruitment",
      department: "Hr",
      manager: "",
      description:
        "Responsible for hiring, interviews, and talent acquisition.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 4,
      name: "Payroll Management",
      department: "Accounts",
      manager: "bk@gmail.com",
      description:
        "Handles employee salary processing, deductions, and payslips.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 5,
      name: "IT Support",
      department: "Engineering",
      manager: "",
      description:
        "Provides technical support, system maintenance, and issue resolution.",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 6,
      name: "Quality Assurance",
      department: "Engineering",
      manager: "",
      description:
        "Ensures product quality through testing and validation processes.",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedSubDepartment, setSelectedSubDepartment] =
    useState<SubDepartmentType | null>(null);

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [subDepartmentFilter, setSubDepartmentFilter] = useState("");

  //filter step-2
  const filteredSubDepartments = subDepartment.filter((subdepts) => {
    const searchMatch =
      search === "" ||
      subdepts.name.toLowerCase().includes(search.toLowerCase()) ||
      subdepts.department.toLowerCase().includes(search.toLowerCase());

    const departmentMatch =
      subDepartmentFilter === "" ||
      subdepts.department.toLowerCase() === subDepartmentFilter.toLowerCase();

    return searchMatch && departmentMatch;
  });

  //pagination step-2
  const totalPages = Math.ceil(filteredSubDepartments.length / itemsPerPage);
  const paginatedsubDepartment = filteredSubDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //Create Api
  const handleAddSubDepartment = (
    data: Omit<SubDepartmentType, "id" | "createdAt">,
  ) => {
    const newSubDept: SubDepartmentType = {
      ...data,
      id: subDepartment.length + 1,
      createdAt: new Date().toDateString(),
    };
    toast.success("Department added successfully");
    setSubDepartment((prev) => [newSubDept, ...prev]);
  };

  const handleEdit = (subDept: SubDepartmentType) => {
    setSelectedSubDepartment(subDept);
    setIsUpdateOpen(true);
  };

  //Update Api
  const handleUpdateSubDepartment = (updatedData: any) => {
    setSubDepartment((prev) =>
      prev.map((d) =>
        d.id === selectedSubDepartment?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Department updated successfully");
  };

  //Delete Api
  const handleDelete = (id: number) => {
    toast.success("Sub Department deleted successfully");
    setSubDepartment((prev) => prev.filter((d) => d.id !== id));
  };

  //export
  const handleExport = () => {};

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            {" "}
            Sub Department
          </h1>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <select
              value={subDepartmentFilter}
              onChange={(e) => setSubDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white"
            >
              <option value="">Select Departments</option>
              {department.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FileSpreadsheet size={16} />
              Export Excel
            </button>
            <button className="px-3 py-2 text-xs font-bold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
              Bulk Upload
            </button>

            <button
              onClick={() => setIsAddOpen(true)}
              className="px-3 py-2 text-xs font-bold rounded-md bg-black text-white hover:bg-gray-900"
            >
              + Add Department
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Sub Department</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Manager</th>
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
                        No Sub Department Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Sub Department yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Add Sub Department
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
                      {subDept.department}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subDept.manager}
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
        manager={manager}
      />
      <UpdateSubDepartment
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSubDepartment={selectedSubDepartment}
        onUpdate={handleUpdateSubDepartment}
        department={department}
        manager={manager}
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
