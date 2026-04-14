"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { Autocomplete, TextField } from "@mui/material";

function AddLocation({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    city: "",
    isActive: true,
  });

  const cities = [
    { label: "Mumbai" },
    { label: "Delhi" },
    { label: "Bangalore" },
    { label: "Hyderabad" },
    { label: "Chennai" },
    { label: "Kolkata" },
    { label: "Pune" },
    { label: "Ahmedabad" },
  ];
  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd({
      ...formData,
      isActive: true,
    });
    setFormData({ locationName: "", address: "", city: "", isActive: true });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Add Location</h2>
              <p className="text-gray-500 text-sm mt-1">
                Create a new location entry
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-black-800 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
          {/* Body */}
          <div className="px-6 py-5">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  Location Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  placeholder="Location name"
                  value={formData.locationName || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50 min-h-[70px] resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <Autocomplete
                  options={cities}
                  value={cities.find((c) => c.label === formData.city) || null}
                  onChange={(e, value) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: value?.label || "",
                    }))
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select City"
                      size="small"
                      sx={{
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

                          "& .MuiAutocomplete-endAdornment": {
                            top: "50%",
                            transform: "translateY(-50%)",
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
              <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 mt-5">
                <span className="text-sm font-semibold text-gray-500">
                  Active Status
                </span>
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: !prev.isActive,
                    }))
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                    formData.isActive ? "bg-indigo-600" : "bg-gray-300"
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
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex justify-end gap-3 bg-white border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 font-medium bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md cursor-pointer font-medium hover:bg-indigo-700 transition"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLocation;
// "use client";
// import React, { useState } from "react";
// import { X } from "lucide-react";

// function AddLocation({ isOpen, onClose, onAdd }: any) {
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     city: "",
//     isActive: true,
//   });

//   if (!isOpen) return null;

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     onAdd({
//       ...formData,
//       isActive: true,
//     });
//     setFormData({ name: "", address: "", city: "", isActive: true });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[95vh] overflow-hidden">
//         {/* Header */}
//         <div className="bg-indigo-50 px-8 py-6 rounded-t-2xl flex justify-between items-start">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">Add Location</h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Create a new location entry
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-black-800 text-xl font-bold cursor-pointer"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="overflow-y-auto px-8 py-6 flex-1">
//           <div className="border border-gray-200 rounded-xl p-6 bg-white">
//             <div className="space-y-4">
//               {/* Location Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-500 mb-1">
//                   Location Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="name"
//                   placeholder="Enter location name"
//                   value={formData.name || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
//                 />
//               </div>

//               {/* Address */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-500 mb-1">
//                   Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="address"
//                   placeholder="Enter address"
//                   value={formData.address || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
//                 />
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-500 mb-1">
//                   City <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="city"
//                   placeholder="Enter city"
//                   value={formData.city || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
//                 />
//               </div>

//               {/* Active Toggle */}
//               <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50">
//                 <label className="text-sm font-semibold text-gray-500">
//                   Active Status
//                 </label>
//                 <button
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       isActive: !prev.isActive,
//                     }))
//                   }
//                   className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
//                     formData.isActive ? "bg-indigo-600" : "bg-gray-300"
//                   }`}
//                 >
//                   <div
//                     className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
//                       formData.isActive ? "translate-x-5" : "translate-x-0"
//                     }`}
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-8 py-5 flex justify-end gap-4 bg-white border-t border-gray-100 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="px-6 py-2.5 text-gray-700 font-semibold bg-gray-100 rounded-md cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-8 py-2.5 bg-indigo-600 text-white rounded-md cursor-pointer font-semibold hover:bg-indigo-700 transition"
//           >
//             Create
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddLocation;
