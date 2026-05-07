"use client";
import { useEffect, useState } from "react";

function UpdateAssetCategories({
  isOpen,
  onClose,
  selectedAssetCategory,
  onUpdate,
  loading,
}: any) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (selectedAssetCategory) {
      setForm({
        name: selectedAssetCategory.name || "",
        code: selectedAssetCategory.code || "",
        description: selectedAssetCategory.description || "",
        isActive:
          selectedAssetCategory.isActive !== undefined
            ? selectedAssetCategory.isActive
            : true,
      });
    }
  }, [selectedAssetCategory]);

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Update Asset Category
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Modify asset category details
            </p>
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
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter category name"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Category Code
            </label>
            <input
              name="code"
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              placeholder="e.g. IT, HR, FIN"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={3}
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50">
            <span className="text-sm font-semibold text-gray-500">
              Active Status
            </span>
            <button
              onClick={() =>
                setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              disabled={loading}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                form.isActive ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  form.isActive ? "translate-x-5" : "translate-x-0"
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
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateAssetCategories;
