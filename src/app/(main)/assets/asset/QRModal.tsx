// import { X } from "lucide-react";
// import QRCode from "react-qr-code";
// // @ts-ignore
// import jsPDF from "jspdf/dist/jspdf.umd.min.js";
// import html2canvas from "html2canvas";

// export default function QRModal({ isOpen, onClose, asset }: { isOpen: boolean; onClose: () => void; asset: any }) {
//   if (!isOpen || !asset) return null;

//   const downloadPDF = async () => {
//     const qrElement = document.getElementById("qr-code");
//     if (!qrElement) return;

//     const canvas = await html2canvas(qrElement);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF();
//     pdf.setFontSize(16);
//     pdf.text("Asset Details", 20, 20);

//     pdf.setFontSize(12);
//     pdf.text(`Asset Tag: ${asset.assetTag}`, 20, 30);
//     pdf.text(`Device: ${asset.device}`, 20, 40);
//     pdf.text(`Serial Number: ${asset.serialNumber}`, 20, 50);
//     pdf.text(`Category: ${asset.category}`, 20, 60);
//     pdf.text(`Subcategory: ${asset.subcategory}`, 20, 70);
//     pdf.text(`Manufacturer: ${asset.manufacturer}`, 20, 80);
//     pdf.text(`Model: ${asset.model}`, 20, 90);
//     pdf.text(`Status: ${asset.isActive ? "Active" : "Inactive"}`, 20, 100);
//     pdf.text(`Vendor: ${asset.vendor}`, 20, 110);
//     pdf.text(`Purchase Cost: ${asset.purchaseCost}`, 20, 120);
//     pdf.text(`Warranty Expiry: ${asset.warrantyExpiry}`, 20, 130);
//     pdf.text(`OS: ${asset.os}`, 20, 140);
//     pdf.text(`RAM: ${asset.ram}`, 20, 150);
//     pdf.text(`Storage Size: ${asset.storageSize}`, 20, 160);
//     pdf.text(`Hostname: ${asset.hostname}`, 20, 170);
//     pdf.text(`IP Address: ${asset.ipAddress}`, 20, 180);
//     pdf.text(`MAC Address: ${asset.macAddress}`, 20, 190);

//     pdf.addImage(imgData, "PNG", 20, 200, 50, 50);

//     pdf.save(`${asset.assetTag}-details.pdf`);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-md rounded-xl shadow-lg">
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold">Asset QR Code</h2>
//           <button onClick={onClose}>
//             <X className="w-5 h-5 text-gray-500 hover:text-black" />
//           </button>
//         </div>
//         <div className="p-6 text-center">
//           <div id="qr-code" className="inline-block p-4 bg-white border rounded-lg">
//             <QRCode value={JSON.stringify(asset)} size={128} />
//           </div>
//           <p className="mt-4 text-sm text-gray-600">Scan QR code to view asset details</p>
//           <button
//             onClick={downloadPDF}
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { X } from "lucide-react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
// @ts-ignore
import jsPDF from "jspdf/dist/jspdf.umd.min.js";
import html2canvas from "html2canvas";

export default function QRModal({
  isOpen,
  onClose,
  asset,
}: {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
}) {
  if (!isOpen || !asset) return null;

  const downloadPDF = async () => {
    try {
      const qrElement = document.getElementById("qr-code");
      if (!qrElement) return;

      const canvas = await html2canvas(qrElement);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.setFontSize(14);
      pdf.text("Asset QR", 20, 20);

      pdf.addImage(imgData, "PNG", 20, 30, 60, 60);

      pdf.save(`${asset.assetTag}-qr.pdf`);
      toast.success("QR downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download QR");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-xs rounded-lg border border-gray-200 shadow-lg">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-medium text-gray-800">Asset QR Code</h2>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 flex flex-col items-center">
          <div className="bg-white p-3 rounded-md shadow-md border border-gray-100">
            <div id="qr-code">
              <QRCode value={`${window.location.origin}/asset/${asset._id}`} size={110} />
            </div>
          </div>

          <p className="mt-3 text-[11px] text-gray-500">Asset Tag -  {asset.assetTag}</p>

          <button
            onClick={downloadPDF}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-md transition"
          >
            Download Asset QR
          </button>
        </div>
      </div>
    </div>
  );
}
