"use client";
import React, { useState } from "react";
import AddSubCategories from "./AddSubCategories";
import UpdateSubCategories from "./UpdateSubCategories";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type Category = {
  id: number;
  name: string;
};

type AssetSubCategories = {
  id: number;
  name: string;
  category: string;
  description: string;
  isActive: boolean;
  createdAt: string;
};

const categories: Category[] = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Desktop" },
  { id: 3, name: "Networking" },
  { id: 4, name: "Server" },
  { id: 5, name: "Printer" },
];

function AssetSubCategories() {
  const [assetSubCategories, setAssetSubCategories] = useState<
    AssetSubCategories[]
  >([
    {
      id: 1,
      name: "MacBook Pro",
      category: "Laptop",
      description: "Apple MacBook Pro devices",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 2,
      name: "Windows Laptop",
      category: "Laptop",
      description: "Dell, HP, Lenovo laptops",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 3,
      name: "Laser Printer",
      category: "Printer",
      description: "High-speed office printers",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 4,
      name: "WiFi Router",
      category: "Networking",
      description: "Wireless network routers",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 5,
      name: "Rack Server",
      category: "Server",
      description: "Data center rack servers",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 6,
      name: "Desktop Workstation",
      category: "Desktop",
      description: "High-performance desktop systems",
      isActive: true,
      createdAt: "01/01/2026",
    },
    {
      id: 7,
      name: "Inkjet Printer",
      category: "Printer",
      description: "Color inkjet office printers",
      isActive: true,
      createdAt: "01/02/2026",
    },
    {
      id: 8,
      name: "Network Switch",
      category: "Networking",
      description: "Managed network switches",
      isActive: true,
      createdAt: "01/02/2026",
    },
    {
      id: 9,
      name: "Chromebook",
      category: "Laptop",
      description: "Google Chromebook devices",
      isActive: false,
      createdAt: "01/03/2026",
    },
    {
      id: 10,
      name: "iMac",
      category: "Desktop",
      description: "Apple iMac all-in-one computers",
      isActive: true,
      createdAt: "01/03/2026",
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAssetSubCategories, setSelectedAssetSubCategories] =
    useState<AssetSubCategories | null>(null);

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assetSubCategoriesFilter, setAssetSubCategoriesFilter] = useState("");

  //filter step-2
  const filteredAssetSubCategories = assetSubCategories.filter(
    (assetSubCat) => {
      return (
        assetSubCat.name.toLowerCase().includes(search.toLowerCase()) &&
        (assetSubCategoriesFilter === "" ||
          assetSubCat.category === assetSubCategoriesFilter) &&
        (statusFilter === "All" ||
          (statusFilter === "Active" && assetSubCat.isActive) ||
          (statusFilter === "Inactive" && !assetSubCat.isActive))
      );
    },
  );

  //pagination step-2
  const totalPages = Math.ceil(
    filteredAssetSubCategories.length / itemsPerPage,
  );
  const paginatedAssetSubCategories = filteredAssetSubCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //Create Api
  const handleAddAssetSubCategories = (
    data: Omit<AssetSubCategories, "id" | "createdAt">,
  ) => {
    const newAssetSubCategories: AssetSubCategories = {
      ...data,
      id: assetSubCategories.length + 1,
      createdAt: new Date().toDateString(),
    };
    toast.success("Asset Subcategories added successfully");
    setAssetSubCategories((prev) => [newAssetSubCategories, ...prev]);
  };

  const handleEdit = (subCat: AssetSubCategories) => {
    setSelectedAssetSubCategories(subCat);
    setIsUpdateOpen(true);
  };

  //Update Api
  const handleUpdateAssetSubCategories = (updatedData: any) => {
    setAssetSubCategories((prev) =>
      prev.map((d) =>
        d.id === selectedAssetSubCategories?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Asset Subcategories updated successfully");
  };

  //Delete Api
  const handleDelete = (id: number) => {
    toast.success("Asset Subcategories deleted successfully");
    setAssetSubCategories((prev) => prev.filter((d) => d.id !== id));
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
            Asset SubCategories
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={assetSubCategoriesFilter}
              onChange={(e) => setAssetSubCategoriesFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white"
            >
              <option value="">All Asset SubCategories</option>
              {categories.map((categ) => (
                <option key={categ.id} value={categ.name}>
                  {categ.name}
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
              + Asset SubCategories
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Sub Category</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedAssetSubCategories.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Asset Sub Categories Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Asset Sub Categories yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Asset Sub Categories
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedAssetSubCategories.map((subCat) => (
                <tr
                  key={subCat.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subCat.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subCat.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subCat.category}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subCat.description}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          subCat.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {subCat.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(subCat)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(subCat.id)}
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

      <AddSubCategories
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddAssetSubCategories}
        categories={categories}
      />
      <UpdateSubCategories
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedAssetSubCategories={selectedAssetSubCategories}
        onUpdate={handleUpdateAssetSubCategories}
        categories={categories}
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

export default AssetSubCategories;
