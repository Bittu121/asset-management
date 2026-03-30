// "use client";
// import React, { useState } from "react";
// import { X } from "lucide-react";

// function UpdateUserAccount({
//   isOpen,
//   onClose,
//   selectedUserAccount,
//   onUpdate,
//   roles,
//   departments,
//   subDepartments,
//   locations,
//   subLocations,
//   managers,
//   supportGroups,
// }: any) {
//   const [openDept, setOpenDept] = useState(false);
//   const [openSubDept, setOpenSubDept] = useState(false);
//   const [openLoc, setOpenLoc] = useState(false);
//   const [openSubLoc, setOpenSubLoc] = useState(false);
//   const [openManager, setOpenManager] = useState(false);
//   const [openSupport, setOpenSupport] = useState(false);
//   return (
//     <>
//       <div></div>
//     </>
//   );
// }

// export default UpdateUserAccount;

"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function UpdateUserAccount({
  isOpen,
  onClose,
  selectedUserAccount,
  onUpdate,
  roles,
  departments,
  subDepartments,
  locations,
  subLocations,
  managers,
  supportGroups,
}: any) {
  const [form, setForm] = useState<any>({
    role: "",
    name: "",
    employeeCode: "",
    email: "",
    phone: "",
    designation: "",
    reportingTo: "",
    department: "",
    subDepartment: "",
    location: "",
    subLocation: "",
    supportGroup: "",
    password: "",
  });

  const [openDept, setOpenDept] = useState(false);
  const [openSubDept, setOpenSubDept] = useState(false);
  const [openLoc, setOpenLoc] = useState(false);
  const [openSubLoc, setOpenSubLoc] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);

  // Fill form when selectedUserAccount changes
  useEffect(() => {
    if (selectedUserAccount) {
      setForm({ ...selectedUserAccount });
    }
  }, [selectedUserAccount]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onUpdate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Update User Account
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-5"></div>

        {/* Form */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            {/* Role */}
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option>Select Role</option>
              {roles.map((r: any) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            {/* Full Name */}
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {/* Employee Code */}
            <input
              placeholder="Employee Code"
              value={form.employeeCode}
              onChange={(e) =>
                setForm({ ...form, employeeCode: e.target.value })
              }
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {/* Email */}
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {/* Phone */}
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {/* Manager */}
            <div className="relative">
              <div
                onClick={() => setOpenManager(!openManager)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.reportingTo || "Select Manager"}
              </div>
              {openManager && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {managers.map((m: any) => (
                    <div
                      key={m}
                      onClick={() => {
                        setForm({ ...form, reportingTo: m });
                        setOpenManager(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Department */}
            <div className="relative">
              <div
                onClick={() => setOpenDept(!openDept)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.department || "Select Department"}
              </div>
              {openDept && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {departments.map((d: any) => (
                    <div
                      key={d}
                      onClick={() => {
                        setForm({ ...form, department: d });
                        setOpenDept(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sub Department */}
            <div className="relative">
              <div
                onClick={() => setOpenSubDept(!openSubDept)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.subDepartment || "Select Sub Department"}
              </div>
              {openSubDept && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {subDepartments.map((sd: any) => (
                    <div
                      key={sd}
                      onClick={() => {
                        setForm({ ...form, subDepartment: sd });
                        setOpenSubDept(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sd}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="relative">
              <div
                onClick={() => setOpenLoc(!openLoc)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.location || "Select Location"}
              </div>
              {openLoc && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {locations.map((l: any) => (
                    <div
                      key={l}
                      onClick={() => {
                        setForm({ ...form, location: l });
                        setOpenLoc(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {l}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sub Location */}
            <div className="relative">
              <div
                onClick={() => setOpenSubLoc(!openSubLoc)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.subLocation || "Select Sub Location"}
              </div>
              {openSubLoc && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {subLocations.map((sl: any) => (
                    <div
                      key={sl}
                      onClick={() => {
                        setForm({ ...form, subLocation: sl });
                        setOpenSubLoc(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sl}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Support Group */}
            <div className="relative">
              <div
                onClick={() => setOpenSupport(!openSupport)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.supportGroup || "Select Support Group"}
              </div>
              {openSupport && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {supportGroups.map((sg: any) => (
                    <div
                      key={sg}
                      onClick={() => {
                        setForm({ ...form, supportGroup: sg });
                        setOpenSupport(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sg}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserAccount;
