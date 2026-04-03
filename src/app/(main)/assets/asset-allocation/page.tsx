"use client";
import React, { useState } from "react";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type SubLocation = {
  id: number;
  name: string;
  parentLocation: string;
  floor?: string;
  isActive: boolean;
  createdAt?: string;
};

function AssetAllocation() {
  const [subLocation, setSubLocation] = useState<SubLocation[]>([
    {
      id: 1,
      name: "Ahmedabad Office",
      parentLocation: "Ahmedabad",
      floor: "11th Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "Bangalore Office",
      parentLocation: "Bangalore",
      floor: "1st Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 3,
      name: "Mumbai Office",
      parentLocation: "Mumbai",
      floor: "3rd Floor",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
    {
      id: 4,
      name: "Delhi HQ",
      parentLocation: "Delhi",
      floor: "Ground Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 5,
      name: "Chennai Support",
      parentLocation: "Chennai",
      floor: "2nd Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 6,
      name: "Hyderabad Tech Park",
      parentLocation: "Hyderabad",
      floor: "5th Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
  ]);
  const [location] = useState([
    {
      id: 1,
      name: "Ahmedabad",
    },
    {
      id: 2,
      name: "Bangalore",
    },
    {
      id: 3,
      name: "Mumbai",
    },
    {
      id: 4,
      name: "Delhi",
    },
    {
      id: 5,
      name: "Chennai",
    },
    {
      id: 6,
      name: "Hyderabad",
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedSubLocation, setSelectedSubLocation] =
    useState<SubLocation | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(subLocation.length / itemsPerPage);

  const paginatedsubLocation = subLocation.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddSubLocation = (
    data: Omit<SubLocation, "id" | "createdAt">,
  ) => {
    //Create Api
    const newSubLoc: SubLocation = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toDateString(),
    };
    toast.success("Department added successfully");

    setSubLocation((prev) => [newSubLoc, ...prev]);
  };

  const handleEdit = (subLoc: SubLocation) => {
    setSelectedSubLocation(subLoc);
    setIsUpdateOpen(true);
  };

  const handleUpdateSubLocation = (updatedData: any) => {
    //Update Api
    setSubLocation((prev) =>
      prev.map((d) =>
        d.id === selectedSubLocation?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Department updated successfully");
  };

  const handleDelete = (id: number) => {
    //Delete Api
    toast.success("Sub-Location deleted successfully");
    setSubLocation((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">Sub-Location</h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            + Sub-Location
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
            <option>All Sub-Location</option>
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
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">Sub Location</th>
              <th className="px-6 py-4 text-left">Parent Location</th>
              <th className="px-6 py-4 text-left">Floor</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedsubLocation.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      📍
                    </div>

                    <h3 className="text-sm font-semibold text-gray-700">
                      No Locations Found
                    </h3>

                    <p className="text-xs text-gray-500">
                      You haven’t added any locations yet.
                    </p>

                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      + Add Location
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedsubLocation.map((subLoc) => (
                <tr
                  key={subLoc.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subLoc.name}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subLoc.parentLocation || "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subLoc.floor || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          subLoc.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {subLoc.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(subLoc)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>

                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(subLoc.id)}
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

      <AddSubLocation
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddSubLocation}
        locations={location}
      />
      <UpdateSubLocation
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSubLocation={selectedSubLocation}
        onUpdate={handleUpdateSubLocation}
        locations={location}
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

export default AssetAllocation;
