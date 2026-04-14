// "use client";
// import { useState } from "react";

// export default function ReturnAssetForm({ onSubmit, onClose }: any) {
//   const [form, setForm] = useState({
//     condition: "Good",
//     notes: "",
//   });

//   const conditions = ["Good", "Fair", "Poor", "Damaged"];

//   return (
//     <div className="space-y-5">
//       <Select
//         label="Return Condition"
//         value={form.condition}
//         options={conditions}
//         onChange={(v) => setForm({ ...form, condition: v })}
//       />

//       <Textarea
//         label="Return Notes"
//         value={form.notes}
//         onChange={(v) => setForm({ ...form, notes: v })}
//         placeholder="Any notes about the return..."
//       />

//       <div className="flex justify-end gap-3 pt-4">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={() => onSubmit(form)}
//           className="px-5 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
//         >
//           Return Asset
//         </button>
//       </div>
//     </div>
//   );
// }

// function Input({ label, value, onChange, type = "text" }: any) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs text-gray-600">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// function Textarea({ label, value, onChange, placeholder }: any) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs text-gray-600">{label}</label>
//       <textarea
//         value={value}
//         placeholder={placeholder}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// function Select({ label, value, options, onChange, placeholder }: any) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs text-gray-600">{label}</label>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//       >
//         <option value="">{placeholder || "Select"}</option>
//         {options.map((opt: string, i: number) => (
//           <option key={i}>{opt}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function ReturnAssetForm({ onSubmit, onClose }: any) {
  const [form, setForm] = useState({
    condition: "Good",
    notes: "",
  });

  const conditions = ["Good", "Fair", "Poor", "Damaged"];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-500 mb-1">
          Return Condition <span className="text-red-500">*</span>
        </label>

        <Autocomplete
          options={conditions}
          value={form.condition}
          onChange={(e, value) =>
            setForm((prev) => ({
              ...prev,
              condition: value || "",
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select Condition"
              size="small"
              sx={muiStyle}
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-500 mb-1">
          Return Notes
        </label>
        <textarea
          value={form.notes}
          placeholder="Any notes about the return..."
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              notes: e.target.value,
            }))
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={() => onSubmit(form)}
          className="px-4 py-2 text-sm text-white rounded-md bg-indigo-600 hover:bg-indigo-700"
        >
          Return Asset
        </button>
      </div>
    </div>
  );
}

const muiStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    height: "42px",

    "& fieldset": {
      borderColor: "#e5e7eb",
    },

    "&:hover fieldset": {
      borderColor: "#e5e7eb",
    },

    "&.Mui-focused": {
      boxShadow: "0 0 0 2px rgba(199,210,254,0.8)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#c7d2fe",
    },

    "& input": {
      padding: "10px 16px",
      fontSize: "14px",
      color: "#374151",
    },
  },
};
