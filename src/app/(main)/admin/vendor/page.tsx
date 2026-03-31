"use client";
import React, { useState } from "react";
import CreateVendor from "./CreateVendor";
import UpdateVendor from "./UpdateVendor";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type Vendor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  gstNumber?: string;
  contractExpiry?: string;
  isActive: boolean;
  createdAt: string;
};

function Vendor() {
  const [vendor, setVendor] = useState<Vendor[]>([
    {
      id: 1,
      name: "Acme Technologies",
      email: "contact@acmetech.com",
      phone: "+91-9876543210",
      address: "123 Tech Park, Bangalore, India",
      gstNumber: "29ABCDE1234F1Z5",
      contractExpiry: "2026-12-31",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "Danish Naseem",
      email: "danish.naseem@vservit.com",
      phone: "+91-9113468996",
      address: "2514, 5th Floor, Tower 2",
      gstNumber: "",
      contractExpiry: "2025-12-25",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 3,
      name: "Global IT Services",
      email: "info@globalit.com",
      phone: "+91-9123456780",
      address: "456, Cyber City, Gurgaon",
      gstNumber: "07AAACG1234Q1Z2",
      contractExpiry: "2026-06-30",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 4,
      name: "TechNova Solutions",
      email: "support@technova.com",
      phone: "+91-9988776655",
      address: "IT Hub, Hyderabad",
      gstNumber: "36ABCDE5678K1Z3",
      contractExpiry: "2024-11-15",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
    {
      id: 5,
      name: "NextGen Systems",
      email: "sales@nextgen.com",
      phone: "+91-8877665544",
      address: "Sector 62, Noida",
      gstNumber: "09AAACN9876L1Z1",
      contractExpiry: "2027-03-20",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 6,
      name: "Vertex Infotech",
      email: "contact@vertex.com",
      phone: "+91-7766554433",
      address: "Salt Lake, Kolkata",
      gstNumber: "",
      contractExpiry: "",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
  ]);
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
    const newVendor: Vendor = {
      ...data,
      id: vendor.length+1,
      createdAt: new Date().toDateString(),
    };
    setVendor((prev) => [newVendor, ...prev]);
    toast.success("Vendor added successfully");
  };

  const handleEdit = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsUpdateOpen(true);
  };

  const handleUpdateVendor = (updatedData: Vendor) => {
    //Update Api
    setVendor((prev) =>
      prev.map((v) =>
        v.id === selectedVendor?.id ? { ...v, ...updatedData } : v,
      ),
    );
    toast.success("Vendor updated successfully");
  };

  const handleDelete = (id: number) => {
    //Delete Api
    toast.success("Vendor deleted successfully");
    setVendor((prev) => prev.filter((v) => v.id !== id));
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
          <button
            onClick={() => console.log("Bulk Upload Clicked")}
            className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Bulk Upload
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1600px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Vendor</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4">GST</th>
              <th className="px-6 py-4">Expiry</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedVendor?.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Vendor Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any vendor yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Add Vendor
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedVendor.map((vendors) => (
                <tr
                  key={vendors.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {vendors.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {vendors.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {vendors.address}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {vendors.email}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {vendors.phone}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {vendors.gstNumber || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {vendors.contractExpiry || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          vendors.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {vendors.isActive ? "Active" : "Inactive"}
                      </span>
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
              ))
            )}
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
