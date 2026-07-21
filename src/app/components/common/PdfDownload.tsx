"use client";

import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { toast } from "react-toastify";

type HeaderConfig = string | { label: string; key: string };

type PdfDownloadProps = {
  data: any[];
  fileName: string;
  headers: HeaderConfig[];
  companyName?: string; // Add company name prop
};

const formatValue = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Active" : "Inactive";
  if (value instanceof Date) return value.toLocaleDateString();
  return String(value);
};

function PdfDownload({
  data,
  fileName,
  headers,
  companyName = "Asset Management System",
}: PdfDownloadProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const exportToPdf = async () => {
    if (!data || data.length === 0) {
      toast.error("No data available to export");
      return;
    }

    setIsExporting(true);

    try {
      const pdfMake = (await import("pdfmake/build/pdfmake")).default as any;
      const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default as any;
      pdfMake.vfs = pdfFonts.vfs;

      const limitedData = data;
      const headerLabels = headers.map((h) =>
        typeof h === "string" ? h : h.label,
      );

      // Header row
      const tableBody: any[][] = [
        headerLabels.map((label) => ({
          text: label,
          bold: true,
          color: "#ffffff",
          fillColor: "#18181b",
          fontSize: 9,
          margin: [5, 5, 5, 5],
        })),
      ];

      // Data rows
      if (headers.length > 0 && typeof headers[0] === "object") {
        const headerConfigs = headers as { label: string; key: string }[];
        limitedData.forEach((item, index) => {
          tableBody.push(
            headerConfigs.map((header) => ({
              text: formatValue(item[header.key]),
              fillColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
              fontSize: 8,
              margin: [5, 4, 5, 4],
              color: "#374151",
            })),
          );
        });
      } else {
        const headerStrings = headers as string[];
        limitedData.forEach((item, index) => {
          tableBody.push(
            headerStrings.map((header) => ({
              text: formatValue(item[header]),
              fillColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
              fontSize: 8,
              margin: [5, 4, 5, 4],
              color: "#374151",
            })),
          );
        });
      }

      const docDefinition: any = {
        pageOrientation: headerLabels.length > 5 ? "landscape" : "portrait",
        pageMargins: [30, 30, 30, 30],
        content: [
          // Company Name (Top)
          {
            text: companyName.toUpperCase(),
            fontSize: 16,
            bold: true,
            color: "#18181b",
            alignment: "center",
            margin: [0, 0, 0, 20],
          },
          // Table
          {
            table: {
              headerRows: 1,
              widths: headerLabels.map(() => "*"),
              body: tableBody,
            },
            layout: {
              hLineWidth: (i: number) => (i === 0 || i === 1 ? 0 : 0.5),
              vLineWidth: () => 0,
              hLineColor: () => "#e5e7eb",
              paddingLeft: () => 5,
              paddingRight: () => 5,
              paddingTop: () => 4,
              paddingBottom: () => 4,
            },
          },
        ],
        // Footer
        footer: (currentPage: number, pageCount: number) => ({
          columns: [
            {
              text: `Generated on ${new Date().toLocaleDateString()}`,
              fontSize: 8,
              color: "#9ca3af",
              margin: [30, 10, 0, 0],
            },
            {
              text: `Page ${currentPage} of ${pageCount}`,
              fontSize: 8,
              color: "#9ca3af",
              alignment: "right",
              margin: [0, 10, 30, 0],
            },
          ],
        }),
        defaultStyle: {
          fontSize: 9,
          color: "#374151",
        },
      };

      pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
      toast.success(`${limitedData.length} records exported to PDF`);
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={exportToPdf}
      disabled={isExporting}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      <FileText size={14} />
      {isExporting ? "Exporting..." : "Export PDF"}
    </button>
  );
}

export default PdfDownload;
