"use client";

import { useRef } from "react";
import QRCode from "react-qr-code";
import { X, Download, Printer, Monitor, Tag, Hash, Layers } from "lucide-react";
import { toast } from "react-toastify";

export default function QRModal({
  isOpen,
  onClose,
  asset,
}: {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
}) {
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !asset) return null;

  // Encode key asset details as structured text so any QR scanner shows
  // the info directly — no login or browser needed.
  const qrValue = [
    `ASSET TAG : ${asset.assetTag}`,
    `DEVICE    : ${asset.device || asset.model || "—"}`,
    `SERIAL NO : ${asset.serialNumber}`,
    `CATEGORY  : ${asset.category?.name || "—"}${asset.subCategory?.name ? " / " + asset.subCategory.name : ""}`,
    `MFR / MDL : ${asset.manufacturer || "—"} ${asset.model || ""}`.trim(),
    `STATUS    : ${asset.isActive ? "Active" : "Inactive"}`,
    asset.warrantyExpiry ? `WARRANTY  : ${asset.warrantyExpiry}` : "",
    asset.ipAddress ? `IP ADDRESS: ${asset.ipAddress}` : "",
    asset.hostname ? `HOSTNAME  : ${asset.hostname}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // Download PNG
  const downloadPNG = async () => {
    try {
      const svg = qrRef.current?.querySelector("svg");
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new window.Image();
      img.onload = () => {
        const CARD_W = 500;
        const CARD_H = 660;
        const canvas = document.createElement("canvas");
        canvas.width = CARD_W;
        canvas.height = CARD_H;
        const ctx = canvas.getContext("2d")!;

        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, CARD_W, CARD_H);

        // Top accent bar
        ctx.fillStyle = "#4f46e5";
        ctx.fillRect(0, 0, CARD_W, 6);

        // Header area
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 6, CARD_W, 80);

        // Company / app name
        ctx.fillStyle = "#4f46e5";
        ctx.font = "bold 15px system-ui";
        ctx.textAlign = "center";
        ctx.fillText("Asset Management", CARD_W / 2, 38);

        // Sub-header
        ctx.fillStyle = "#6b7280";
        ctx.font = "12px system-ui";
        ctx.fillText("Asset Identification Card", CARD_W / 2, 60);

        // Divider
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(30, 86);
        ctx.lineTo(CARD_W - 30, 86);
        ctx.stroke();

        // Asset tag (big)
        ctx.fillStyle = "#111827";
        ctx.font = "bold 26px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(asset.assetTag, CARD_W / 2, 130);

        // Device name
        ctx.fillStyle = "#6b7280";
        ctx.font = "13px system-ui";
        ctx.fillText(asset.device || asset.model || "—", CARD_W / 2, 155);

        // QR code image (centered)
        const QR_SIZE = 220;
        const qrX = (CARD_W - QR_SIZE) / 2;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0,0,0,0.08)";
        ctx.shadowBlur = 16;
        ctx.fillRect(qrX - 12, 172, QR_SIZE + 24, QR_SIZE + 24);
        ctx.shadowBlur = 0;
        ctx.drawImage(img, qrX, 184, QR_SIZE, QR_SIZE);

        // Scan instruction
        ctx.fillStyle = "#9ca3af";
        ctx.font = "11px system-ui";
        ctx.textAlign = "center";
        ctx.fillText("Scan to get asset details instantly", CARD_W / 2, 432);

        // Info rows
        const rows = [
          ["Serial No.", asset.serialNumber],
          ["Category", asset.category?.name || "—"],
          ["Manufacturer", asset.manufacturer || "—"],
          ["Status", asset.isActive ? "Active" : "Inactive"],
        ];

        const rowStartY = 460;
        const rowH = 34;
        rows.forEach(([label, value], i) => {
          const y = rowStartY + i * rowH;
          // Row bg alternating
          ctx.fillStyle = i % 2 === 0 ? "#f9fafb" : "#ffffff";
          ctx.fillRect(30, y, CARD_W - 60, rowH);

          ctx.fillStyle = "#6b7280";
          ctx.font = "11px system-ui";
          ctx.textAlign = "left";
          ctx.fillText(label, 44, y + 21);

          ctx.fillStyle = value === "Active" ? "#16a34a" : value === "Inactive" ? "#6b7280" : "#111827";
          ctx.font = value === "Active" || value === "Inactive" ? "bold 11px system-ui" : "11px system-ui";
          ctx.textAlign = "right";
          ctx.fillText(value, CARD_W - 44, y + 21);
        });

        // Bottom border
        ctx.fillStyle = "#4f46e5";
        ctx.fillRect(0, CARD_H - 4, CARD_W, 4);

        URL.revokeObjectURL(svgUrl);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${asset.assetTag}-qr.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success("QR card downloaded");
        }, "image/png");
      };

      img.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        toast.error("Failed to generate QR image");
      };

      img.src = svgUrl;
    } catch {
      toast.error("Download failed");
    }
  };

  // Print 
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=420,height=600");
    if (!printWindow) return;

    const svg = qrRef.current?.querySelector("svg");
    const svgHtml = svg ? svg.outerHTML : "";

    const html = `<!DOCTYPE html>
<html>
  <head>
    <title>QR — ${asset.assetTag}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: system-ui, sans-serif; background: #fff; }
      .card { width: 320px; margin: 20px auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
      .accent { height: 5px; background: #4f46e5; }
      .header { background: #f8fafc; padding: 14px 20px 12px; text-align: center; border-bottom: 1px solid #e5e7eb; }
      .app { font-size: 13px; font-weight: 700; color: #4f46e5; }
      .sub { font-size: 10px; color: #9ca3af; margin-top: 2px; }
      .body { padding: 16px 20px; text-align: center; }
      .tag { font-size: 22px; font-weight: 800; color: #111827; letter-spacing: 1px; }
      .device { font-size: 11px; color: #6b7280; margin-top: 3px; }
      .qr-wrap { display: inline-block; padding: 10px; border: 1px solid #e5e7eb; border-radius: 10px; margin: 14px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
      .scan-hint { font-size: 10px; color: #9ca3af; margin-bottom: 14px; }
      table { width: 100%; border-collapse: collapse; font-size: 11px; }
      tr:nth-child(even) { background: #f9fafb; }
      td { padding: 6px 10px; }
      td:last-child { text-align: right; font-weight: 600; color: #111827; }
      td:first-child { color: #6b7280; }
      .active { color: #16a34a; }
      .inactive { color: #6b7280; }
      .bottom { height: 4px; background: #4f46e5; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="accent"></div>
      <div class="header">
        <div class="app">Asset Management</div>
        <div class="sub">Asset Identification Card</div>
      </div>
      <div class="body">
        <div class="tag">${asset.assetTag}</div>
        <div class="device">${asset.device || asset.model || ""}</div>
        <div class="qr-wrap">${svgHtml}</div>
        <div class="scan-hint">Scan QR to get asset details instantly</div>
        <table>
          <tr><td>Serial No.</td><td>${asset.serialNumber}</td></tr>
          <tr><td>Category</td><td>${asset.category?.name || "—"}</td></tr>
          <tr><td>Manufacturer</td><td>${asset.manufacturer || "—"}</td></tr>
          <tr><td>Status</td><td class="${asset.isActive ? "active" : "inactive"}">${asset.isActive ? "Active" : "Inactive"}</td></tr>
        </table>
      </div>
      <div class="bottom"></div>
    </div>
    <script>window.onload = function() { window.print(); window.close(); }<\/script>
  </body>
</html>`;

    printWindow.document.documentElement.innerHTML = html;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

        {/* Indigo top accent */}
        <div className="h-1.5 bg-indigo-600" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-indigo-50 border-b border-indigo-100">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Asset QR Code</h2>
            <p className="text-xs text-gray-500 mt-0.5">Scan or download to share</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-indigo-100 transition text-gray-500 hover:text-gray-800"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4">

          {/* QR card */}
          <div className="flex flex-col items-center bg-linear-to-b from-gray-50 to-white rounded-xl border border-gray-100 py-5 px-4 shadow-inner">
            {/* Asset tag */}
            <span className="text-xl font-extrabold text-gray-900 tracking-widest mb-1">
              {asset.assetTag}
            </span>
            <span className="text-xs text-gray-400 mb-4">
              {asset.device || asset.model || "Asset"}
            </span>

            {/* QR code */}
            <div
              ref={qrRef}
              className="p-3 bg-white rounded-xl shadow-md border border-gray-100"
            >
              <QRCode
                value={qrValue}
                size={160}
                fgColor="#1e1b4b"
                bgColor="#ffffff"
              />
            </div>

            <p className="mt-3 text-[11px] text-gray-400 text-center">
              Scan to get asset details instantly
            </p>
          </div>

          {/* Asset info */}
          <div className="rounded-xl border border-gray-100 overflow-hidden text-xs">
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Asset Details
              </span>
            </div>

            {[
              {
                icon: <Tag size={12} className="text-indigo-400" />,
                label: "Serial No.",
                value: asset.serialNumber,
              },
              {
                icon: <Layers size={12} className="text-indigo-400" />,
                label: "Category",
                value: asset.category?.name || "—",
              },
              {
                icon: <Monitor size={12} className="text-indigo-400" />,
                label: "Manufacturer",
                value: asset.manufacturer || "—",
              },
              {
                icon: <Hash size={12} className="text-indigo-400" />,
                label: "Model",
                value: asset.model || "—",
              },
            ].map(({ icon, label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between px-3 py-2.5 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                }`}
              >
                <div className="flex items-center gap-1.5 text-gray-500">
                  {icon}
                  <span>{label}</span>
                </div>
                <span className="font-medium text-gray-800 text-right max-w-[55%] truncate">
                  {value}
                </span>
              </div>
            ))}

            {/* Status row */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-white border-t border-gray-100">
              <span className="text-gray-500">Status</span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  asset.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    asset.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                {asset.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={downloadPNG}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-sm"
            >
              <Download size={14} />
              Download PNG
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition"
            >
              <Printer size={14} />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
