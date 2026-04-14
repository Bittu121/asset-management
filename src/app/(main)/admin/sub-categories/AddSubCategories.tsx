"use client";
import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

function AddSubCategories({ isOpen, onClose, onAdd, categories = [] }: any) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    isActive: true,
  });

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onAdd(form);
    setForm({ name: "", category: "", description: "", isActive: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Add Sub Category
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Create a new sub category
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Sub Category Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter sub category name"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Category
            </label>

            <Autocomplete
              options={categories || []}
              getOptionLabel={(option: any) =>
                typeof option === "string" ? option : option?.name || ""
              }
              isOptionEqualToValue={(option, value) =>
                (option?.id || option) === (value?.id || value)
              }
              value={
                categories.find((c: any) => (c?.name || c) === form.category) ||
                null
              }
              onChange={(e, value: any) =>
                setForm((prev) => ({
                  ...prev,
                  category:
                    typeof value === "string" ? value : value?.name || "",
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Category"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem",
                      backgroundColor: "#f9fafb",
                      height: "42px",
                      "& fieldset": { borderColor: "#e5e7eb" },
                      "&:hover fieldset": { borderColor: "#e5e7eb" },
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 2px rgba(199,210,254,0.8)",
                      },
                      "& input": {
                        padding: "10px 16px",
                        fontSize: "14px",
                      },
                    },
                  }}
                />
              )}
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50">
            <span className="text-sm font-semibold text-gray-500">
              Active Status
            </span>

            <button
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  isActive: !prev.isActive,
                }))
              }
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
            className="px-4 py-2 text-sm  text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategories;
