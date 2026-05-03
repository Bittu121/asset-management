"use client";
import React, { useEffect, useState } from "react";
import UpdateLocation from "./UpdateLocation";
import AddLocation from "./AddLocation";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";
import { FileSpreadsheet } from "lucide-react";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  createLocationAction,
  deleteLocationAction,
  getLocationsAction,
  updateLocationAction,
} from "@/store/location/locationActions";

type Location = {
  _id: string;
  locationName: string;
  address: string;
  city: string;
  isActive?: boolean;
  createdAt?: string;
};

function Location() {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading } = useSelector(
    (state: RootState) => state.location,
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch locations on mount
  useEffect(() => {
    dispatch(getLocationsAction());
  }, [dispatch]);

  //filter step-2
  const filteredLocations = locations.filter((loc) => {
    const searchMatch =
      search === "" ||
      loc.locationName.toLowerCase().includes(search.toLowerCase()) ||
      loc.city.toLowerCase().includes(search.toLowerCase()) ||
      loc.address.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && loc.isActive) ||
      (statusFilter === "Inactive" && !loc.isActive);

    const locationMatch =
      locationFilter === "" ||
      loc.locationName.toLowerCase().includes(locationFilter.toLowerCase()) ||
      loc.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
      loc.address.toLowerCase().includes(locationFilter.toLowerCase());

    return searchMatch && statusMatch && locationMatch;
  });

  //pagination step-2
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  const paginatedLocation = filteredLocations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //Create Api
  const handleAddLocation = async (
    data: Omit<Location, "_id" | "createdAt">,
  ) => {
    await dispatch(createLocationAction(data));
    dispatch(getLocationsAction());
  };

  const handleEdit = (loc: Location) => {
    setSelectedLocation(loc);
    setIsUpdateOpen(true);
  };

  //Update Api
  const handleUpdateLocation = async (updatedData: any) => {
    if (selectedLocation) {
      await dispatch(updateLocationAction(selectedLocation._id, updatedData));
      dispatch(getLocationsAction());
    }
  };

  //Delete Api
  const handleDelete = async (id: string) => {
    await dispatch(deleteLocationAction(id));
    dispatch(getLocationsAction());
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Locations</h1>
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
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc.locationName}>
                  {loc.locationName}
                </option>
              ))}
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredLocations}
              fileName="location"
              // headers={["ID", "Location", "City", "Address", "Status"]}
              headers={[
                { label: "ID", key: "id" },
                { label: "Location", key: "locationName" },
                { label: "City", key: "city" },
                { label: "Address", key: "address" },
                { label: "Status", key: "isActive" },
              ]}
              onUpload={(uploadedData) => {
                const mapped = uploadedData.map((item) => ({
                  ...item,
                  id: item.id || Date.now(),
                  isActive: item.Status === "Active" || item.isActive === true,
                }));
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
            <tr className="bg-white text-xs text-gray-500 uppercase tracking-wide">
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
                      <CiLocationOn size={24} className="font-bold" />
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
                      Add Location
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {paginatedLocation.map((loc) => (
                  <tr
                    key={loc._id}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {loc._id}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {loc.locationName}
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
                          onClick={() => handleDelete(loc._id)}
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

export default Location;
