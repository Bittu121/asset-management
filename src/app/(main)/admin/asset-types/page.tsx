"use client";
import React, { useState } from "react";
import UpdateAssetTypes from "./UpdateAssetTypes";
import AddAssetTypes from "./AddAssetTypes";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type Category = {
  id: number;
  name: string;
};

type SubCategory = {
  id: number;
  name: string;
  parent: string;
};

type AssetTypes = {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  isActive: boolean;
  createdAt: string;
};

const categories: Category[] = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Networking" },
  { id: 3, name: "Server" },
];

const subCategories: SubCategory[] = [
  { id: 1, name: "MacBook", parent: "Laptop" },
  { id: 2, name: "Windows Laptop", parent: "Laptop" },
  { id: 3, name: "Router", parent: "Networking" },
  { id: 4, name: "Switch", parent: "Networking" },
  { id: 5, name: "Rack Server", parent: "Server" },
];

function AssetTypes() {
  const [assetTypes, setAssetTypes] = useState<AssetTypes[]>([
    {
      id: 1,
      name: "MacBook Pro M2",
      category: "Laptop",
      subCategory: "MacBook",
      description: "Apple MacBook Pro M2 16-inch",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 2,
      name: "Dell Latitude 5420",
      category: "Laptop",
      subCategory: "Windows Laptop",
      description: "Business laptop for employees",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 3,
      name: "Cisco Router 2900",
      category: "Networking",
      subCategory: "Router",
      description: "Enterprise-grade network router",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 4,
      name: "HP Aruba Switch",
      category: "Networking",
      subCategory: "Switch",
      description: "Managed network switch",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 5,
      name: "Dell PowerEdge R740",
      category: "Server",
      subCategory: "Rack Server",
      description: "High-performance rack server",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 6,
      name: "APC Smart UPS",
      category: "Power",
      subCategory: "UPS",
      description: "Uninterruptible power supply system",
      isActive: true,
      createdAt: "01/01/2026",
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAssetTypes, setSelectedAssetTypes] =
    useState<AssetTypes | null>(null);

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assetTypeFilter, setAssetTypeFilter] = useState("");

  //filter step-2
  const filteredAssetTypes = assetTypes.filter((assettypes) => {
    return (
      assettypes.name.toLowerCase().includes(search.toLowerCase()) &&
      (assetTypeFilter === "" || assettypes.name === assetTypeFilter) &&
      (statusFilter === "All" ||
        (statusFilter === "Active" && assettypes.isActive) ||
        (statusFilter === "Inactive" && !assettypes.isActive))
    );
  });

  //pagination step-2
  const totalPages = Math.ceil(filteredAssetTypes.length / itemsPerPage);
  const paginatedAssetTypes = filteredAssetTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //Create Api
  const handleAddAssetTypes = (data: Omit<AssetTypes, "id" | "createdAt">) => {
    const newDept: AssetTypes = {
      ...data,
      id: assetTypes.length + 1,
      createdAt: new Date().toDateString(),
    };
    toast.success("Asset types added successfully");
    setAssetTypes((prev) => [newDept, ...prev]);
  };

  const handleEdit = (assetType: AssetTypes) => {
    setSelectedAssetTypes(assetType);
    setIsUpdateOpen(true);
  };

  //Update Api
  const handleUpdateAssetTypes = (updatedData: any) => {
    setAssetTypes((prev) =>
      prev.map((d) =>
        d.id === selectedAssetTypes?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Asset types updated successfully");
  };

  //Delete Api
  const handleDelete = (id: number) => {
    toast.success("Asset types deleted successfully");
    setAssetTypes((prev) => prev.filter((d) => d.id !== id));
  };

  //export
  const handleExport = () => {};

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900"> Asset Types</h1>
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={assetTypeFilter}
              onChange={(e) => setAssetTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white"
            >
              <option value="">Select Asset Types</option>
              {assetTypes.map((assettypes) => (
                <option key={assettypes.id} value={assettypes.name}>
                  {assettypes.name}
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
              + Asset Types
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1000px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
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
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Asset types Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Asset types yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Asset types
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedAssetTypes.map((assetType) => (
                <tr
                  key={assetType.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {assetType.name}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-medium text-gray-900">
                      {assetType.category}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-medium text-gray-900">
                      {assetType.subCategory}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-medium text-gray-900">
                      {assetType.description}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          assetType.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {assetType.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(assetType)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(assetType.id)}
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

      <AddAssetTypes
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddAssetTypes}
        categories={categories}
        subCategories={subCategories}
      />
      <UpdateAssetTypes
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedAssetTypes={selectedAssetTypes}
        onUpdate={handleUpdateAssetTypes}
        categories={categories}
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
