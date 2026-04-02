import { X } from "lucide-react";
import AssetForm from "./AssetForm";

export default function UpdateAssetModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Update Asset</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <AssetForm
            initialData={initialData}
            onSubmit={onSubmit}
            onClose={onClose}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
}
