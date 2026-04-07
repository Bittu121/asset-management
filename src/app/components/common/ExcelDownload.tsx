"use client";

import React, { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

// Support both string[] and object[] formats
type HeaderConfig = string | { label: string; key: string };

// Props type
type ExcelDownloadProps = {
  data: any[];
  fileName: string;
  headers: HeaderConfig[];
};

//Export data TO Excel
const exportToExcel = (
  data: any[],
  fileName: string,
  headers?: HeaderConfig[],
) => {
  if (!data || data.length === 0) {
    toast.error("No data available to export");
    return;
  }

  try {
    let exportData = data;

    // If headers with keys are provided, map the data
    if (headers && headers.length > 0 && typeof headers[0] === "object") {
      const headerConfigs = headers as { label: string; key: string }[];
      exportData = data.map((item) => {
        const mappedItem: any = {};
        headerConfigs.forEach((header) => {
          mappedItem[header.label] = item[header.key] ?? "";
        });
        return mappedItem;
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    toast.success(`Excel file exported successfully: ${fileName}.xlsx`);
  } catch (error) {
    toast.error("Failed to export Excel file");
  }
};

function ExcelDownload({ data, fileName, headers }: any) {
  const handleExport = () => {
    exportToExcel(data, fileName, headers);
  };
  return (
    <>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 active:bg-green-800 transition"
      >
        <FileSpreadsheet size={18} />
        Export Excel
      </button>
    </>
  );
}

export default ExcelDownload;
