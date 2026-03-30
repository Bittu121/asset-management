"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

function AddSubDepartment({ isOpen, onClose, onAdd, department }: any) {
  const [formData, setFormData] = useState({
    name: "",
    parentDepartment: "",
    description: "",
    isActive: true,
  });
  const [open, setOpen] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({
      name: "",
      parentDepartment: "",
      description: "",
      isActive: true,
    });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Add Sub Department
            </h2>

            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Light Divider */}
          <div className="h-px bg-gray-100 mb-5"></div>
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Sub Department Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {/* Custom Dropdown */}
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {formData.parentDepartment || "Select Parent Department"}
              </div>

              {open && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto z-50 custom-scroll">
                  {department.map((dept: any) => (
                    <div
                      key={dept.id}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          parentDepartment: dept.name,
                        });
                        setOpen(false);
                      }}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {dept.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="flex justify-between items-center w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400">
              <span className="text-sm text-gray-600">Active</span>

              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
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
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSubDepartment;
