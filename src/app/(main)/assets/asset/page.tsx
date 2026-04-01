"use client";
import { useState } from "react";
import CreateAssetModal, { Asset } from "./CreateAssetModal";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 1,
      assetTag: "LAP-001",
      serialNumber: "SN123",
      category: "Laptop",
      subcategory: "Office",
      manufacturer: "Dell",
      model: "Latitude",

      vendor: "ABC Pvt Ltd",
      purchaseDate: "2024-01-01",
      purchaseCost: "50000",

      os: "Windows",
      processor: "i5",
      ram: "16GB",

      hostname: "DESKTOP-01",
      ipAddress: "192.168.1.10",
    },
  ]);

  // CREATE
  const handleCreate = () => {
    setSelectedAsset(null);
    setOpen(true);
  };

  // EDIT
  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setOpen(true);
  };

  // SUBMIT
  const handleSubmit = (data: Asset) => {
    if (selectedAsset) {
      // UPDATE
      setAssets((prev) =>
        prev.map((item) =>
          item.id === selectedAsset.id ? { ...item, ...data } : item,
        ),
      );
    } else {
      // CREATE
      setAssets((prev) => [...prev, { ...data, id: Date.now() }]);
    }

    setOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Assets</h1>

        <button
          onClick={handleCreate}
          className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white"
        >
          + Add Asset
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg">
        {assets.map((item) => (
          <div key={item.id} className="flex justify-between p-3 border-b">
            <div>
              <p className="font-medium">{item.assetTag}</p>
              <p className="text-xs text-gray-500">{item.serialNumber}</p>
            </div>

            <button
              onClick={() => handleEdit(item)}
              className="text-sm text-blue-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <CreateAssetModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={selectedAsset}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
