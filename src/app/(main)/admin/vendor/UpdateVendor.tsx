"use client";
import { useEffect, useState } from "react";

const empty = {
  vendorName: "",
  email: "",
  phone: "",
  address: "",
  gstNumber: "",
  contractExpiry: "",
  isActive: true,
};

function UpdateVendor({
  isOpen,
  onClose,
  selectedVendor,
  onUpdate,
  loading,
}: any) {
  const [formData, setFormData] = useState(empty);

  useEffect(() => {
    if (selectedVendor) {
      setFormData({
        vendorName: selectedVendor.vendorName ?? "",
        email: selectedVendor.email ?? "",
        phone: selectedVendor.phone ?? "",
        address: selectedVendor.address ?? "",
        gstNumber: selectedVendor.gstNumber ?? "",
        contractExpiry: selectedVendor.contractExpiry ?? "",
        isActive: selectedVendor.isActive ?? true,
      });
    }
  }, [selectedVendor]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Update Vendor</h2>
            <p className="text-gray-500 text-sm mt-1">Update vendor details</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              placeholder="Enter vendor name"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                GST Number
              </label>
              <input
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="Enter GST number"
                disabled={loading}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Contract Expiry
              </label>
              <input
                type="date"
                name="contractExpiry"
                value={formData.contractExpiry}
                onChange={handleChange}
                disabled={loading}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Enter full address"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none disabled:opacity-60"
            />
          </div>

          <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50">
            <span className="text-sm font-semibold text-gray-500">
              Active Status
            </span>
            <button
              onClick={() =>
                setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              disabled={loading}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                formData.isActive ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  formData.isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 bg-white border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVendor;
