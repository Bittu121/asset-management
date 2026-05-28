"use client";

import React from "react";
import { Download } from "lucide-react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

// Support both string[] and object[] formats
type HeaderConfig = string | { label: string; key: string };

type DownloadTemplateProps = {
  headers: HeaderConfig[];
  fileName: string;
};

//Download template
const downloadTemplate = (headers: HeaderConfig[], fileName: string) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Extract header labels
    const headerLabels = headers.map((h) => (typeof h === "string" ? h : h.label));

    // Add headers manually
    XLSX.utils.sheet_add_aoa(worksheet, [headerLabels]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    XLSX.writeFile(workbook, `${fileName}_template.xlsx`);
    toast.success(`Template downloaded successfully: ${fileName}_template.xlsx`);
  } catch (error) {
    toast.error("Failed to download template");
  }
};

function DownloadTemplate({ headers, fileName }: DownloadTemplateProps) {
  const handleDownloadTemplate = () => {
    downloadTemplate(headers, fileName);
  };
  return (
    <>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Step 1: Download Template</h3>
            <p className="text-xs text-blue-700">
              Download the Excel template and fill in your data
            </p>
          </div>
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Download size={16} />
            Download Template
          </button>
        </div>
      </div>
    </>
  );
}

export default DownloadTemplate;
