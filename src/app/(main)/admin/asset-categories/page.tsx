"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAssetCategories from "./AddAssetCategories";
import UpdateAssetCategories from "./UpdateAssetCategories";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "../../../components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { FiBox } from "react-icons/fi";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  fetchAssetCategories,
  createAssetCategoryAction,
  updateAssetCategoryAction,
  deleteAssetCategoryAction,
} from "@/store/assetCategories/assetCategoriesActions";

function AssetCategories() {
  const dispatch = useDispatch<AppDispatch>();
  const { assetCategories, loading, createLoading, updateLoading, deleteLoading } =
    useSelector((state: RootState) => state.assetCategories);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAssetCategory, setSelectedAssetCategory] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAssetCategories());
  }, [dispatch]);

  const filteredCategories = assetCategories.filter((cat) => {
    const matchesSearch =
      search === "" ||
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      (cat.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && cat.isActive) ||
      (statusFilter === "Inactive" && !cat.isActive);
    const matchesCategory = categoryFilter === "" || cat.name === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAdd = (data: any) => {
    dispatch(createAssetCategoryAction(data, () => setIsAddOpen(false)));
  };

  const handleEdit = (cat: any) => {
    setSelectedAssetCategory(cat);
    setIsUpdateOpen(true);
  };

  const handleUpdate = (updatedData: any) => {
    if (selectedAssetCategory) {
      dispatch(
        updateAssetCategoryAction(selectedAssetCategory._id, updatedData, () =>
          setIsUpdateOpen(false),
        ),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this asset category?")) {
      dispatch(deleteAssetCategoryAction(id));
    }
  };

  const handleBulkUpload = (uploadedData: any[]) => {
    uploadedData.forEach((item) => {
      const categoryData = {
        name: item.Name || item.name || "",
        code: item.Code || item.code || "",
        description: item.Description || item.description || "",
        isActive:
          item.Status === "Active" ||
          item.status === "Active" ||
          item.isActive === true,
      };
      if (categoryData.name) {
        dispatch(createAssetCategoryAction(categoryData));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading asset categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Asset Categories</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">All Categories</option>
              {assetCategories.map((cat: any) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredCategories.map((cat: any) => ({
                ID: cat._id.slice(-6),
                Name: cat.name,
                Code: cat.code || "-",
                Description: cat.description || "-",
                Status: cat.isActive ? "Active" : "Inactive",
                "Created At": new Date(cat.createdAt).toLocaleDateString(),
              }))}
              fileName="asset-categories"
              headers={[
                { label: "ID", key: "ID" },
                { label: "Name", key: "Name" },
                { label: "Code", key: "Code" },
                { label: "Description", key: "Description" },
                { label: "Status", key: "Status" },
                { label: "Created At", key: "Created At" },
              ]}
              onUpload={handleBulkUpload}
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

      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-225 w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-4">ID</th>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Code</th>
              <th className="text-left px-6 py-4">Description</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FiBox size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      No Asset Categories Found
                    </h3>
                    <p className="text-xs text-gray-500">
                      You haven't added any asset categories yet.
                    </p>
                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add Asset Category
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedCategories.map((cat: any) => (
                <tr
                  key={cat._id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {cat._id.slice(-6)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {cat.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">{cat.code || "-"}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700 max-w-xs truncate">
                      {cat.description || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        cat.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        disabled={updateLoading}
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-800 transition"
                        title="Delete"
                        disabled={deleteLoading}
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

      <AddAssetCategories
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAdd}
        loading={createLoading}
      />

      <UpdateAssetCategories
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedAssetCategory={selectedAssetCategory}
        onUpdate={handleUpdate}
        loading={updateLoading}
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

export default AssetCategories;
