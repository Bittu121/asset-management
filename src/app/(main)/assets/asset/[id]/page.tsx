// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function AssetDetailsPage() {
//   const { id } = useParams();
//   const [asset, setAsset] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchAsset = async () => {
//       try {
//         const res = await fetch(`/api/assets/${id}`);
//         const data = await res.json();
//         setAsset(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAsset();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         Loading asset...
//       </div>
//     );
//   }

//   if (!asset) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         Asset not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
//         <h1 className="text-xl font-semibold text-gray-800 mb-4">
//           Asset Details
//         </h1>

//         <div className="space-y-2 text-sm text-gray-600">
//           <p>
//             <strong>Asset Tag:</strong> {asset.assetTag}
//           </p>
//           <p>
//             <strong>Device:</strong> {asset.device}
//           </p>
//           <p>
//             <strong>Serial Number:</strong> {asset.serialNumber}
//           </p>
//           <p>
//             <strong>Category:</strong> {asset.category}
//           </p>
//           <p>
//             <strong>Status:</strong> {asset.isActive ? "Active" : "Inactive"}
//           </p>
//           <p>
//             <strong>Manufacturer:</strong> {asset.manufacturer}
//           </p>
//           <p>
//             <strong>Model:</strong> {asset.model}
//           </p>
//           <p>
//             <strong>Vendor:</strong> {asset.vendor}
//           </p>
//           <p>
//             <strong>IP:</strong> {asset.ipAddress}
//           </p>
//           <p>
//             <strong>MAC:</strong> {asset.macAddress}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const mockAssets = [
  {
    _id: "1",
    assetTag: "LAP-001",
    device: "Laptop",
    serialNumber: "SN12345",
    category: "IT",
    subcategory: "Laptop",
    manufacturer: "Dell",
    model: "Latitude 5400",
    isActive: true,
    vendor: "ABC Vendor",
    ipAddress: "192.168.1.10",
    macAddress: "00:1A:2B:3C:4D:5E",
  },
  {
    _id: "2",
    assetTag: "LAP-002",
    device: "Laptop",
    serialNumber: "SN67890",
    category: "IT",
    subcategory: "Laptop",
    manufacturer: "HP",
    model: "EliteBook",
    isActive: true,
    vendor: "XYZ Vendor",
    ipAddress: "192.168.1.20",
    macAddress: "00:AA:BB:CC:DD:EE",
  },
];

export default function AssetDetailsPage() {
  const { id } = useParams();
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setTimeout(() => {
      const found = mockAssets.find((a) => a._id === id);
      setAsset(found || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading asset...
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Asset not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Asset Details
        </h1>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Asset Tag:</strong> {asset.assetTag}
          </p>
          <p>
            <strong>Device:</strong> {asset.device}
          </p>
          <p>
            <strong>Serial Number:</strong> {asset.serialNumber}
          </p>
          <p>
            <strong>Category:</strong> {asset.category}
          </p>
          <p>
            <strong>Status:</strong> {asset.isActive ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Manufacturer:</strong> {asset.manufacturer}
          </p>
          <p>
            <strong>Model:</strong> {asset.model}
          </p>
          <p>
            <strong>Vendor:</strong> {asset.vendor}
          </p>
          <p>
            <strong>IP:</strong> {asset.ipAddress}
          </p>
          <p>
            <strong>MAC:</strong> {asset.macAddress}
          </p>
        </div>
      </div>
    </div>
  );
}
