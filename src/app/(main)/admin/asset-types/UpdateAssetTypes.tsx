"use client";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const muiStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    height: "42px",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#e5e7eb" },
    "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(199,210,254,0.8)" },
    "& input": { padding: "10px 16px", fontSize: "14px" },
  },
};

function UpdateAssetTypes({
  isOpen,
  onClose,
  selectedAssetType,
  onUpdate,
  loading,
  assetCategories = [],
  subCategories = [],
}: any) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (selectedAssetType) {
      setForm({
        name: selectedAssetType.name || "",
        category: selectedAssetType.category?._id || "",
        subCategory: selectedAssetType.subCategory?._id || "",
        description: selectedAssetType.description || "",
        isActive: selectedAssetType.isActive !== undefined ? selectedAssetType.isActive : true,
      });
    }
  }, [selectedAssetType]);

  if (!isOpen) return null;

  // Only show sub-categories that belong to the selected category
  const filteredSubs = subCategories.filter((s: any) => s.category?._id === form.category);

  const selectedCategory = assetCategories.find((c: any) => c._id === form.category) || null;
  const selectedSubCategory = filteredSubs.find((s: any) => s._id === form.subCategory) || null;

  const handleUpdate = () => {
    onUpdate({ ...form, subCategory: form.subCategory || null });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Update Asset Type</h2>
            <p className="text-gray-500 text-sm mt-1">Modify asset type details</p>
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
              Asset Type Name <span className="text-red-500">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter asset type name"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <Autocomplete
              options={assetCategories}
              getOptionLabel={(option: any) => option?.name || ""}
              isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
              value={selectedCategory}
              onChange={(_e, value: any) =>
                setForm((prev) => ({
                  ...prev,
                  category: value?._id || "",
                  subCategory: "",
                }))
              }
              disabled={loading}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select category" size="small" sx={muiStyle} />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Sub Category</label>
            <Autocomplete
              options={filteredSubs}
              getOptionLabel={(option: any) => option?.name || ""}
              isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
              value={selectedSubCategory}
              onChange={(_e, value: any) =>
                setForm((prev) => ({ ...prev, subCategory: value?._id || "" }))
              }
              disabled={loading || !form.category}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={form.category ? "Select sub category" : "Select category first"}
                  size="small"
                  sx={muiStyle}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Enter description"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50">
            <span className="text-sm font-semibold text-gray-500">Active Status</span>
            <button
              onClick={() => setForm((prev) => ({ ...prev, isActive: !prev.isActive }))}
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

export default UpdateAssetTypes;
