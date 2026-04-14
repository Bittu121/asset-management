"use client";
import React, { useState } from "react";
import { permissionModules } from "./rolesAndPermission";

function AddRoles({ isOpen, onClose, onAdd }: any) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
    permissions: [] as string[],
  });

  if (!isOpen) return null;

  const togglePermission = (perm: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSubmit = () => {
    onAdd(form);
    setForm({
      name: "",
      description: "",
      isActive: true,
      permissions: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Add Role & Permission
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Create a new role with permissions
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="space-y-4">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Role Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter role name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Description
              </label>
              <textarea
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Enter description"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
              />
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-2">
                Permissions
              </label>

              <div className="max-h-28 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {permissionModules.map((module) => (
                  <div key={module.name} className="mb-3">
                    <p className="font-semibold text-xs text-gray-600 mb-2 uppercase tracking-wide">
                      {module.name}
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {module.permissions.map((perm) => (
                        <label
                          key={perm}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <input
                            type="checkbox"
                            checked={form.permissions.includes(perm)}
                            onChange={() => togglePermission(perm)}
                            className="w-4 h-4"
                          />
                          {perm}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 mt-2">
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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 bg-white border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
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

export default AddRoles;
