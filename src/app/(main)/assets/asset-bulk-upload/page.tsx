"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleDownloadTemplate = () => {
    const data = [
      {
        "Asset Tag*": "LAPTOP-001",
        "Serial Number*": "SN123456789",
        Category: "Hardware",
        Subcategory: "Laptop",
        Manufacturer: "Dell",
        "Model Name": "Latitude 5520",
        Status: "ACTIVE",
        "Assigned To (Email)": "john.doe@company.com",
        Location: "New York Office",
        "Purchase Date": "2024-01-15",
        "Warranty Expiry": "2027-01-15",
        Cost: "1200",
        Vendor: "Tech Solutions Ltd",
        Notes: "Additional notes here",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "asset_template.xlsx");
  };

  // VALIDATION
  const validateFiles = (selectedFiles: File[]) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    return selectedFiles.filter((file) => {
      if (!validTypes.includes(file.type)) {
        alert("Only Excel allowed");
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File must be under 5MB");
        return false;
      }
      return true;
    });
  };

  // FILE CHANGE
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    const valid = validateFiles(selected);
    setFiles(valid);
  };

  // DRAG DROP
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files);
    const valid = validateFiles(dropped);
    setFiles(valid);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-5">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Bulk Asset Upload
          </h1>

          <div className="flex gap-2 border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white">
            <button
              onClick={() => router.push("/assets/asset")}
              className="px-4 py-1.5 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Assets
            </button>
            <button
              onClick={() => router.push("/assets/asset-allocation")}
              className="px-4 py-1.5 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Allocations
            </button>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl">
          {/* TOP */}
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                Upload Excel File
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Import multiple assets at once
              </p>
            </div>

            <button
              onClick={handleDownloadTemplate}
              className="px-4 py-2 text-sm rounded-lg border border-indigo-500 text-indigo-600 hover:bg-indigo-50"
            >
              ↓ Download Template
            </button>
          </div>

          {/* BODY */}
          <div className="p-6">
            {/* UPLOAD BOX */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-xl p-10 text-center cursor-pointer transition
              ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
              }`}
            >
              {/* ICONS */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="group flex flex-col items-center text-gray-600 cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm transition group-hover:shadow-md group-hover:scale-105">
                    {/* Realistic Excel File Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="none"
                    >
                      {/* sheet */}
                      <path
                        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                        fill="#E8F5E9"
                      />

                      {/* folded corner */}
                      <path d="M15 2v5h5" fill="#C8E6C9" />

                      {/* excel green panel */}
                      <rect
                        x="4"
                        y="8"
                        width="8"
                        height="10"
                        rx="1"
                        fill="#1F6F43"
                      />

                      {/* X letter */}
                      <text
                        x="8"
                        y="15"
                        textAnchor="middle"
                        fontSize="6"
                        fill="white"
                        fontWeight="bold"
                      >
                        X
                      </text>
                    </svg>
                  </div>

                  <span className="text-xs mt-1 font-medium group-hover:text-green-700">
                    Excel (.xlsx)
                  </span>
                </div>
              </div>

              {/* TEXT */}
              <p className="text-sm text-gray-700">
                <span className="text-indigo-600 font-medium underline">
                  Upload Excels
                </span>{" "}
                or drag and drop
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* OR */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">Import from URL</p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add file URL"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-4 py-2 text-sm border rounded-lg bg-gray-100 hover:bg-gray-200">
                  Upload
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                You will be notified once the import is successful.
              </p>
            </div>

            {/* FILE LIST */}
            {files.length > 0 && (
              <div className="mt-4 text-sm text-gray-700 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() =>
                        setFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setShowHelp(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-100"
              >
                <span className="relative flex items-center justify-center w-6 h-6">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600">
                    ❓
                  </span>
                </span>
                Help Center
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/assets/asset")}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  disabled={files.length === 0}
                  className={`px-5 py-2 text-sm rounded-lg text-white
                  ${
                    files.length > 0
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showHelp && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Excel Upload Guide
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Follow the structure below to successfully import assets
                </p>
              </div>

              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-8">
              {/* SECTION 1 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  File Requirements
                </h3>

                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• File format must be .xlsx</li>
                  <li>• Maximum file size: 5MB</li>
                  <li>• Do not modify column headers</li>
                  <li>• Required fields must not be empty</li>
                  <li>• Date format: YYYY-MM-DD</li>
                </ul>
              </div>

              {/* SECTION 2 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Column Structure
                </h3>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="text-left px-4 py-2 font-medium">
                          Field
                        </th>
                        <th className="text-left px-4 py-2 font-medium">
                          Required
                        </th>
                        <th className="text-left px-4 py-2 font-medium">
                          Example
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {[
                        ["Asset Tag", "Yes", "LAPTOP-001"],
                        ["Serial Number", "Yes", "SN123456"],
                        ["Category", "Yes", "Hardware"],
                        ["Subcategory", "No", "Laptop"],
                        ["Manufacturer", "No", "Dell"],
                        ["Model Name", "No", "Latitude 5520"],
                        ["Status", "Yes", "ACTIVE"],
                        ["Assigned To (Email)", "No", "user@email.com"],
                        ["Location", "No", "Mumbai Office"],
                        ["Purchase Date", "No", "2024-01-15"],
                        ["Warranty Expiry", "No", "2027-01-15"],
                        ["Cost", "No", "50000"],
                        ["Vendor", "No", "ABC Pvt Ltd"],
                      ].map((row, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-4 py-2">{row[0]}</td>
                          <td className="px-4 py-2 text-gray-500">{row[1]}</td>
                          <td className="px-4 py-2 text-gray-400">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 3 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Sample Record
                </h3>

                <div className="border border-gray-200 rounded-lg bg-gray-50 p-3 text-xs font-mono text-gray-700 overflow-x-auto">
                  LAPTOP-001 | SN123456 | Hardware | Laptop | Dell | Latitude
                  5520 | ACTIVE | john@email.com | Mumbai | 2024-01-15 |
                  2027-01-15 | 50000 | ABC Pvt Ltd
                </div>
              </div>

              {/* SECTION 4 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Best Practices
                </h3>

                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use the provided template for accuracy</li>
                  <li>• Avoid duplicate asset tags</li>
                  <li>• Validate email format before upload</li>
                  <li>• Keep consistent naming conventions</li>
                </ul>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
              <button
                onClick={() => setShowHelp(false)}
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
