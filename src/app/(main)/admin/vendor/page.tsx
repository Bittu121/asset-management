"use client";
import React, { useState } from "react";
import CreateVendor from "./CreateVendor";
import UpdateVendor from "./UpdateVendor";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type Vendor = {};

function Vendor() {
  const [vendor, setVendor] = useState<Vendor[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(vendor.length / itemsPerPage);

  const paginatedVendor = vendor.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddVendor = (data: Omit<Vendor, "id" | "createdAt">) => {
    //Create Api
    const newDept: Vendor = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toDateString(),
    };
    toast.success("Department added successfully");

    setVendor((prev) => [newDept, ...prev]);
  };

  const handleEdit = (vendors: Vendor) => {
    setSelectedVendor(vendors);
    setIsUpdateOpen(true);
  };

  const handleUpdateVendor = (updatedData: any) => {
    //Update Api
    setVendor((prev) =>
      prev.map((d) =>
        d.id === selectedVendor?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Department updated successfully");
  };

  const handleDelete = (id: number) => {
    //Delete Api
    toast.success("Vendor deleted successfully");
    setVendor((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">Vendor</h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            + Vendor
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
            <option>All Vendor</option>
            <option>Assigned</option>
            <option>Unassigned</option>
          </select>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-md overflow-hidden"></div>
      <div className="bg-white rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-4 ">Asset Categories</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedVendor.map((vendors) => (
              <>
                <tr
                  key={vendors.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {/* {vendors.name} */}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(vendors)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(vendors.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <CreateVendor
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddVendor}
      />
      <UpdateVendor
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedVendor={selectedVendor}
        onUpdate={handleUpdateVendor}
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

export default Vendor;
