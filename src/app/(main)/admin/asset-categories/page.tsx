"use client";
import React, { useState } from "react";
import UpdateAssetCategories from "./UpdateAssetCategories";
import AddAssetCategories from "./AddAssetCategories";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type AssetCategories = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
};

function AssetCategories() {
  const [assetCategories, setAssetCategories] = useState<AssetCategories[]>([
    {
      id: 1,
      name: "Laptop",
      description: "Employee laptops and workstations",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 2,
      name: "Desktop",
      description: "Office desktop systems",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 3,
      name: "Printer",
      description: "Printers and scanning devices",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 4,
      name: "Server",
      description: "Servers and data center equipment",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 5,
      name: "Networking",
      description: "Routers, switches, firewall devices",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 6,
      name: "Accessories",
      description: "Mouse, keyboard, cables, etc.",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 7,
      name: "Monitor",
      description: "Display monitors and screens",
      isActive: true,
      createdAt: "01/02/2026",
    },
    {
      id: 8,
      name: "Storage",
      description: "External hard drives and storage devices",
      isActive: true,
      createdAt: "01/02/2026",
    },
    {
      id: 9,
      name: "Security",
      description: "Security cameras and surveillance equipment",
      isActive: false,
      createdAt: "01/03/2026",
    },
    {
      id: 10,
      name: "Audio/Video",
      description: "Speakers, microphones, and video equipment",
      isActive: true,
      createdAt: "01/03/2026",
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAssetCategories, setSelectedAssetCategories] =
    useState<AssetCategories | null>(null);

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assetCategoriesFilter, setAssetCategoriesFilter] = useState("");

  //filter step-2
  const filteredAssetSubCategories = assetCategories.filter((assetCat) => {
    return (
      assetCat.name.toLowerCase().includes(search.toLowerCase()) &&
      (assetCategoriesFilter === "" ||
        assetCat.name === assetCategoriesFilter) &&
      (statusFilter === "All" ||
        (statusFilter === "Active" && assetCat.isActive) ||
        (statusFilter === "Inactive" && !assetCat.isActive))
    );
  });

  //pagination step-2
  const totalPages = Math.ceil(
    filteredAssetSubCategories.length / itemsPerPage,
  );
  const paginatedAssetCategories = filteredAssetSubCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //Create Api
  const handleAddAssetCategories = (
    data: Omit<AssetCategories, "id" | "createdAt">,
  ) => {
    const newAssetCategories: AssetCategories = {
      ...data,
      id: assetCategories.length + 1,
      createdAt: new Date().toDateString(),
    };
    toast.success("Asset categories added successfully");
    setAssetCategories((prev) => [newAssetCategories, ...prev]);
  };

  const handleEdit = (assetCat: AssetCategories) => {
    setSelectedAssetCategories(assetCat);
    setIsUpdateOpen(true);
  };

  //Update Api
  const handleUpdateAssetCategories = (updatedData: any) => {
    setAssetCategories((prev) =>
      prev.map((d) =>
        d.id === selectedAssetCategories?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Asset categories updated successfully");
  };

  //Delete Api
  const handleDelete = (id: number) => {
    toast.success("Asset Categories deleted successfully");
    setAssetCategories((prev) => prev.filter((d) => d.id !== id));
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
            Asset Categories
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
              value={assetCategoriesFilter}
              onChange={(e) => setAssetCategoriesFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white"
            >
              <option value="">Select Asset Categories</option>
              {assetCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
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
              + Asset Categories
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1000px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-4 ">ID</th>
              <th className="text-left px-6 py-4 ">Name</th>
              <th className="text-left px-6 py-4">Description</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-right px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedAssetCategories.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Asset Categories Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Asset Categories yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Asset Categories
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedAssetCategories.map((assetCat) => (
                <tr
                  key={assetCat.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {assetCat.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {assetCat.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {assetCat.description}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          assetCat.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {assetCat.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(assetCat)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(assetCat.id)}
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

      <AddAssetCategories
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddAssetCategories}
      />

      <UpdateAssetCategories
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedAssetCategories={selectedAssetCategories}
        onUpdate={handleUpdateAssetCategories}
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

export default AssetCategories;
