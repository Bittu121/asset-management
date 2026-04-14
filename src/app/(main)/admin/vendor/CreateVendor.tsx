"use client";

import { useState } from "react";

function CreateVendor({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    contractExpiry: "",
    isActive: true,
  });

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleActive = () => {
    setFormData((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  const handleSubmit = () => {
    if (!formData.vendorName || !formData.email || !formData.phone) return;

    onAdd(formData);

    setFormData({
      vendorName: "",
      email: "",
      phone: "",
      address: "",
      gstNumber: "",
      contractExpiry: "",
      isActive: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Vendor</h2>
          </div>

          <button
            onClick={onClose}
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
              placeholder="Vendor name"
              value={formData.vendorName || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                GST Number
              </label>
              <input
                name="gstNumber"
                placeholder="GST Number"
                value={formData.gstNumber || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Contract Expiry
              </label>
              <input
                type="date"
                name="contractExpiry"
                value={formData.contractExpiry || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Enter full address"
              value={formData.address || ""}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Active</span>

            <button
              onClick={toggleActive}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                formData.isActive ? "bg-green-500" : "bg-gray-300"
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
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateVendor;
