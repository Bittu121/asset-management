"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
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
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Add Roles & Permission
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
              placeholder="Role Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="max-h-60 overflow-y-auto custom-scroll border rounded p-3">
              {permissionModules.map((module) => (
                <div key={module.name} className="mb-3">
                  <p className="font-semibold text-sm">{module.name}</p>

                  {module.permissions.map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                      />
                      {perm}
                    </label>
                  ))}
                </div>
              ))}
            </div>

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

export default AddRoles;
