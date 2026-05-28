"use client";
import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

function AddSupportGroup({ isOpen, onClose, onAdd, levels = [], managers = [], loading }: any) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    level: "",
    manager: "",
    maxTickets: 10,
    services: "",
    description: "",
    isActive: true,
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onAdd(form);
    setForm({
      name: "",
      code: "",
      level: "",
      manager: "",
      maxTickets: 10,
      services: "",
      description: "",
      isActive: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Support Group</h2>
            <p className="text-gray-500 text-sm mt-1">Create a new support group</p>
          </div>

          <button
            onClick={onClose}
            className="text-black text-xl font-bold cursor-pointer"
            disabled={loading}
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Support Group Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter support group name"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Support Group Code
              </label>
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="Enter code"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">Level</label>

              <Autocomplete
                options={levels || []}
                getOptionLabel={(option: string) => option}
                value={form.level || null}
                onChange={(_e, value: string | null) => setForm({ ...form, level: value || "" })}
                disabled={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Level"
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
              <label className="block text-sm font-semibold text-gray-500 mb-1">Manager</label>

              <Autocomplete
                options={managers || []}
                getOptionLabel={(option: any) => option.name || ""}
                isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
                value={managers.find((m: any) => m._id === form.manager) || null}
                onChange={(_e, value: any) => setForm({ ...form, manager: value?._id || "" })}
                disabled={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Manager"
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
              <label className="block text-sm font-semibold text-gray-500 mb-1">Max Tickets</label>
              <input
                type="number"
                value={form.maxTickets}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxTickets: Number(e.target.value),
                  })
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Supported Services
            </label>
            <input
              value={form.services}
              onChange={(e) => setForm({ ...form, services: e.target.value })}
              placeholder="Enter services"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter description"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none disabled:bg-gray-100"
              disabled={loading}
            />
          </div>
          <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 mt-2">
            <span className="text-sm font-semibold text-gray-500">Active Status</span>

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
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSupportGroup;
