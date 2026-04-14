"use client";
import React, { useState } from "react";
import AddSubLocation from "./AddSubLocation";
import UpdateSubLocation from "./UpdateSubLocation";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";


type SubLocation = {
  id: number;
  subLocationName: string;
  locationName: string;
  floor?: string;
  isActive: boolean;
  createdAt?: string;
};

function SubLocation() {
  const [subLocation, setSubLocation] = useState<SubLocation[]>([
    {
      id: 1,
      subLocationName: "Ahmedabad Office",
      locationName: "Ahmedabad",
      floor: "11th Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      subLocationName: "Bangalore Office",
      locationName: "Bangalore",
      floor: "1st Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 3,
      subLocationName: "Mumbai Office",
      locationName: "Mumbai",
      floor: "3rd Floor",
      isActive: false,
      createdAt: new Date().toDateString(),
    },
    {
      id: 4,
      subLocationName: "Delhi HQ",
      locationName: "Delhi",
      floor: "Ground Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 5,
      subLocationName: "Chennai Support",
      locationName: "Chennai",
      floor: "2nd Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 6,
      subLocationName: "Hyderabad Tech Park",
      locationName: "Hyderabad",
      floor: "5th Floor",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
  ]);
  const [locationName] = useState([
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
      loc.subLocationName.toLowerCase().includes(search.toLowerCase()) ||
      loc.locationName.toLowerCase().includes(search.toLowerCase()) ||
      (loc.floor?.toLowerCase().includes(search.toLowerCase()) ?? false);

    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && loc.isActive) ||
      (statusFilter === "Inactive" && !loc.isActive);

    const locationMatch =
      subLocationFilter === "" ||
      loc.locationName.toLowerCase() === subLocationFilter.toLowerCase();

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
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400
              focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select
              value={subLocationFilter}
              onChange={(e) => setSubLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select Sub Location</option>
              {locationName.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredSubLocations}
              fileName="sub-Location"
              headers={[
                { label: "Sub Location", key: "subLocationName" },
                { label: "Location", key: "locationName" },
                { label: "Floor", key: "floor" },
                { label: "Status", key: "isActive" },
              ]}
              onUpload={(uploadedData: any[]) => {
                const formattedData: SubLocation[] = uploadedData.map(
                  (item, index) => ({
                    id: Date.now() + index,
                    subLocationName:
                      item["Sub Location"] || item.subLocationName || "",
                    locationName: item.locationName || item.locationName || "",
                    floor: item.Floor || item.floor || "",
                    isActive:
                      item.Status === "Active" ||
                      item.status === "Active" ||
                      item.isActive === true,
                    createdAt: new Date().toDateString(),
                  }),
                );
                setSubLocation((prev) => [...formattedData, ...prev]);
                toast.success("Sub Locations uploaded successfully");
              }}
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
                    <CiLocationOn size={18}/>
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
                      {subLoc.subLocationName}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {subLoc.locationName || "-"}
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
        locationName={locationName}
      />
      <UpdateSubLocation
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSubLocation={selectedSubLocation}
        onUpdate={handleUpdateSubLocation}
        locationName={locationName}
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
