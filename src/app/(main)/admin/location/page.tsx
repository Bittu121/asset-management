"use client";
import React, { useState } from "react";
import UpdateLocation from "./UpdateLocation";
import AddLocation from "./AddLocation";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type Location = {
  id: number;
  name: string;
  address: string;
  city: string;
  isActive?: boolean;
  createdAt?: string;
};

function Location() {
  const [location, setLocation] = useState<Location[]>([
    {
      id: 1,
      name: "Head Office",
      city: "Delhi",
      address: "Connaught Place, New Delhi",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "Branch Office",
      city: "Mumbai",
      address: "Andheri East, Mumbai",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 3,
      name: "Warehouse",
      city: "Bangalore",
      address: "Whitefield, Bangalore",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
    {
      id: 4,
      name: "Corporate Office",
      city: "Hyderabad",
      address: "Hitech City, Hyderabad",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 5,
      name: "Regional Office",
      city: "Chennai",
      address: "T Nagar, Chennai",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 6,
      name: "Support Center",
      city: "Pune",
      address: "Hinjewadi, Pune",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(location.length / itemsPerPage);

  const paginatedLocation = location.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddLocation = (data: Omit<Location, "id" | "createdAt">) => {
    //Create Api
    const newLoc: Location = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toDateString(),
    };
    toast.success("Department added successfully");

    setLocation((prev) => [newLoc, ...prev]);
  };

  const handleEdit = (loc: Location) => {
    setSelectedLocation(loc);
    setIsUpdateOpen(true);
  };

  const handleUpdateLocation = (updatedData: any) => {
    //Update Api
    setLocation((prev) =>
      prev.map((d) =>
        d.id === selectedLocation?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Department updated successfully");
  };

  const handleDelete = (id: number) => {
    //Delete Api
    toast.success("Location deleted successfully");
    setLocation((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">Location</h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            + Location
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
            <option>All Location</option>
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
      <div className="bg-white rounded-md overflow-hidden"></div>
      <div className="bg-white rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-4">ID</th>
              <th className="text-left px-6 py-4 ">Location</th>
              <th className="text-left px-6 py-4 ">City</th>
              <th className="text-left px-6 py-4 ">Address</th>
              <th className="text-left px-6 py-4 ">Status</th>
              <th className="text-right px-6 py-4 ">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedLocation.length === 0 ? (
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
              <>
                {paginatedLocation.map((loc) => (
                  <tr
                    key={loc.id}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {loc.id}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {loc.name}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {loc.city}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {loc.address}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            loc.isActive
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {loc.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(loc)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 leading-none"
                        >
                          <HiPencilSquare size={19} />
                        </button>
                        {/* Divider */}
                        <span className="h-4 w-px bg-gray-300"></span>
                        <button
                          onClick={() => handleDelete(loc.id)}
                          className="flex items-center justify-center text-red-800 hover:bg-red-50 p-1 rounded-md"
                          title="Delete"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <AddLocation
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddLocation}
      />
      <UpdateLocation
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedLocation={selectedLocation}
        onUpdate={handleUpdateLocation}
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

export default Location;
