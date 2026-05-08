"use client";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiPencilSquare } from "react-icons/hi2";
import { MdQrCode2 } from "react-icons/md";
import { Trash2 } from "lucide-react";
import UpdateAssetModal from "./UpdateAssetModal";
import Pagination from "../../../components/common/Pagination";
import AddAssetModal from "./AddAssetModal";
import QRModal from "./QRModal";
import { GoPlusCircle } from "react-icons/go";
import ExcelActions from "@/app/components/common/ExcelActions";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  fetchAssets,
  createAssetAction,
  updateAssetAction,
  deleteAssetAction,
} from "@/store/assets/assetsActions";
import { fetchAssetCategories } from "@/store/assetCategories/assetCategoriesActions";
import { fetchSubCategories } from "@/store/subCategories/subCategoriesActions";
import { fetchVendors } from "@/store/vendor/vendorActions";

function Page() {
  const dispatch = useDispatch<AppDispatch>();

  const { assets, loading, createLoading, updateLoading, deleteLoading } =
    useSelector((state: RootState) => state.assets);
  const { assetCategories } = useSelector(
    (state: RootState) => state.assetCategories,
  );
  const { subCategories } = useSelector(
    (state: RootState) => state.subCategories,
  );
  const { vendors } = useSelector((state: RootState) => state.vendor);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [vendorFilter, setVendorFilter] = useState("All");

  const [open, setOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedAssetForQR, setSelectedAssetForQR] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchAssetCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchVendors());
  }, [dispatch]);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        asset.assetTag.toLowerCase().includes(searchLower) ||
        (asset.device || "").toLowerCase().includes(searchLower) ||
        asset.serialNumber.toLowerCase().includes(searchLower) ||
        (asset.model || "").toLowerCase().includes(searchLower) ||
        (asset.manufacturer || "").toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && asset.isActive) ||
        (statusFilter === "Inactive" && !asset.isActive);

      const matchesCategory =
        categoryFilter === "All" || asset.category?._id === categoryFilter;

      const matchesVendor =
        vendorFilter === "All" || asset.vendor?._id === vendorFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesVendor;
    });
  }, [assets, search, statusFilter, categoryFilter, vendorFilter]);

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const isFiltered =
    search !== "" ||
    statusFilter !== "All" ||
    categoryFilter !== "All" ||
    vendorFilter !== "All";

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setVendorFilter("All");
    setCurrentPage(1);
  };

  const handleCreate = () => {
    setSelectedAsset(null);
    setOpen(true);
  };

  const handleEdit = (asset: any) => {
    setSelectedAsset(asset);
    setOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (selectedAsset) {
      dispatch(updateAssetAction(selectedAsset._id, data, () => setOpen(false)));
    } else {
      dispatch(createAssetAction(data, () => setOpen(false)));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      dispatch(deleteAssetAction(id));
    }
  };

  const handleDownloadQrCode = (item: any) => {
    setSelectedAssetForQR(item);
    setQrModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Assets
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and track all your company assets
          </p>
        </div>

        <div className="border-t border-gray-200" />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </span>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search assets..."
                className="pl-9 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="hidden sm:block h-8 w-px bg-gray-200" />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
            >
              <option value="All">All Categories</option>
              {assetCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={vendorFilter}
              onChange={(e) => {
                setVendorFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
            >
              <option value="All">All Vendors</option>
              {vendors.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.vendorName}
                </option>
              ))}
            </select>

            {isFiltered && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition"
              >
                ✕ Clear
              </button>
            )}
          </div>

          <p className="text-sm text-gray-500 hidden lg:block">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredAssets.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">{assets.length}</span>{" "}
            assets
          </p>
        </div>

        {/* Action row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ExcelActions
            data={filteredAssets.map((a) => ({
              "Asset Tag": a.assetTag,
              "Serial Number": a.serialNumber,
              Device: a.device || "-",
              Category: a.category?.name || "-",
              "Sub Category": a.subCategory?.name || "-",
              Manufacturer: a.manufacturer || "-",
              Model: a.model || "-",
              Vendor: a.vendor?.vendorName || "-",
              Status: a.isActive ? "Active" : "Inactive",
              "Purchase Cost": a.purchaseCost || "-",
              "Warranty Expiry": a.warrantyExpiry || "-",
            }))}
            fileName="assets"
            headers={[
              { label: "Asset Tag", key: "Asset Tag" },
              { label: "Serial Number", key: "Serial Number" },
              { label: "Device", key: "Device" },
              { label: "Category", key: "Category" },
              { label: "Sub Category", key: "Sub Category" },
              { label: "Manufacturer", key: "Manufacturer" },
              { label: "Model", key: "Model" },
              { label: "Vendor", key: "Vendor" },
              { label: "Status", key: "Status" },
              { label: "Purchase Cost", key: "Purchase Cost" },
              { label: "Warranty Expiry", key: "Warranty Expiry" },
            ]}
            onUpload={() => {}}
          />

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-95 shadow-sm transition-all duration-150"
          >
            <GoPlusCircle size={18} />
            Create Asset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-275 w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
              <th className="text-left px-6 py-4">Asset Tag</th>
              <th className="text-left px-6 py-4">Device</th>
              <th className="text-left px-6 py-4">Serial No.</th>
              <th className="text-left px-6 py-4">Vendor</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Cost</th>
              <th className="text-left px-6 py-4">Warranty</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedAssets.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 text-xl">
                      🗂️
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      No Assets Found
                    </h3>
                    <p className="text-xs text-gray-500">
                      {isFiltered
                        ? "No assets match your current filters."
                        : "You haven't added any assets yet."}
                    </p>
                    {isFiltered ? (
                      <button
                        onClick={handleClearFilters}
                        className="mt-2 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                      >
                        Clear Filters
                      </button>
                    ) : (
                      <button
                        onClick={handleCreate}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
                      >
                        + Add Asset
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedAssets.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {item.assetTag}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.device || "-"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.category?.name || "-"}
                      {item.subCategory?.name
                        ? ` • ${item.subCategory.name}`
                        : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.serialNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.vendor?.vendorName || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          item.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.purchaseCost
                      ? `₹${Number(item.purchaseCost).toLocaleString("en-IN")}`
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.warrantyExpiry || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button
                        onClick={() => handleDownloadQrCode(item)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="QR Code"
                      >
                        <MdQrCode2 size={19} />
                      </button>
                      <span className="h-4 w-px bg-gray-200" />
                      <button
                        onClick={() => handleEdit(item)}
                        disabled={updateLoading}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      <span className="h-4 w-px bg-gray-200" />
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deleteLoading}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-md transition"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddAssetModal
        isOpen={open && !selectedAsset}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        loading={createLoading}
        assetCategories={assetCategories}
        subCategories={subCategories}
        vendors={vendors}
      />
      <UpdateAssetModal
        isOpen={open && !!selectedAsset}
        onClose={() => setOpen(false)}
        initialData={selectedAsset}
        onSubmit={handleSubmit}
        loading={updateLoading}
        assetCategories={assetCategories}
        subCategories={subCategories}
        vendors={vendors}
      />
      <QRModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        asset={selectedAssetForQR}
      />
    </div>
  );
}

export default Page;
