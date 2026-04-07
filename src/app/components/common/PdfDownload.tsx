// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { FileText, ChevronDown, Download } from "lucide-react";
// import { toast } from "react-toastify";

// type HeaderConfig = string | { label: string; key: string };

// type PdfDownloadProps = {
//   data: any[];
//   fileName: string;
//   headers: HeaderConfig[];
// };

// type RowLimitOption = {
//   label: string;
//   value: number | "all";
// };

// const rowLimitOptions: RowLimitOption[] = [
//   { label: "First 10 rows", value: 10 },
//   { label: "First 25 rows", value: 25 },
//   { label: "First 50 rows", value: 50 },
//   { label: "First 100 rows", value: 100 },
//   { label: "Export All", value: "all" },
// ];

// const formatValue = (value: any): string => {
//   if (value === null || value === undefined) return "";
//   if (typeof value === "boolean") return value ? "Active" : "Inactive";
//   if (value instanceof Date) return value.toLocaleDateString();
//   return String(value);
// };

// function PdfDownload({ data, fileName, headers }: PdfDownloadProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isExporting, setIsExporting] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const exportToPdf = async (rowLimit: number | "all") => {
//     if (!data || data.length === 0) {
//       toast.error("No data available to export");
//       return;
//     }

//     setIsExporting(true);
//     setIsOpen(false);

//     try {
//       const pdfMake = (await import("pdfmake/build/pdfmake")).default;
//       const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;
//       pdfMake.vfs = pdfFonts.vfs;

//       const limitedData = rowLimit === "all" ? data : data.slice(0, rowLimit);
//       const headerLabels = headers.map((h) =>
//         typeof h === "string" ? h : h.label,
//       );

//       // Header row
//       const tableBody: any[][] = [
//         headerLabels.map((label) => ({
//           text: label,
//           bold: true,
//           color: "#ffffff",
//           fillColor: "#18181b",
//           fontSize: 8,
//           margin: [4, 4, 4, 4],
//         })),
//       ];

//       // Data rows
//       if (headers.length > 0 && typeof headers[0] === "object") {
//         const headerConfigs = headers as { label: string; key: string }[];
//         limitedData.forEach((item, index) => {
//           tableBody.push(
//             headerConfigs.map((header) => ({
//               text: formatValue(item[header.key]),
//               fillColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
//               fontSize: 8,
//               margin: [4, 3, 4, 3],
//               color: "#374151",
//             })),
//           );
//         });
//       } else {
//         const headerStrings = headers as string[];
//         limitedData.forEach((item, index) => {
//           tableBody.push(
//             headerStrings.map((header) => ({
//               text: formatValue(item[header]),
//               fillColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
//               fontSize: 8,
//               margin: [4, 3, 4, 3],
//               color: "#374151",
//             })),
//           );
//         });
//       }

//       const docDefinition: any = {
//         pageOrientation: headerLabels.length > 5 ? "landscape" : "portrait",
//         pageMargins: [24, 24, 24, 24],
//         content: [
//           // Header Section
//           {
//             columns: [
//               {
//                 stack: [
//                   {
//                     text: fileName.toUpperCase(),
//                     fontSize: 18,
//                     bold: true,
//                     color: "#18181b",
//                   },
//                   {
//                     text: `Generated on ${new Date().toLocaleDateString(
//                       "en-US",
//                       {
//                         weekday: "long",
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       },
//                     )}`,
//                     fontSize: 8,
//                     color: "#6b7280",
//                     margin: [0, 4, 0, 0],
//                   },
//                 ],
//               },
//               {
//                 stack: [
//                   {
//                     text: `${limitedData.length} Records`,
//                     fontSize: 20,
//                     bold: true,
//                     color: "#18181b",
//                     alignment: "right",
//                   },
//                   {
//                     text:
//                       rowLimit !== "all"
//                         ? `of ${data.length} total`
//                         : "All records",
//                     fontSize: 8,
//                     color: "#6b7280",
//                     alignment: "right",
//                     margin: [0, 4, 0, 0],
//                   },
//                 ],
//               },
//             ],
//             margin: [0, 0, 0, 16],
//           },
//           // Divider
//           {
//             canvas: [
//               {
//                 type: "line",
//                 x1: 0,
//                 y1: 0,
//                 x2: headerLabels.length > 5 ? 769 : 547,
//                 y2: 0,
//                 lineWidth: 1,
//                 lineColor: "#e5e7eb",
//               },
//             ],
//             margin: [0, 0, 0, 16],
//           },
//           // Table
//           {
//             table: {
//               headerRows: 1,
//               widths: headerLabels.map(() => "*"),
//               body: tableBody,
//             },
//             layout: {
//               hLineWidth: (i: number) => (i === 0 || i === 1 ? 0 : 0.5),
//               vLineWidth: () => 0,
//               hLineColor: () => "#f3f4f6",
//               paddingLeft: () => 4,
//               paddingRight: () => 4,
//               paddingTop: () => 3,
//               paddingBottom: () => 3,
//             },
//           },
//         ],
//         // Footer
//         footer: (currentPage: number, pageCount: number) => ({
//           columns: [
//             {
//               text: `${fileName} • Confidential`,
//               fontSize: 7,
//               color: "#9ca3af",
//               margin: [24, 8, 0, 0],
//             },
//             {
//               text: `Page ${currentPage} of ${pageCount}`,
//               fontSize: 7,
//               color: "#9ca3af",
//               alignment: "right",
//               margin: [0, 8, 24, 0],
//             },
//           ],
//         }),
//         defaultStyle: {
//           fontSize: 8,
//           color: "#374151",
//         },
//       };

//       pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
//       toast.success(`${limitedData.length} records exported to PDF`);
//     } catch (error) {
//       console.error("PDF export error:", error);
//       toast.error("Failed to export PDF");
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   if (!isMounted) return null;

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Trigger Button */}
//       <button
//         onClick={() => {
//           if (!data || data.length === 0) {
//             toast.error("No data available to export");
//             return;
//           }
//           setIsOpen((prev) => !prev);
//         }}
//         disabled={isExporting}
//         className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
//       >
//         <FileText size={14} />
//         {isExporting ? "Exporting..." : "Export PDF"}
//         <ChevronDown
//           size={13}
//           className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
//           {/* Dropdown Header */}
//           <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Select Rows to Export
//             </p>
//             <p className="text-xs text-gray-400 mt-0.5">
//               {data.length} records available
//             </p>
//           </div>

//           {/* Options */}
//           <div className="py-1">
//             {rowLimitOptions.map((option) => {
//               const isDisabled =
//                 option.value !== "all" &&
//                 typeof option.value === "number" &&
//                 option.value > data.length;

//               const actualCount =
//                 option.value === "all"
//                   ? data.length
//                   : Math.min(option.value as number, data.length);

//               return (
//                 <button
//                   key={option.value}
//                   onClick={() => !isDisabled && exportToPdf(option.value)}
//                   disabled={isDisabled}
//                   className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition
//                     ${
//                       isDisabled
//                         ? "opacity-40 cursor-not-allowed"
//                         : "hover:bg-gray-50 cursor-pointer"
//                     }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <Download size={13} className="text-gray-400" />
//                     <span className="text-sm text-gray-700 font-medium">
//                       {option.label}
//                     </span>
//                   </div>
//                   <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">
//                     {actualCount}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Dropdown Footer */}
//           <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
//             <p className="text-xs text-gray-400">
//               Downloads as{" "}
//               <span className="font-semibold text-gray-500">.pdf</span> file
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PdfDownload;
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FileText, ChevronDown, Download } from "lucide-react";
import { toast } from "react-toastify";

type HeaderConfig = string | { label: string; key: string };

type PdfDownloadProps = {
  data: any[];
  fileName: string;
  headers: HeaderConfig[];
  companyName?: string; // Add company name prop
};

type RowLimitOption = {
  label: string;
  value: number | "all";
};

const rowLimitOptions: RowLimitOption[] = [
  { label: "First 10 rows", value: 10 },
  { label: "First 25 rows", value: 25 },
  { label: "First 50 rows", value: 50 },
  { label: "First 100 rows", value: 100 },
  { label: "Export All", value: "all" },
];

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
  companyName = "Vserv InfoSystem PVT",
}: PdfDownloadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportToPdf = async (rowLimit: number | "all") => {
    if (!data || data.length === 0) {
      toast.error("No data available to export");
      return;
    }

    setIsExporting(true);
    setIsOpen(false);

    try {
      const pdfMake = (await import("pdfmake/build/pdfmake")).default;
      const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;
      pdfMake.vfs = pdfFonts.vfs;

      const limitedData = rowLimit === "all" ? data : data.slice(0, rowLimit);
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
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => {
          if (!data || data.length === 0) {
            toast.error("No data available to export");
            return;
          }
          setIsOpen((prev) => !prev);
        }}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FileText size={14} />
        {isExporting ? "Exporting..." : "Export PDF"}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Dropdown Header */}
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-600">
              {data.length} records available
            </p>
          </div>

          {/* Options */}
          <div className="py-1">
            {rowLimitOptions.map((option) => {
              const isDisabled =
                option.value !== "all" &&
                typeof option.value === "number" &&
                option.value > data.length;

              const actualCount =
                option.value === "all"
                  ? data.length
                  : Math.min(option.value as number, data.length);

              return (
                <button
                  key={option.value}
                  onClick={() => !isDisabled && exportToPdf(option.value)}
                  disabled={isDisabled}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm transition
                    ${
                      isDisabled
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-gray-50 cursor-pointer text-gray-700"
                    }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {actualCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfDownload;