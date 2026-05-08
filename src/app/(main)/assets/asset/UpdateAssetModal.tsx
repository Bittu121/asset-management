"use client";
import AssetForm from "./AssetForm";

export default function UpdateAssetModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
  assetCategories,
  subCategories,
  vendors,
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Update Asset</h2>
            <p className="text-gray-500 text-sm mt-1">Update asset details</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto max-h-[80vh]">
          <AssetForm
            initialData={initialData}
            onSubmit={onSubmit}
            onClose={onClose}
            isEdit={true}
            loading={loading}
            assetCategories={assetCategories}
            subCategories={subCategories}
            vendors={vendors}
          />
        </div>
      </div>
    </div>
  );
}
