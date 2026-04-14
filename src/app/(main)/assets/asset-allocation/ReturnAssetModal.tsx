// "use client";
// import { X } from "lucide-react";
// import ReturnAssetForm from "./ReturnAssetForm";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
//   assetName: string;
// };

// export default function ReturnAssetModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   assetName,
// }: Props) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
//       <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Return Asset: {assetName}
//           </h2>
//           <button onClick={onClose}>
//             <X className="w-5 h-5 text-gray-500 hover:text-black" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6">
//           <ReturnAssetForm onSubmit={onSubmit} onClose={onClose} />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { X } from "lucide-react";
import ReturnAssetForm from "./ReturnAssetForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  assetName: string;
};

export default function ReturnAssetModal({
  isOpen,
  onClose,
  onSubmit,
  assetName,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-3">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Return Asset</h2>
            <p className="text-sm text-gray-500 mt-1">
              Returning: <span className="font-medium">{assetName}</span>
            </p>
          </div>

          <button onClick={onClose} className="text-black text-xl font-bold">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-5">
          <ReturnAssetForm onSubmit={onSubmit} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
