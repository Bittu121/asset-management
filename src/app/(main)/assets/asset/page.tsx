"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiPencilSquare } from "react-icons/hi2";
import { MdQrCode2 } from "react-icons/md";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import UpdateAssetModal from "./UpdateAssetModal";
import Pagination from "../../../components/common/Pagination";
import AddAssetModal from "./AddAssetModal";
import QRModal from "./QRModal";

export type Asset = {
  //step-0
  id: number;
  assetTag: string;
  serialNumber: string;
  category: string;
  subcategory: string;
  manufacturer: string;
  model: string;
  device: string;
  isActive: boolean;
  description: string;

  //step-1
  vendor: string;
  purchaseOrderId: string;
  purchaseDate: string;
  purchaseCost: string;
  currentValue: string;
  warrantyExpiry: string;
  amcExpiry: string;

  //step-2
  os: string;
  osVersion: string;
  processor: string;
  ram: string;
  storageSize: string;

  //step-3
  hostname: string;
  ipAddress: string;
  macAddress: string;
};

export default function Page() {
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 1,
      assetTag: "LAP-002",
      serialNumber: "SN124",
      category: "Laptop",
      subcategory: "Office",
      manufacturer: "HP",
      model: "EliteBook",
      device: "HP EliteBook",
      isActive: true,
      description: "Office use laptop",
      vendor: "XYZ Pvt Ltd",
      purchaseOrderId: "PO-1001",
      purchaseDate: "2023-11-15",
      purchaseCost: "62000",
      currentValue: "50000",
      warrantyExpiry: "2026-11-15",
      amcExpiry: "2025-11-15",
      os: "Windows",
      osVersion: "Windows 11",
      processor: "Intel i7",
      ram: "16GB",
      storageSize: "512GB",
      hostname: "DESKTOP-02",
      ipAddress: "192.168.1.11",
      macAddress: "00:1A:2B:3C:4D:01",
    },
    {
      id: 2,
      assetTag: "LAP-003",
      serialNumber: "SN125",
      category: "Laptop",
      subcategory: "Development",
      manufacturer: "Lenovo",
      model: "ThinkPad",
      device: "Lenovo ThinkPad",
      isActive: true,
      description: "Developer machine",
      vendor: "TechSource Ltd",
      purchaseOrderId: "PO-1001",
      purchaseDate: "2024-02-10",
      purchaseCost: "70000",
      currentValue: "65000",
      warrantyExpiry: "2027-02-10",
      amcExpiry: "2026-02-10",
      os: "Linux",
      osVersion: "Ubuntu 22.04",
      processor: "Ryzen 5",
      ram: "32GB",
      storageSize: "1TB",
      hostname: "DEV-01",
      ipAddress: "192.168.1.12",
      macAddress: "00:1A:2B:3C:4D:02",
    },
    {
      id: 3,
      assetTag: "DESK-001",
      serialNumber: "SN126",
      category: "Desktop",
      subcategory: "Office",
      manufacturer: "Dell",
      model: "OptiPlex",
      device: "Dell OptiPlex",
      isActive: true,
      description: "Office desktop system",
      vendor: "ABC Pvt Ltd",
      purchaseOrderId: "PO-1002",
      purchaseDate: "2023-09-05",
      purchaseCost: "45000",
      currentValue: "35000",
      warrantyExpiry: "2026-09-05",
      amcExpiry: "2025-09-05",
      os: "Windows",
      osVersion: "Windows 10",
      processor: "Intel i5",
      ram: "8GB",
      storageSize: "256GB",
      hostname: "DESKTOP-03",
      ipAddress: "192.168.1.13",
      macAddress: "00:1A:2B:3C:4D:03",
    },
    {
      id: 4,
      assetTag: "LAP-004",
      serialNumber: "SN127",
      category: "Laptop",
      subcategory: "Design",
      manufacturer: "Apple",
      model: "MacBook Pro",
      device: "Apple MacBook Pro",
      isActive: true,
      description: "Design team laptop",
      vendor: "Apple Store",
      purchaseOrderId: "PO-1003",
      purchaseDate: "2024-03-01",
      purchaseCost: "150000",
      currentValue: "140000",
      warrantyExpiry: "2027-03-01",
      amcExpiry: "2026-03-01",
      os: "macOS",
      osVersion: "Sonoma",
      processor: "Apple M2",
      ram: "16GB",
      storageSize: "1TB",
      hostname: "MAC-01",
      ipAddress: "192.168.1.14",
      macAddress: "00:1A:2B:3C:4D:04",
    },
    {
      id: 5,
      assetTag: "TAB-001",
      serialNumber: "SN128",
      category: "Tablet",
      subcategory: "Portable",
      manufacturer: "Samsung",
      model: "Galaxy Tab",
      device: "Samsung Galaxy Tab",
      isActive: true,
      description: "Portable tablet device",
      vendor: "Mobile Hub",
      purchaseOrderId: "PO-1004",
      purchaseDate: "2023-12-20",
      purchaseCost: "30000",
      currentValue: "25000",
      warrantyExpiry: "2026-12-20",
      amcExpiry: "2025-12-20",
      os: "Android",
      osVersion: "Android 13",
      processor: "Snapdragon",
      ram: "8GB",
      storageSize: "256GB",
      hostname: "TAB-01",
      ipAddress: "192.168.1.15",
      macAddress: "00:1A:2B:3C:4D:05",
    },
    {
      id: 6,
      assetTag: "LAP-005",
      serialNumber: "SN129",
      category: "Laptop",
      subcategory: "Office",
      manufacturer: "Acer",
      model: "Aspire",
      device: "Acer Aspire",
      isActive: true,
      description: "Entry-level office laptop",
      vendor: "Global Tech",
      purchaseOrderId: "PO-1005",
      purchaseDate: "2024-01-20",
      purchaseCost: "55000",
      currentValue: "50000",
      warrantyExpiry: "2027-01-20",
      amcExpiry: "2026-01-20",
      os: "Windows",
      osVersion: "Windows 11",
      processor: "Intel i3",
      ram: "8GB",
      storageSize: "512GB",
      hostname: "DESKTOP-04",
      ipAddress: "192.168.1.16",
      macAddress: "00:1A:2B:3C:4D:06",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedAssetForQR, setSelectedAssetForQR] = useState<Asset | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(assets.length / itemsPerPage);

  const paginatedAddAsset = assets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
      toast.success("Asset updated successfully");
    } else {
      // CREATE
      setAssets((prev) => [...prev, { ...data, id: Date.now() }]);
      toast.success("Asset created successfully");
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    //Delete Api
    toast.success("Asset deleted successfully");
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDownloadQrCode = (item: Asset) => {
    setSelectedAssetForQR(item);
    setQrModalOpen(true);
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6 space-y-6">
        {/* ROW 1 → HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Assets</h1>

          <button
            onClick={handleCreate}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition w-full sm:w-auto"
          >
            + Add Asset
          </button>
        </div>

        {/* ROW 2 → CONTROL BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* LEFT → SEARCH */}
          <div className="w-full lg:max-w-xs">
            <input
              placeholder="Search assets..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* MIDDLE → FILTERS */}
          <div className="flex flex-wrap items-center gap-2">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
              <option>All Category</option>
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Tablet</option>
            </select>

            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
              <option>All Vendors</option>
              <option>XYZ Pvt Ltd</option>
              <option>ABC Pvt Ltd</option>
              <option>TechSource Ltd</option>
            </select>
          </div>

          {/* RIGHT → ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => router.push("/assets/asset-bulk-upload")}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Bulk Upload
            </button>

            <button
              onClick={() => console.log("pdf")}
              className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Export PDF
            </button>

            <button
              onClick={() => console.log("excel")}
              className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-4 ">Asset Tag</th>
              <th className="text-left px-6 py-4 ">Device</th>
              <th className="text-left px-6 py-4 ">Assigned To-</th>
              <th className="text-left px-6 py-4 ">Status</th>
              <th className="text-left px-6 py-4 ">Cost</th>
              <th className="text-left px-6 py-4 ">Warranty</th>
              <th className="text-right px-6 py-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAddAsset?.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Asset Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Asset yet.
                      </p>

                      <button
                        onClick={handleCreate}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Add Location
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedAddAsset.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {item.assetTag}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {item.device}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {item.serialNumber}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {item.purchaseCost}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {item.warrantyExpiry}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button
                        onClick={() => handleDownloadQrCode(item)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 leading-none"
                      >
                        <MdQrCode2 size={19} />
                      </button>
                      <span className="h-4 w-px bg-gray-300"></span>
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 leading-none"
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      <span className="h-4 w-px bg-gray-300"></span>
                      <button
                        onClick={() => handleDelete(item?.id)}
                        className="flex items-center justify-center text-red-800 hover:bg-red-50 p-1 rounded-md"
                        title="Delete"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <AddAssetModal
        initialData={selectedAsset}
        isOpen={open && !selectedAsset}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
      <UpdateAssetModal
        isOpen={open && !!selectedAsset}
        onClose={() => setOpen(false)}
        initialData={selectedAsset}
        onSubmit={handleSubmit}
      />
      <QRModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        asset={selectedAssetForQR}
      />
      <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
