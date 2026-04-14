// "use client";
// import React, { useState } from "react";
// import { X } from "lucide-react";

// function CreateUserAccount({
//   isOpen,
//   onClose,
//   onAdd,
//   roles,
//   departments,
//   subDepartments,
//   locations,
//   subLocations,
//   managers,
//   supportGroups,
// }: any) {
//   const [form, setForm] = useState<any>({
//     role: "",
//     name: "",
//     employeeCode: "",
//     email: "",
//     phone: "",
//     designation: "",
//     reportingTo: "",
//     department: "",
//     subDepartment: "",
//     location: "",
//     subLocation: "",
//     supportGroup: "",
//     password: "",
//   });
//   const [openDept, setOpenDept] = useState(false);
//   const [openSubDept, setOpenSubDept] = useState(false);
//   const [openLoc, setOpenLoc] = useState(false);
//   const [openSubLoc, setOpenSubLoc] = useState(false);
//   const [openManager, setOpenManager] = useState(false);
//   const [openSupport, setOpenSupport] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = () => {
//     onAdd(form);
//     onClose();
//   };
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
//         <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">
//               User Account
//             </h2>

//             <button
//               onClick={onClose}
//               className="p-1 rounded-md hover:bg-gray-100"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* Light Divider */}
//           <div className="h-px bg-gray-100 mb-5"></div>
//           <div className="space-y-3">
//             <div className="grid grid-cols-2 gap-4">
//               <select
//                 value={form.role}
//                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               >
//                 <option>Select Role</option>
//                 {roles.map((r: any) => (
//                   <option key={r}>{r}</option>
//                 ))}
//               </select>
//               <input
//                 placeholder="Full Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//               <input
//                 placeholder="Employee Code"
//                 value={form.employeeCode}
//                 onChange={(e) =>
//                   setForm({ ...form, employeeCode: e.target.value })
//                 }
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />

//               <input
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />

//               <input
//                 placeholder="Phone"
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />

//               <div className="relative">
//                 <div
//                   onClick={() => setOpenManager(!openManager)}
//                   className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//                 >
//                   {form.reportingTo || "Select Manager"}
//                 </div>

//                 {openManager && (
//                   <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                     {managers.map((m: any) => (
//                       <div
//                         key={m}
//                         onClick={() => {
//                           setForm({ ...form, reportingTo: m });
//                           setOpenManager(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {m}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative">
//                 <div
//                   onClick={() => setOpenDept(!openDept)}
//                   className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//                 >
//                   {form.department || "Select Department"}
//                 </div>

//                 {openDept && (
//                   <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                     {departments.map((d: any) => (
//                       <div
//                         key={d}
//                         onClick={() => {
//                           setForm({ ...form, department: d });
//                           setOpenDept(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {d}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative">
//                 <div
//                   onClick={() => setOpenSubDept(!openSubDept)}
//                   className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//                 >
//                   {form.subDepartment || "Select Sub Department"}
//                 </div>

//                 {openSubDept && (
//                   <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                     {subDepartments.map((sd: any) => (
//                       <div
//                         key={sd}
//                         onClick={() => {
//                           setForm({ ...form, subDepartment: sd });
//                           setOpenSubDept(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {sd}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative">
//                 <div
//                   onClick={() => setOpenLoc(!openLoc)}
//                   className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//                 >
//                   {form.location || "Select Location"}
//                 </div>

//                 {openLoc && (
//                   <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                     {locations.map((l: any) => (
//                       <div
//                         key={l}
//                         onClick={() => {
//                           setForm({ ...form, location: l });
//                           setOpenLoc(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {l}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative">
//                 <div
//                   onClick={() => setOpenSubLoc(!openSubLoc)}
//                   className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//                 >
//                   {form.subLocation || "Select Sub Location"}
//                 </div>

//                 {openSubLoc && (
//                   <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                     {subLocations.map((sl: any) => (
//                       <div
//                         key={sl}
//                         onClick={() => {
//                           setForm({ ...form, subLocation: sl });
//                           setOpenSubLoc(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {sl}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative col-span-2">
//                 <div
//                   onClick={() => setOpenSupport(!openSupport)}
//                   className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//                 >
//                   {form.supportGroup || "Select Support Group"}
//                 </div>

//                 {openSupport && (
//                   <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                     {supportGroups.map((sg: any) => (
//                       <div
//                         key={sg}
//                         onClick={() => {
//                           setForm({ ...form, supportGroup: sg });
//                           setOpenSupport(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {sg}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
//             >
//               Create
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CreateUserAccount;

"use client";
import React, { useState } from "react";
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

function CreateUserAccount({
  isOpen,
  onClose,
  onAdd,
  roles,
  departments,
  subDepartments,
  locations,
  subLocations,
  managers,
  supportGroups,
}: any) {
  const [currentStep, setCurrentStep] = useState(1);
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
    confirmPassword: "",
  });

  if (!isOpen) return null;

  // Add this helper function after the OptionType definition
  const createOptions = (items: any[]): OptionType[] => {
    return Array.from(
      new Map(
        items
          .filter((item: any) => item && String(item).trim() !== "")
          .map((item: any, i: number) => [i, { id: i, label: String(item) }]),
      ).values(),
    ) as OptionType[];
  };

  // Then use it like this:
  const roleOptions = createOptions(roles);
  const managerOptions = createOptions(managers);
  const departmentOptions = createOptions(departments);
  const subDepartmentOptions = createOptions(subDepartments);
  const locationOptions = createOptions(locations);
  const subLocationOptions = createOptions(subLocations);
  const supportGroupOptions = createOptions(supportGroups);

  const handleSubmit = () => {
    onAdd(form);
    setCurrentStep(1);
    setForm({
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
      confirmPassword: "",
    });
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
    options: OptionType[],
    value: string,
    onChange: (val: string) => void,
    placeholder: string,
  ) => (
    <Autocomplete
      options={options}
      getOptionLabel={(option: OptionType) => option.label}
      isOptionEqualToValue={(option: OptionType, val: OptionType) =>
        option.id === val.id
      }
      value={options.find((o) => o.label === value) || null}
      onChange={(_e, val) => onChange(val?.label || "")}
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
            {STEPS[currentStep - 1].label}
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
                  roleOptions,
                  form.role,
                  (val) => setForm({ ...form, role: val }),
                  "Select role",
                )}
              </div>

              <div>
                <label className={labelClass}>Reporting Manager</label>
                {renderAutocomplete(
                  managerOptions,
                  form.reportingTo,
                  (val) => setForm({ ...form, reportingTo: val }),
                  "Select manager",
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Department <span className="text-red-500">*</span>
                </label>
                {renderAutocomplete(
                  departmentOptions,
                  form.department,
                  (val) => setForm({ ...form, department: val }),
                  "Select department",
                )}
              </div>

              <div>
                <label className={labelClass}>Sub Department</label>
                {renderAutocomplete(
                  subDepartmentOptions,
                  form.subDepartment,
                  (val) => setForm({ ...form, subDepartment: val }),
                  "Select sub department",
                )}
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
                {renderAutocomplete(
                  locationOptions,
                  form.location,
                  (val) => setForm({ ...form, location: val }),
                  "Select location",
                )}
              </div>

              <div>
                <label className={labelClass}>Sub Location</label>
                {renderAutocomplete(
                  subLocationOptions,
                  form.subLocation,
                  (val) => setForm({ ...form, subLocation: val }),
                  "Select sub location",
                )}
              </div>

              <div className="col-span-2">
                <label className={labelClass}>Support Group</label>
                {renderAutocomplete(
                  supportGroupOptions,
                  form.supportGroup,
                  (val) => setForm({ ...form, supportGroup: val }),
                  "Select support group",
                )}
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
                    { label: "Role", value: form.role },
                    { label: "Department", value: form.department },
                    { label: "Location", value: form.location },
                    { label: "Support Group", value: form.supportGroup },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-2">
                      <span className="text-xs text-gray-500 font-medium w-28 flex-shrink-0">
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
            className="px-4 py-2 text-xs text-gray-400 border-violet-300 rounded-md hover:text-gray-600 transition"
          >
            Cancel
          </button>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm font-semibold text-violet-600 border border-violet-300 rounded-md hover:bg-violet-50 transition"
              >
                Previous
              </button>
            )}

            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 transition shadow-md shadow-violet-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 transition shadow-md shadow-violet-200"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUserAccount;
