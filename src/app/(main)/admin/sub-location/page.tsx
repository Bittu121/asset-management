"use client";
import React, { useState } from "react";
import AddSubLocation from "./AddSubLocation";
import UpdateSubLocation from "./UpdateSubLocation";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

type SubLocation = {
  id: number;
  name: string;
  location: string;
  floor?: string;
  isActive: boolean;
  createdAt?: string;
};

function SubLocation() {
  const [subLocation, setSubLocation] = useState<SubLocation[]>([
    {
      id: 1,
      name: "Ahmedabad Office",
      location: "Ahmedabad",
      floor: "11th Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "Bangalore Office",
      location: "Bangalore",
      floor: "1st Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 3,
      name: "Mumbai Office",
      location: "Mumbai",
      floor: "3rd Floor",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
    {
      id: 4,
      name: "Delhi HQ",
      location: "Delhi",
      floor: "Ground Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 5,
      name: "Chennai Support",
      location: "Chennai",
      floor: "2nd Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 6,
      name: "Hyderabad Tech Park",
      location: "Hyderabad",
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

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subLocationFilter, setSubLocationFilter] = useState("");

  //filter step-2
  const filteredSubLocations = subLocation.filter((loc) => {
    const searchMatch =
      search === "" ||
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.location.toLowerCase().includes(search.toLowerCase()) ||
      (loc.floor?.toLowerCase().includes(search.toLowerCase()) ?? false);

    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && loc.isActive) ||
      (statusFilter === "Inactive" && !loc.isActive);

    const locationMatch =
      subLocationFilter === "" ||
      loc.location.toLowerCase() === subLocationFilter.toLowerCase();

    return searchMatch && statusMatch && locationMatch;
  });

  //pagination step-2
  const totalPages = Math.ceil(filteredSubLocations.length / itemsPerPage);

  const paginatedsubLocation = filteredSubLocations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //Create Api
  const handleAddSubLocation = (
    data: Omit<SubLocation, "id" | "createdAt">,
  ) => {
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

  //Update Api
  const handleUpdateSubLocation = (updatedData: any) => {
    setSubLocation((prev) =>
      prev.map((d) =>
        d.id === selectedSubLocation?.id ? { ...d, ...updatedData } : d,
      ),
    );
    toast.success("Department updated successfully");
  };

  //Delete Api
  const handleDelete = (id: number) => {
    toast.success("Sub-Location deleted successfully");
    setSubLocation((prev) => prev.filter((d) => d.id !== id));
  };

  //export
  const handleExport = () => {};

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900"> Sub Location</h1>
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
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select
              value={subLocationFilter}
              onChange={(e) => setSubLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white"
            >
              <option value="">Select Location</option>
              {location.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
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
              + Add Location
            </button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">Sub Location</th>
              <th className="px-6 py-4 text-left">Location</th>
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
                      {subLoc.location || "-"}
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
        location={location}
      />
      <UpdateSubLocation
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSubLocation={selectedSubLocation}
        onUpdate={handleUpdateSubLocation}
        location={location}
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

export default SubLocation;
