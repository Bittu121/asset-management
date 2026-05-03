"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  getDepartmentsAction,
  createDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
} from "@/store/department/departmentActions";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import AddDepartmentModal from "./AddDepartmentModal";
import UpdateDepartmentModal from "./UpdateDepartmentModal";
import Pagination from "../../../components/common/Pagination";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { FcDepartment } from "react-icons/fc";

type Department = {
  _id: string;
  departmentName: string;
  code: string;
  createdAt: string;
};

function Department() {
  const dispatch = useDispatch<AppDispatch>();
  const { departments, loading } = useSelector(
    (state: RootState) => state.department,
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filters
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Fetch data on mount
  useEffect(() => {
    dispatch(getDepartmentsAction());
  }, [dispatch]);

  // Filter departments
  const filteredDepartments = departments.filter((dept) => {
    const searchMatch =
      search === "" ||
      dept.departmentName.toLowerCase().includes(search.toLowerCase()) ||
      dept.code.toLowerCase().includes(search.toLowerCase());

    const departmentMatch =
      departmentFilter === "" ||
      dept.departmentName.toLowerCase() === departmentFilter.toLowerCase();

    return searchMatch && departmentMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handlers
  const handleAdd = async (data: Omit<Department, "_id" | "createdAt">) => {
    const success = await dispatch(createDepartmentAction(data));
    if (success) {
      dispatch(getDepartmentsAction());
    }
  };

  const handleEdit = (dept: Department) => {
    setSelectedDept(dept);
    setIsUpdateOpen(true);
  };

  const handleUpdate = async (updatedData: any) => {
    if (selectedDept) {
      const success = await dispatch(
        updateDepartmentAction(selectedDept._id, updatedData),
      );
      if (success) {
        dispatch(getDepartmentsAction());
      }
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteDepartmentAction(id));
    dispatch(getDepartmentsAction());
  };

  // Excel Upload Handler
  const handleExcelUpload = async (uploadedData: any[]) => {
    const formattedData = uploadedData.map((item) => ({
      departmentName: item.Department || item.departmentName || "",
      code: item.Code || item.code || "",
    }));

    // Validate data
    const validData = formattedData.filter(
      (item) => item.departmentName && item.code,
    );

    if (validData.length === 0) {
      toast.error("No valid data found in uploaded file");
      return;
    }

    // Upload each item
    let successCount = 0;
    for (const item of validData) {
      const success = await dispatch(createDepartmentAction(item));
      if (success) successCount++;
    }

    // Refresh list
    dispatch(getDepartmentsAction());

    if (successCount === validData.length) {
      toast.success(`${successCount} departments uploaded successfully`);
    } else {
      toast.warning(
        `${successCount} of ${validData.length} departments uploaded`,
      );
    }
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Department</h1>
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
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
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
              data={filteredDepartments}
              fileName="department"
              headers={[
                { label: "Department", key: "departmentName" },
                { label: "Code", key: "code" },
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
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1000px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-4">ID</th>
              <th className="text-left px-6 py-4">Department</th>
              <th className="text-left px-6 py-4">Code</th>
              <th className="text-left px-6 py-4">Created</th>
              <th className="text-right px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : paginatedDepartments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FcDepartment size={24} />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-700">
                      No Departments Found
                    </h3>

                    <p className="text-xs text-gray-500">
                      You haven't added any departments yet.
                    </p>

                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add Department
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedDepartments.map((dept) => (
                <tr
                  key={dept._id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {dept._id.slice(-6)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {dept.departmentName}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {dept.code}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {new Date(dept.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(dept)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(dept._id)}
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

export default Department;
