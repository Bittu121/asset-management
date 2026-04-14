// "use client";
// import { useState, useEffect } from "react";

// const steps = ["Basic", "Financial", "Specs", "Network"];

// const categoryOptions = ["Laptop", "Desktop", "Tablet", "Printer", "Server"];
// const subcategoryOptions = [
//   "Office",
//   "Development",
//   "Design",
//   "Portable",
//   "Gaming",
// ];
// const vendorOptions = [
//   "XYZ Pvt Ltd",
//   "TechSource Ltd",
//   "ABC Pvt Ltd",
//   "Apple Store",
//   "Mobile Hub",
//   "Global Tech",
// ];
// const osOptions = ["Windows", "Linux", "macOS", "Android", "iOS"];
// const ramOptions = ["4GB", "8GB", "16GB", "32GB", "64GB", "128GB"];

// const defaultForm = {
//   //step-0
//   assetTag: "",
//   serialNumber: "",
//   category: "",
//   subcategory: "",
//   manufacturer: "",
//   model: "",
//   device: "",
//   isActive: true,
//   description: "",

//   //step-1
//   vendor: "",
//   purchaseOrderId: "",
//   purchaseDate: "",
//   purchaseCost: "",
//   currentValue: "",
//   warrantyExpiry: "",
//   amcExpiry: "",

//   //step-2
//   os: "",
//   osVersion: "",
//   processor: "",
//   ram: "",
//   storageSize: "",

//   //step-3
//   hostname: "",
//   ipAddress: "",
//   macAddress: "",
// };

// export default function AssetForm({
//   initialData,
//   onSubmit,
//   onClose,
//   isEdit,
// }: any) {
//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState(defaultForm);

//   useEffect(() => {
//     setForm(initialData || defaultForm);
//   }, [initialData]);

//   const handleChange = (key: string, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const nextStep = () => {
//     if (step < steps.length - 1) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 0) setStep(step - 1);
//   };

//   // Step UI
//   const renderStep = () => {
//     switch (step) {
//       case 0:
//         return (
//           <>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Asset Tag"
//                 placeholder="Enter asset tag"
//                 value={form.assetTag}
//                 onChange={(v: any) => handleChange("assetTag", v)}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//               <Input
//                 label="Serial Number"
//                 placeholder="Enter serial number"
//                 value={form.serialNumber}
//                 onChange={(v: any) => handleChange("serialNumber", v)}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//               <Dropdown
//                 label="Category"
//                 value={form.category}
//                 onChange={(v: string) => handleChange("category", v)}
//                 options={categoryOptions}
//                 placeholder="Select category"
//               />
//               <Dropdown
//                 label="Subcategory"
//                 value={form.subcategory}
//                 onChange={(v: string) => handleChange("subcategory", v)}
//                 options={subcategoryOptions}
//                 placeholder="Select subcategory"
//               />
//               <Input
//                 label="Manufacturer"
//                 placeholder="Enter manufacturer"
//                 value={form.manufacturer}
//                 onChange={(v: any) => handleChange("manufacturer", v)}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//               <Input
//                 label="Model"
//                 placeholder="Enter model"
//                 value={form.model}
//                 onChange={(v: any) => handleChange("model", v)}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//               <Input
//                 label="Device"
//                 placeholder="Enter Device"
//                 value={form.device}
//                 onChange={(v: any) => handleChange("device", v)}
//                 className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs text-gray-600">Active</label>
//                 <div className="flex items-center justify-between w-full px-3 py-2.5 rounded-md border border-gray-200">
//                   <span className="text-sm text-gray-500">Active</span>
//                   <button
//                     onClick={() =>
//                       setForm((prev) => ({
//                         ...prev,
//                         isActive: !prev.isActive,
//                       }))
//                     }
//                     className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
//                       form.isActive ? "bg-green-500" : "bg-gray-300"
//                     }`}
//                   >
//                     <div
//                       className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
//                         form.isActive ? "translate-x-5" : "translate-x-0"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <textarea
//               placeholder="Description"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               className="w-full px-3 py-2.5 mt-4 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//           </>
//         );

//       case 1:
//         return (
//           <div className="grid grid-cols-2 gap-4">
//             <Dropdown
//               label="Vendor"
//               value={form.vendor}
//               onChange={(v: string) => handleChange("vendor", v)}
//               options={vendorOptions}
//               placeholder="Select vendor"
//             />
//             <Input
//               label="Purchase Order ID"
//               placeholder="Enter purchase order ID"
//               value={form.purchaseOrderId}
//               onChange={(v: any) => handleChange("purchaseOrderId", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Input
//               label="Purchase Date"
//               type="date"
//               placeholder="Select purchase date"
//               value={form.purchaseDate}
//               onChange={(v: any) => handleChange("purchaseDate", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Input
//               label="Purchase Cost"
//               placeholder="Enter purchase cost"
//               value={form.purchaseCost}
//               onChange={(v: any) => handleChange("purchaseCost", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Input
//               label="Current Value"
//               placeholder="Enter Current Value"
//               value={form.currentValue}
//               onChange={(v: any) => handleChange("currentValue", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Input
//               label="Warranty Expiry"
//               type="date"
//               value={form.warrantyExpiry}
//               onChange={(v: any) => handleChange("warrantyExpiry", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Input
//               label="AMC Warranty Expiry"
//               type="date"
//               value={form.amcExpiry}
//               onChange={(v: any) => handleChange("amcExpiry", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//           </div>
//         );

//       case 2:
//         return (
//           <div className="grid grid-cols-2 gap-4">
//             <Dropdown
//               label="OS"
//               value={form.os}
//               onChange={(v: string) => handleChange("os", v)}
//               options={osOptions}
//               placeholder="Select OS"
//             />
//             {/* os version need */}
//             <Input
//               label="Processor"
//               placeholder="Enter processor details"
//               value={form.processor}
//               onChange={(v: any) => handleChange("processor", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Dropdown
//               label="RAM"
//               value={form.ram}
//               onChange={(v: string) => handleChange("ram", v)}
//               options={ramOptions}
//               placeholder="Select RAM"
//             />
//             {/* stroage size need ->dropdown*/}
//           </div>
//         );

//       case 3:
//         return (
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               label="Hostname"
//               placeholder="Enter hostname"
//               value={form.hostname}
//               onChange={(v: any) => handleChange("hostname", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Input
//               label="IP Address"
//               placeholder="Enter IP address (e.g., 192.168.1.1)"
//               value={form.ipAddress}
//               onChange={(v: any) => handleChange("ipAddress", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <Input
//               label="MAC Address"
//               placeholder="Enter MAC address (e.g., 00:1A:2B:3C:4D:5E)"
//               value={form.macAddress}
//               onChange={(v: any) => handleChange("macAddress", v)}
//               className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             {/* mac address need */}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       {/* Step Indicator */}
//       <div className="flex items-center mb-8">
//         {steps.map((_, i) => (
//           <div key={i} className="flex items-center w-full">
//             {/* Circle */}
//             <div
//               className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
//         ${
//           step > i
//             ? "bg-green-500 border-green-500 text-white"
//             : step === i
//               ? "border-green-500 text-green-500 bg-white"
//               : "border-gray-300 text-gray-400 bg-white"
//         }`}
//             >
//               {step > i ? (
//                 "✓"
//               ) : (
//                 <span className="text-sm font-medium">{i + 1}</span>
//               )}
//             </div>

//             {/* Line */}
//             {i !== steps.length - 1 && (
//               <div className="flex-1 h-0.75 mx-2 rounded transition-all duration-300">
//                 <div
//                   className={`h-full rounded transition-all duration-500
//             ${step > i ? "bg-green-500 w-full" : "bg-gray-300 w-full"}`}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Step Content */}
//       {renderStep()}

//       {/* Footer Buttons */}
//       <div className="flex justify-between mt-8">
//         <button
//           onClick={prevStep}
//           disabled={step === 0}
//           className="px-4 py-2 border disabled:opacity-40 text-sm rounded-md border-gray-200 hover:bg-gray-50"
//         >
//           Previous
//         </button>

//         <div className="flex gap-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
//           >
//             Cancel
//           </button>

//           {step === steps.length - 1 ? (
//             <button
//               onClick={() => onSubmit(form)}
//               className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
//             >
//               {isEdit ? "Update" : "Create"}
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Reusable Input */
// function Input({
//   label,
//   value,
//   onChange,
//   type = "text",
//   placeholder,
//   className,
// }: any) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs text-gray-600">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className={
//           className ||
//           "w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//         }
//       />
//     </div>
//   );
// }

// /* Reusable Dropdown */
// function Dropdown({ label, value, onChange, options, placeholder }: any) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs text-gray-600">{label}</label>
//       <div className="relative">
//         <div
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
//         >
//           {value || placeholder}
//         </div>
//         {isOpen && (
//           <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto z-50">
//             {options.map((opt: string, idx: number) => (
//               <div
//                 key={idx}
//                 onClick={() => {
//                   onChange(opt);
//                   setIsOpen(false);
//                 }}
//                 className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//               >
//                 {opt}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const steps = ["Basic", "Financial", "Specs", "Network"];

const categoryOptions = ["Laptop", "Desktop", "Tablet", "Printer", "Server"];
const subcategoryOptions = [
  "Office",
  "Development",
  "Design",
  "Portable",
  "Gaming",
];
const vendorOptions = [
  "XYZ Pvt Ltd",
  "TechSource Ltd",
  "ABC Pvt Ltd",
  "Apple Store",
  "Mobile Hub",
  "Global Tech",
];
const osOptions = ["Windows", "Linux", "macOS", "Android", "iOS"];
const ramOptions = ["4GB", "8GB", "16GB", "32GB", "64GB", "128GB"];

const defaultForm = {
  //step-0
  assetTag: "",
  serialNumber: "",
  category: "",
  subcategory: "",
  manufacturer: "",
  model: "",
  device: "",
  isActive: true,
  description: "",

  //step-1
  vendor: "",
  purchaseOrderId: "",
  purchaseDate: "",
  purchaseCost: "",
  currentValue: "",
  warrantyExpiry: "",
  amcExpiry: "",

  //step-2
  os: "",
  osVersion: "",
  processor: "",
  ram: "",
  storageSize: "",

  //step-3
  hostname: "",
  ipAddress: "",
  macAddress: "",
};

export default function AssetForm({
  initialData,
  onSubmit,
  onClose,
  isEdit,
}: any) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(initialData || defaultForm);
  }, [initialData]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // Step UI
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Asset Tag"
                placeholder="Enter asset tag"
                value={form.assetTag}
                onChange={(v: any) => handleChange("assetTag", v)}
              />
              <Input
                label="Serial Number"
                placeholder="Enter serial number"
                value={form.serialNumber}
                onChange={(v: any) => handleChange("serialNumber", v)}
              />
              <MuiDropdown
                label="Category"
                value={form.category}
                onChange={(v: string) => handleChange("category", v)}
                options={categoryOptions}
                placeholder="Select category"
              />
              <MuiDropdown
                label="Subcategory"
                value={form.subcategory}
                onChange={(v: string) => handleChange("subcategory", v)}
                options={subcategoryOptions}
                placeholder="Select subcategory"
              />
              <Input
                label="Manufacturer"
                placeholder="Enter manufacturer"
                value={form.manufacturer}
                onChange={(v: any) => handleChange("manufacturer", v)}
              />
              <Input
                label="Model"
                placeholder="Enter model"
                value={form.model}
                onChange={(v: any) => handleChange("model", v)}
              />
              <Input
                label="Device"
                placeholder="Enter Device"
                value={form.device}
                onChange={(v: any) => handleChange("device", v)}
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Active</label>
                <div className="flex items-center justify-between w-full px-3 py-2.5 rounded-md border border-gray-200">
                  <span className="text-sm text-gray-500">Active</span>
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
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2.5 mt-4 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </>
        );

      case 1:
        return (
          <div className="grid grid-cols-2 gap-4">
            <MuiDropdown
              label="Vendor"
              value={form.vendor}
              onChange={(v: string) => handleChange("vendor", v)}
              options={vendorOptions}
              placeholder="Select vendor"
            />
            <Input
              label="Purchase Order ID"
              placeholder="Enter purchase order ID"
              value={form.purchaseOrderId}
              onChange={(v: any) => handleChange("purchaseOrderId", v)}
            />
            <Input
              label="Purchase Date"
              type="date"
              placeholder="Select purchase date"
              value={form.purchaseDate}
              onChange={(v: any) => handleChange("purchaseDate", v)}
            />
            <Input
              label="Purchase Cost"
              placeholder="Enter purchase cost"
              value={form.purchaseCost}
              onChange={(v: any) => handleChange("purchaseCost", v)}
            />
            <Input
              label="Current Value"
              placeholder="Enter Current Value"
              value={form.currentValue}
              onChange={(v: any) => handleChange("currentValue", v)}
            />
            <Input
              label="Warranty Expiry"
              type="date"
              value={form.warrantyExpiry}
              onChange={(v: any) => handleChange("warrantyExpiry", v)}
            />
            <Input
              label="AMC Warranty Expiry"
              type="date"
              value={form.amcExpiry}
              onChange={(v: any) => handleChange("amcExpiry", v)}
            />
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            <MuiDropdown
              label="OS"
              value={form.os}
              onChange={(v: string) => handleChange("os", v)}
              options={osOptions}
              placeholder="Select OS"
            />
            <Input
              label="OS Version"
              placeholder="Enter OS version"
              value={form.osVersion}
              onChange={(v: any) => handleChange("osVersion", v)}
            />
            <Input
              label="Processor"
              placeholder="Enter processor details"
              value={form.processor}
              onChange={(v: any) => handleChange("processor", v)}
            />
            <MuiDropdown
              label="RAM"
              value={form.ram}
              onChange={(v: string) => handleChange("ram", v)}
              options={ramOptions}
              placeholder="Select RAM"
            />
            <Input
              label="Storage Size"
              placeholder="Enter storage size"
              value={form.storageSize}
              onChange={(v: any) => handleChange("storageSize", v)}
            />
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Hostname"
              placeholder="Enter hostname"
              value={form.hostname}
              onChange={(v: any) => handleChange("hostname", v)}
            />
            <Input
              label="IP Address"
              placeholder="Enter IP address (e.g., 192.168.1.1)"
              value={form.ipAddress}
              onChange={(v: any) => handleChange("ipAddress", v)}
            />
            <Input
              label="MAC Address"
              placeholder="Enter MAC address (e.g., 00:1A:2B:3C:4D:5E)"
              value={form.macAddress}
              onChange={(v: any) => handleChange("macAddress", v)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Step Indicator - Centered */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-96">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center flex-1">
              {/* Circle */}
              <div
                className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
            ${
              step > i
                ? "bg-green-500 border-green-500 text-white"
                : step === i
                  ? "border-green-500 text-green-500 bg-white"
                  : "border-gray-300 text-gray-400 bg-white"
            }`}
              >
                {step > i ? (
                  "✓"
                ) : (
                  <span className="text-sm font-medium">{i + 1}</span>
                )}
              </div>

              {/* Line */}
              {i !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] transition-all duration-500
              ${step > i ? "bg-green-500" : "bg-gray-300"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Footer Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-4 py-2 border disabled:opacity-40 text-sm rounded-md border-gray-200 hover:bg-gray-50"
        >
          Previous
        </button>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>

          {step === steps.length - 1 ? (
            <button
              onClick={() => onSubmit(form)}
              className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, value, onChange, type = "text", placeholder }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
    </div>
  );
}

/* MUI Dropdown */
function MuiDropdown({ label, value, onChange, options, placeholder }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <Autocomplete
        options={options}
        value={value || null}
        onChange={(e, newValue) => onChange(newValue || "")}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.375rem",
                backgroundColor: "#ffffff",
                height: "42px",

                "& fieldset": {
                  borderColor: "#e5e7eb",
                },

                "&:hover fieldset": {
                  borderColor: "#9ca3af",
                },

                "&.Mui-focused": {
                  boxShadow: "0 0 0 1px rgba(156, 163, 175, 0.4)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#9ca3af",
                },

                "& input": {
                  padding: "10px 14px",
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
  );
}
