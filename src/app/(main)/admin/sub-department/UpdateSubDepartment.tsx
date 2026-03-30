"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

function UpdateSubDepartment({
  isOpen,
  onClose,
  selectedSubDepartment,
  onUpdate,
  department,
}: any) {
  const [form, setForm] = useState({
    name: "",
    parentDepartment: "",
    description: "",
    isActive: true,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedSubDepartment) {
      setForm(selectedSubDepartment);
    }
  }, [selectedSubDepartment]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Update Sub Department
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
              value={form.name}
              placeholder="Sub Department Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="relative">
              {/* Selected Value */}
              <div
                onClick={() => setOpen(!open)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.parentDepartment || "Select Parent Location"}
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {department.map((dept: any) => (
                    <div
                      key={dept.id}
                      onClick={() => {
                        setForm({ ...form, parentDepartment: dept.name });
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
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="flex justify-between items-center w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400">
              <span className="text-sm text-gray-600">Active</span>
              <button
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
                className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                  form.isActive ? "bg-green-500" : "bg-gray-300"
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
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onUpdate(form);
                onClose();
              }}
              className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateSubDepartment;
