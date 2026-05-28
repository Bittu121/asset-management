"use client";
import React, { useEffect, useState } from "react";
import AddSubLocation from "./AddSubLocation";
import UpdateSubLocation from "./UpdateSubLocation";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  createSubLocationAction,
  deleteSubLocationAction,
  getSubLocationsAction,
  updateSubLocationAction,
} from "@/store/subLocation/subLocationActions";
import { getLocationsAction } from "@/store/location/locationActions";

type SubLocation = {
  _id: string;
  subLocationName: string;
  locationName: string;
  floor?: string;
  isActive: boolean;
  createdAt?: string;
};

function SubLocation() {
  const dispatch = useDispatch<AppDispatch>();
  const { subLocations, loading } = useSelector((state: RootState) => state?.subLocation);
  const { locations } = useSelector((state: RootState) => state?.location);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedSubLocation, setSelectedSubLocation] = useState<SubLocation | null>(null);

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subLocationFilter, setSubLocationFilter] = useState("");

  // Fetch data on mount
  useEffect(() => {
    dispatch(getSubLocationsAction());
    dispatch(getLocationsAction());
  }, [dispatch]);

  //filter step-2
  const filteredSubLocations = subLocations?.filter((loc) => {
    const searchMatch =
      search === "" ||
      loc?.subLocationName.toLowerCase().includes(search.toLowerCase()) ||
      loc?.locationName.toLowerCase().includes(search.toLowerCase()) ||
      (loc?.floor?.toLowerCase().includes(search.toLowerCase()) ?? false);

    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && loc?.isActive) ||
      (statusFilter === "Inactive" && !loc?.isActive);

    const locationMatch =
      subLocationFilter === "" ||
      loc.locationName?.toLowerCase() === subLocationFilter.toLowerCase();

    return searchMatch && statusMatch && locationMatch;
  });

  //pagination step-2
  const totalPages = Math.ceil(filteredSubLocations.length / itemsPerPage);
  const paginatedsubLocation = filteredSubLocations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //Create Api
  const handleAddSubLocation = async (data: Omit<SubLocation, "_id" | "createdAt">) => {
    await dispatch(createSubLocationAction(data));
    dispatch(getSubLocationsAction());
  };

  const handleEdit = (subLoc: SubLocation) => {
    setSelectedSubLocation(subLoc);
    setIsUpdateOpen(true);
  };

  //Update Api
  const handleUpdateSubLocation = async (updatedData: any) => {
    if (selectedSubLocation) {
      await dispatch(updateSubLocationAction(selectedSubLocation?._id, updatedData));
      dispatch(getSubLocationsAction());
    }
  };

  //Delete Api
  const handleDelete = async (id: string) => {
    await dispatch(deleteSubLocationAction(id));
    dispatch(getSubLocationsAction());
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
              {locations?.map((loc) => (
                <option key={loc?._id} value={loc?.locationName}>
                  {loc?.locationName}
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
              onUpload={async (uploadedData: any[]) => {
                const formattedData = uploadedData?.map((item) => ({
                  subLocationName: item["Sub Location"] || item?.subLocationName || "",
                  locationId: item?.locationId || "",
                  locationName: item?.locationName || item?.locationName || "",
                  floor: item?.Floor || item?.floor || "",
                  isActive:
                    item?.Status === "Active" ||
                    item?.status === "Active" ||
                    item?.isActive === true,
                  createdAt: new Date().toDateString(),
                }));
                for (const item of formattedData) {
                  await dispatch(createSubLocationAction(item));
                }
                dispatch(getSubLocationsAction());
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
                      <CiLocationOn size={18} />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-700">No Locations Found</h3>

                    <p className="text-xs text-gray-500">You haven’t added any locations yet.</p>

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
                <tr key={subLoc._id} className="hover:bg-gray-50 transition-all duration-150">
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
                    <div className="text-sm font-medium text-gray-900">{subLoc.floor || "-"}</div>
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
                        onClick={() => handleDelete(subLoc._id)}
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
        locations={locations}
      />
      <UpdateSubLocation
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSubLocation={selectedSubLocation}
        onUpdate={handleUpdateSubLocation}
        locations={locations}
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
