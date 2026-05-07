"use client";
import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const STEPS = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Organization" },
  { id: 3, label: "Location & Group" },
  { id: 4, label: "Security" },
];

type OptionType = { id: number; label: string };

const autocompleteStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    height: "42px",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#e5e7eb" },
    "&.Mui-focused": {
      boxShadow: "0 0 0 2px rgba(199,210,254,0.8)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c4b5fd",
    },
    "& input": {
      padding: "10px 16px",
      fontSize: "14px",
      color: "#374151",
    },
    "& .MuiAutocomplete-endAdornment": {
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
};

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
  loading,
}: any) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<any>({
    name: "",
    employeeCode: "",
    email: "",
    phone: "",
    designation: "",
    role: "",
    reportingManager: "",
    department: "",
    subDepartment: "",
    location: "",
    subLocation: "",
    password: "",
    confirmPassword: "",
  });

  // Fill form when selectedUserAccount changes
  useEffect(() => {
    if (selectedUserAccount) {
      setForm({
        ...selectedUserAccount,
        role: selectedUserAccount.role?._id || "",
        reportingManager: selectedUserAccount.reportingManager?._id || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [selectedUserAccount]);

  if (!isOpen) return null;

  // Helper function to create options
  const createOptions = (items: any[]): OptionType[] => {
    return Array.from(
      new Map(
        items
          .filter((item: any) => item && String(item).trim() !== "")
          .map((item: any, i: number) => [i, { id: i, label: String(item) }]),
      ).values(),
    ) as OptionType[];
  };

  const roleOptions = createOptions(roles);
  const managerOptions = createOptions(managers);
  const departmentOptions = createOptions(departments);
  const subDepartmentOptions = createOptions(subDepartments);
  const locationOptions = createOptions(locations);
  const subLocationOptions = createOptions(subLocations);

  const handleSubmit = () => {
    const { confirmPassword, ...userData } = form;

    // Only send password if it's set
    if (!userData.password) {
      delete userData.password;
    }

    onUpdate(userData);
    setCurrentStep(1);
    onClose();
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent bg-white";

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  const renderAutocomplete = (
    options: any[],
    value: any,
    onChange: (val: any) => void,
    placeholder: string,
    labelKey: string = "name",
    valueKey: string = "_id",
  ) => (
    <Autocomplete
      options={options}
      getOptionLabel={(option: any) => option[labelKey] || ""}
      isOptionEqualToValue={(option: any, val: any) =>
        option[valueKey] === val[valueKey]
      }
      value={options.find((o) => o[valueKey] === value) || null}
      onChange={(_e, val) => onChange(val?.[valueKey] || "")}
      disabled={loading}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          size="small"
          sx={autocompleteStyle}
        />
      )}
    />
  );

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#f8f8fc] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* ── Stepper ── */}
        <div className="px-10 pt-8 pb-4">
          <div className="flex items-center justify-between relative">
            {/* Connector segments between circles */}
            {STEPS.slice(0, -1).map((step, index) => {
              const isSegmentFilled = currentStep > step.id;
              return (
                <div
                  key={`segment-${index}`}
                  className="absolute top-5 h-1 z-0 transition-all duration-500"
                  style={{
                    left: `calc(${(index / (STEPS.length - 1)) * 100}% + 20px)`,
                    width: `calc(${(1 / (STEPS.length - 1)) * 100}% - 40px)`,
                    backgroundColor: isSegmentFilled ? "#7c3aed" : "#e5e7eb",
                  }}
                />
              );
            })}

            {/* Step circles */}
            {STEPS.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center z-10 gap-2"
                >
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isCompleted || isActive
                        ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                      isActive
                        ? "text-violet-600"
                        : isCompleted
                          ? "text-violet-400"
                          : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-10 py-6">
          <h2 className="text-lg font-bold text-violet-600 mb-6">
            Update {STEPS[currentStep - 1].label}
          </h2>

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Type your full name"
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Employee Code <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Type employee code"
                  value={form.employeeCode || ""}
                  onChange={(e) =>
                    setForm({ ...form, employeeCode: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Type your email"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Type phone number"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="col-span-2">
                <label className={labelClass}>Designation</label>
                <input
                  placeholder="Type your designation"
                  value={form.designation || ""}
                  onChange={(e) =>
                    setForm({ ...form, designation: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelClass}>
                  Role <span className="text-red-500">*</span>
                </label>
                {renderAutocomplete(
                  roles,
                  form.role,
                  (val) => setForm({ ...form, role: val }),
                  "Select role",
                )}
              </div>

              <div>
                <label className={labelClass}>Reporting Manager</label>
                {renderAutocomplete(
                  managers,
                  form.reportingManager,
                  (val) => setForm({ ...form, reportingManager: val }),
                  "Select manager",
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className={inputClass}
                  disabled={loading}
                >
                  <option value="">Select department</option>
                  {departments.map((dept: string) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Sub Department</label>
                <select
                  value={form.subDepartment}
                  onChange={(e) =>
                    setForm({ ...form, subDepartment: e.target.value })
                  }
                  className={inputClass}
                  disabled={loading}
                >
                  <option value="">Select sub department</option>
                  {subDepartments.map((subDept: string) => (
                    <option key={subDept} value={subDept}>
                      {subDept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelClass}>
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className={inputClass}
                  disabled={loading}
                >
                  <option value="">Select location</option>
                  {locations.map((loc: string) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Sub Location</label>
                <select
                  value={form.subLocation}
                  onChange={(e) =>
                    setForm({ ...form, subLocation: e.target.value })
                  }
                  className={inputClass}
                  disabled={loading}
                >
                  <option value="">Select sub location</option>
                  {subLocations.map((subLoc: string) => (
                    <option key={subLoc} value={subLoc}>
                      {subLoc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelClass}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Type your password"
                  value={form.password || ""}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Retype your password"
                  value={form.confirmPassword || ""}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="col-span-2 mt-2 bg-violet-50 border border-violet-100 rounded-xl p-4">
                <p className="text-xs font-bold text-violet-600 mb-3 uppercase tracking-wide">
                  Review Summary
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Employee Code", value: form.employeeCode },
                    { label: "Phone", value: form.phone },
                    {
                      label: "Role",
                      value: roles.find((r: any) => r._id === form.role)?.name,
                    },
                    { label: "Department", value: form.department },
                    { label: "Location", value: form.location },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-2">
                      <span className="text-xs text-gray-500 font-medium w-28 shrink-0">
                        {item.label}:
                      </span>
                      <span className="text-xs text-gray-800 font-semibold truncate">
                        {item.value || (
                          <span className="text-gray-300 font-normal">—</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-10 py-5 bg-white border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition"
            disabled={loading}
          >
            Cancel
          </button>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm font-semibold text-violet-600 border border-violet-300 rounded-md hover:bg-violet-50 transition"
                disabled={loading}
              >
                Previous
              </button>
            )}

            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 transition shadow-md shadow-violet-200"
                disabled={loading}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 transition shadow-md shadow-violet-200"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {loading ? "Updating..." : "Update"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserAccount;
