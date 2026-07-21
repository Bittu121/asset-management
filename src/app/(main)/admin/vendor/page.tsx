"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateVendor from "./CreateVendor";
import UpdateVendor from "./UpdateVendor";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { FiBriefcase } from "react-icons/fi";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  fetchVendors,
  createVendorAction,
  updateVendorAction,
  deleteVendorAction,
} from "@/store/vendor/vendorActions";

function VendorPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { vendors, loading, createLoading, updateLoading, deleteLoading } = useSelector(
    (state: RootState) => state.vendor
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vendorFilter, setVendorFilter] = useState("");

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      search === "" ||
      v.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      (v.phone || "").includes(search);
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && v.isActive) ||
      (statusFilter === "Inactive" && !v.isActive);
    const matchesVendor = vendorFilter === "" || v._id === vendorFilter;
    return matchesSearch && matchesStatus && matchesVendor;
  });

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = (data: any) => {
    dispatch(createVendorAction(data, () => setIsAddOpen(false)));
  };

  const handleEdit = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsUpdateOpen(true);
  };

  const handleUpdate = (updatedData: any) => {
    if (selectedVendor) {
      dispatch(updateVendorAction(selectedVendor._id, updatedData, () => setIsUpdateOpen(false)));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      dispatch(deleteVendorAction(id));
    }
  };

  const handleBulkUpload = (uploadedData: any[]) => {
    uploadedData.forEach((item) => {
      const vendorData = {
        vendorName: item["Vendor Name"] || item.vendorName || "",
        email: item.Email || item.email || "",
        phone: item.Phone || item.phone || "",
        address: item.Address || item.address || "",
        gstNumber: item["GST Number"] || item.gstNumber || "",
        contractExpiry: item["Contract Expiry"] || item.contractExpiry || "",
        isActive: item.Status === "Active" || item.status === "Active" || item.isActive === true,
      };
      if (vendorData.vendorName && vendorData.email && vendorData.phone) {
        dispatch(createVendorAction(vendorData));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vendors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Vendor</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={vendorFilter}
              onChange={(e) => {
                setVendorFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">All Vendors</option>
              {vendors.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.vendorName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredVendors.map((v) => ({
                ID: v._id.slice(-6),
                "Vendor Name": v.vendorName,
                Email: v.email,
                Phone: v.phone,
                Address: v.address || "-",
                "GST Number": v.gstNumber || "-",
                "Contract Expiry": v.contractExpiry || "-",
                Status: v.isActive ? "Active" : "Inactive",
                "Created At": new Date(v.createdAt).toLocaleDateString(),
              }))}
              fileName="vendors"
              headers={[
                { label: "ID", key: "ID" },
                { label: "Vendor Name", key: "Vendor Name" },
                { label: "Email", key: "Email" },
                { label: "Phone", key: "Phone" },
                { label: "Address", key: "Address" },
                { label: "GST Number", key: "GST Number" },
                { label: "Contract Expiry", key: "Contract Expiry" },
                { label: "Status", key: "Status" },
                { label: "Created At", key: "Created At" },
              ]}
              onUpload={handleBulkUpload}
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
        <table className="min-w-300 w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              {/* <th className="px-6 py-4 text-left">ID</th> */}
              <th className="px-6 py-4 text-left">Vendor Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Address</th>
              <th className="px-6 py-4 text-left">GST</th>
              <th className="px-6 py-4 text-left">Expiry</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedVendors.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FiBriefcase size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">No Vendors Found</h3>
                    <p className="text-xs text-gray-500">You haven't added any vendors yet.</p>
                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add Vendor
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedVendors.map((v) => (
                <tr key={v._id} className="hover:bg-gray-50 transition-all duration-150">
                  {/* <td className="px-6 py-5 text-sm font-medium text-gray-900">{v._id.slice(-6)}</td> */}
                  <td className="px-6 py-5 text-sm font-medium text-gray-900">{v.vendorName}</td>
                  <td className="px-6 py-5 text-sm text-gray-700">{v.email}</td>
                  <td className="px-6 py-5 text-sm text-gray-700">{v.phone}</td>
                  <td className="px-6 py-5 text-sm text-gray-700 max-w-45 truncate">
                    {v.address || "-"}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">{v.gstNumber || "-"}</td>
                  <td className="px-6 py-5 text-sm text-gray-700">{v.contractExpiry || "-"}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        v.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {v.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(v)}
                        disabled={updateLoading}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      <div className="w-px h-4 bg-gray-200" />
                      <button
                        onClick={() => handleDelete(v._id)}
                        disabled={deleteLoading}
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
        onAdd={handleAdd}
        loading={createLoading}
      />
      <UpdateVendor
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedVendor={selectedVendor}
        onUpdate={handleUpdate}
        loading={updateLoading}
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

export default VendorPage;
