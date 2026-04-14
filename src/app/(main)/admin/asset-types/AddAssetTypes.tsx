// "use client";
// import React, { useState } from "react";
// import { X } from "lucide-react";

// function AddAssetTypes({
//   isOpen,
//   onClose,
//   onAdd,
//   categories,
//   subCategories,
// }: any) {
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     subCategory: "",
//     description: "",
//     isActive: true,
//   });
//   const [openCategory, setOpenCategory] = useState(false);
//   const [openSubCategory, setOpenSubCategory] = useState(false);

//   const filteredSub = subCategories.filter(
//     (s: any) => s.parent === form.category,
//   );

//   if (!isOpen) return null;

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCategorySelect = (category: string) => {
//     setForm((prev) => ({ ...prev, category, subCategory: "" }));
//     setOpenCategory(false);
//     setOpenSubCategory(false);
//   };

//   const handleSubCategorySelect = (subCategory: string) => {
//     setForm((prev) => ({ ...prev, subCategory }));
//     setOpenSubCategory(false);
//   };

//   const handleSubmit = () => {
//     if (!form.name || !form.category) return;
//     onAdd(form);
//     setForm({ name: "", category: "", subCategory: "", description: "", isActive: true });
//     setOpenCategory(false);
//     setOpenSubCategory(false);
//     onClose();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
//         <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Add Asset Types
//             </h2>

//             <button
//               onClick={onClose}
//               className="p-1 rounded-md hover:bg-gray-100"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           <div className="h-px bg-gray-100 mb-5"></div>
//           <div className="space-y-3">
//             <input
//               name="name"
//               placeholder="Asset type"
//               value={form.name|| ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />

//             <div className="relative">
//               <div
//                 onClick={() => setOpenCategory((prev) => !prev)}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//               >
//                 {form.category || "Select category"}
//               </div>
//               {openCategory && (
//                 <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                   {categories.map((cat: any) => (
//                     <div
//                       key={cat.id}
//                       onClick={() => handleCategorySelect(cat.name)}
//                       className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                     >
//                       {cat.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <div
//                 onClick={() => {
//                   if (!form.category) return;
//                   setOpenSubCategory((prev) => !prev);
//                 }}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
//               >
//                 {form.subCategory || "Select subcategory"}
//               </div>
//               {openSubCategory && (
//                 <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
//                   {filteredSub.length > 0 ? (
//                     filteredSub.map((sub: any) => (
//                       <div
//                         key={sub.id}
//                         onClick={() => handleSubCategorySelect(sub.name)}
//                         className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                       >
//                         {sub.name}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="px-3 py-2 text-sm text-gray-500">Select a category first</div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <textarea
//               name="description"
//               placeholder="Description"
//               value={form.description|| ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />

//             <div className="flex justify-between items-center w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400">
//               <span className="text-sm text-gray-600">Active</span>

//               <button
//                 onClick={() =>
//                   setForm((prev) => ({
//                     ...prev,
//                     isActive: !prev.isActive,
//                   }))
//                 }
//                 className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
//                   form.isActive ? "bg-green-500" : "bg-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
//                     form.isActive ? "translate-x-5" : "translate-x-0"
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>

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

// export default AddAssetTypes;

"use client";
import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

function AddAssetTypes({
  isOpen,
  onClose,
  onAdd,
  categories = [],
  subCategories = [],
}: any) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    description: "",
    isActive: true,
  });

  // Filter subcategories based on selected category
  const filteredSub = subCategories.filter(
    (s: any) => (s.parent || s.category) === form.category,
  );

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.name || !form.category) return;

    onAdd(form);
    setForm({
      name: "",
      category: "",
      subCategory: "",
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
            <h2 className="text-lg font-bold text-gray-900">Add Asset Type</h2>
            <p className="text-gray-500 text-sm mt-1">
              Create a new asset type
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Asset Type Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter asset type"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Category
            </label>

            <Autocomplete
              options={categories || []}
              getOptionLabel={(option: any) =>
                typeof option === "string" ? option : option?.name || ""
              }
              value={
                categories.find((c: any) => (c?.name || c) === form.category) ||
                null
              }
              onChange={(e, value: any) =>
                setForm((prev) => ({
                  ...prev,
                  category:
                    typeof value === "string" ? value : value?.name || "",
                  subCategory: "",
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Category"
                  size="small"
                  sx={muiStyle}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Sub Category
            </label>

            <Autocomplete
              options={filteredSub || []}
              getOptionLabel={(option: any) =>
                typeof option === "string" ? option : option?.name || ""
              }
              value={
                filteredSub.find(
                  (s: any) => (s?.name || s) === form.subCategory,
                ) || null
              }
              onChange={(e, value: any) =>
                setForm((prev) => ({
                  ...prev,
                  subCategory:
                    typeof value === "string" ? value : value?.name || "",
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    form.category
                      ? "Select Sub Category"
                      : "Select category first"
                  }
                  size="small"
                  sx={muiStyle}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              placeholder="Enter description"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50">
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

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
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

const muiStyle = {
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
};

export default AddAssetTypes;
