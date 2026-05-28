"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  getSubDepartmentsAction,
  createSubDepartmentAction,
  updateSubDepartmentAction,
  deleteSubDepartmentAction,
} from "@/store/subDepartment/subDepartmentActions";
import { getDepartmentsAction } from "@/store/department/departmentActions";
import AddSubDepartment from "./AddSubDepartment";
import UpdateSubDepartment from "./UpdateSubDepartment";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { FcDepartment } from "react-icons/fc";

type SubDepartmentType = {
  _id: string;
  subDepartmentName: string;
  departmentId: string;
  departmentName: string;
  manager?: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
};

function SubDepartment() {
  const dispatch = useDispatch<AppDispatch>();
  const { subDepartments, loading } = useSelector((state: RootState) => state.subDepartment);
  const { departments } = useSelector((state: RootState) => state.department);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedSubDepartment, setSelectedSubDepartment] = useState<SubDepartmentType | null>(
    null
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filters
  const [search, setSearch] = useState("");
  const [subDepartmentFilter, setSubDepartmentFilter] = useState("");

  // Fetch data on mount
  useEffect(() => {
    dispatch(getSubDepartmentsAction());
    dispatch(getDepartmentsAction());
  }, [dispatch]);

  // Filter sub departments
  const filteredSubDepartments = subDepartments.filter((subdept) => {
    const searchMatch =
      search === "" ||
      subdept.subDepartmentName.toLowerCase().includes(search.toLowerCase()) ||
      subdept.departmentName.toLowerCase().includes(search.toLowerCase());

    const departmentMatch =
      subDepartmentFilter === "" ||
      subdept.departmentName.toLowerCase() === subDepartmentFilter.toLowerCase();

    return searchMatch && departmentMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSubDepartments.length / itemsPerPage);
  const paginatedSubDepartment = filteredSubDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleAddSubDepartment = async (data: Omit<SubDepartmentType, "_id" | "createdAt">) => {
    const success = await dispatch(createSubDepartmentAction(data));
    if (success) {
      dispatch(getSubDepartmentsAction());
    }
  };

  const handleEdit = (subDept: SubDepartmentType) => {
    setSelectedSubDepartment(subDept);
    setIsUpdateOpen(true);
  };

  const handleUpdateSubDepartment = async (updatedData: any) => {
    if (selectedSubDepartment) {
      const success = await dispatch(
        updateSubDepartmentAction(selectedSubDepartment._id, updatedData)
      );
      if (success) {
        dispatch(getSubDepartmentsAction());
      }
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteSubDepartmentAction(id));
    dispatch(getSubDepartmentsAction());
  };

  // Excel Upload Handler
  const handleExcelUpload = async (uploadedData: any[]) => {
    const formattedData = uploadedData.map((item) => {
      // Find department by name to get ID
      const department = departments.find(
        (dept) =>
          dept.departmentName.toLowerCase() ===
          (item.Department || item.departmentName || "").toLowerCase()
      );

      return {
        subDepartmentName: item["Sub Department"] || item.subDepartmentName || "",
        departmentId: department?._id || "",
        departmentName: department?.departmentName || "",
        manager: item.Manager || item.manager || "",
        description: item.Description || item.description || "",
        isActive: item.Status === "Active" || item.status === "Active" || item.isActive === true,
      };
    });

    // Validate data
    const validData = formattedData.filter((item) => item.departmentId);

    if (validData.length === 0) {
      toast.error("No valid departments found in uploaded data");
      return;
    }

    // Upload each item
    let successCount = 0;
    for (const item of validData) {
      const success = await dispatch(createSubDepartmentAction(item));
      if (success) successCount++;
    }

    // Refresh list
    dispatch(getSubDepartmentsAction());

    if (successCount === validData.length) {
      toast.success(`${successCount} sub departments uploaded successfully`);
    } else {
      toast.warning(`${successCount} of ${validData.length} sub departments uploaded`);
    }
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Sub Department</h1>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400
              focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <select
              value={subDepartmentFilter}
              onChange={(e) => setSubDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.departmentName}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredSubDepartments}
              fileName="sub-department"
              headers={[
                { label: "Sub Department", key: "subDepartmentName" },
                { label: "Department", key: "departmentName" },
                { label: "Manager", key: "manager" },
                { label: "Status", key: "isActive" },
              ]}
              onUpload={handleExcelUpload}
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
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : paginatedSubDepartment.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FcDepartment size={24} />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-700">
                      No Sub Departments Found
                    </h3>

                    <p className="text-xs text-gray-500">
                      You haven't added any sub departments yet.
                    </p>

                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add Sub Department
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedSubDepartment.map((subDept) => (
                <tr key={subDept._id} className="hover:bg-gray-50 transition-all duration-150">
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">{subDept._id.slice(-6)}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subDept.subDepartmentName}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subDept.departmentName}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subDept.manager || "-"}
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
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(subDept._id)}
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
        departments={departments}
      />
      <UpdateSubDepartment
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSubDepartment={selectedSubDepartment}
        onUpdate={handleUpdateSubDepartment}
        departments={departments}
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
