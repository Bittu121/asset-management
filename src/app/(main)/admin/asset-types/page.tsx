"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAssetTypes from "./AddAssetTypes";
import UpdateAssetTypes from "./UpdateAssetTypes";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  fetchAssetTypes,
  createAssetTypeAction,
  updateAssetTypeAction,
  deleteAssetTypeAction,
} from "@/store/assetTypes/assetTypesActions";
import { fetchAssetCategories } from "@/store/assetCategories/assetCategoriesActions";
import { fetchSubCategories } from "@/store/subCategories/subCategoriesActions";

function AssetTypes() {
  const dispatch = useDispatch<AppDispatch>();

  const { assetTypes, loading, createLoading, updateLoading, deleteLoading } = useSelector(
    (state: RootState) => state.assetTypes
  );
  const { assetCategories } = useSelector((state: RootState) => state.assetCategories);
  const { subCategories } = useSelector((state: RootState) => state.subCategories);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAssetType, setSelectedAssetType] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAssetTypes());
    dispatch(fetchAssetCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const filteredAssetTypes = assetTypes.filter((at) => {
    const matchesSearch =
      search === "" ||
      at.name.toLowerCase().includes(search.toLowerCase()) ||
      (at.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && at.isActive) ||
      (statusFilter === "Inactive" && !at.isActive);
    const matchesCategory = categoryFilter === "" || at.category?._id === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredAssetTypes.length / itemsPerPage);
  const paginatedAssetTypes = filteredAssetTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = (data: any) => {
    dispatch(createAssetTypeAction(data, () => setIsAddOpen(false)));
  };

  const handleEdit = (assetType: any) => {
    setSelectedAssetType(assetType);
    setIsUpdateOpen(true);
  };

  const handleUpdate = (updatedData: any) => {
    if (selectedAssetType) {
      dispatch(
        updateAssetTypeAction(selectedAssetType._id, updatedData, () => setIsUpdateOpen(false))
      );
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this asset type?")) {
      dispatch(deleteAssetTypeAction(id));
    }
  };

  const handleBulkUpload = (uploadedData: any[]) => {
    uploadedData.forEach((item) => {
      const categoryName = item.Category || item.category || "";
      const subCategoryName = item["Sub Category"] || item.subCategory || "";

      const matchedCategory = assetCategories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase()
      );
      const matchedSubCategory = subCategories.find(
        (s) =>
          s.name.toLowerCase() === subCategoryName.toLowerCase() &&
          s.category?._id === matchedCategory?._id
      );

      const assetTypeData = {
        name: item["Asset Type"] || item.name || "",
        category: matchedCategory?._id || "",
        subCategory: matchedSubCategory?._id || null,
        description: item.Description || item.description || "",
        isActive: item.Status === "Active" || item.status === "Active" || item.isActive === true,
      };

      if (assetTypeData.name && assetTypeData.category) {
        dispatch(createAssetTypeAction(assetTypeData));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading asset types...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Asset Types</h1>
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
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredAssetTypes.map((at: any) => ({
                ID: at._id.slice(-6),
                "Asset Type": at.name,
                Category: at.category?.name || "-",
                "Sub Category": at.subCategory?.name || "-",
                Description: at.description || "-",
                Status: at.isActive ? "Active" : "Inactive",
                "Created At": new Date(at.createdAt).toLocaleDateString(),
              }))}
              fileName="asset-types"
              headers={[
                { label: "ID", key: "ID" },
                { label: "Asset Type", key: "Asset Type" },
                { label: "Category", key: "Category" },
                { label: "Sub Category", key: "Sub Category" },
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
        <table className="min-w-275 w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Asset Type</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Sub Category</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedAssetTypes.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FiSettings size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">No Asset Types Found</h3>
                    <p className="text-xs text-gray-500">You haven't added any asset types yet.</p>
                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add Asset Type
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedAssetTypes.map((at: any) => (
                <tr key={at._id} className="hover:bg-gray-50 transition-all duration-150">
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">{at._id.slice(-6)}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">{at.name}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">{at.category?.name || "-"}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">{at.subCategory?.name || "-"}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700 max-w-xs truncate">
                      {at.description || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        at.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {at.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(at)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        disabled={updateLoading}
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(at._id)}
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

      <AddAssetTypes
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAdd}
        loading={createLoading}
        assetCategories={assetCategories}
        subCategories={subCategories}
      />

      <UpdateAssetTypes
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedAssetType={selectedAssetType}
        onUpdate={handleUpdate}
        loading={updateLoading}
        assetCategories={assetCategories}
        subCategories={subCategories}
      />

      <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default AssetTypes;
