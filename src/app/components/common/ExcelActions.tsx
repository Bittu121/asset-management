// // "use client";

// // import React, { useState } from "react";
// // import { FileSpreadsheet } from "lucide-react";
// // import { toast } from "react-toastify";
// // import * as XLSX from "xlsx";

// // //Export data TO Excel
// // export const exportToExcel = (data: any[], fileName: string) => {
// //   if (!data || data.length === 0) {
// //     alert("No data available to export");
// //     return;
// //   }
// //   const worksheet = XLSX.utils.json_to_sheet(data);
// //   const workbook = XLSX.utils.book_new();
// //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
// //   XLSX.writeFile(workbook, `${fileName}.xlsx`);
// // };

// // //Read excel file(upload)
// // export const readExcelFile = (file: File): Promise<any[]> => {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();

// //     reader.readAsArrayBuffer(file);

// //     reader.onload = (e: any) => {
// //       const data = new Uint8Array(e.target.result);
// //       const workbook = XLSX.read(data, { type: "array" });

// //       const sheetName = workbook.SheetNames[0];
// //       const sheet = workbook.Sheets[sheetName];

// //       const jsonData = XLSX.utils.sheet_to_json(sheet);

// //       resolve(jsonData);
// //     };

// //     reader.onerror = (error) => reject(error);
// //   });
// // };

// // //Download template
// // export const downloadTemplate = (headers: string[], fileName: string) => {
// //   const worksheet = XLSX.utils.json_to_sheet([]);

// //   // Add headers manually
// //   XLSX.utils.sheet_add_aoa(worksheet, [headers]);

// //   const workbook = XLSX.utils.book_new();
// //   XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

// //   XLSX.writeFile(workbook, `${fileName}_template.xlsx`);
// // };

// // type Props = {
// //   data: any[];
// //   fileName: string;
// //   headers: string[];
// //   onUpload: (data: any[]) => void;
// // };

// // const ExcelActions = ({ data, fileName, headers, onUpload }: Props) => {
// //   const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);

// //   const handleExport = () => {
// //     exportToExcel(data, fileName);
// //   };

// //   const handleTemplate = () => {
// //     downloadTemplate(headers, fileName);
// //   };

// //   const handleUpload = async (e: any) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     try {
// //       const result = await readExcelFile(file);
// //       onUpload(result);
// //     } catch (err) {
// //       alert("Error reading file");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center gap-2">
// //       <button
// //         onClick={handleExport}
// //         className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
// //       >
// //         <FileSpreadsheet size={16} />
// //         Export Excel
// //       </button>
// //       <button
// //         onClick={handleTemplate}
// //         className="px-3 py-2 text-xs font-bold border rounded-md"
// //       >
// //         Download Template
// //       </button>

// //       <label className="px-3 py-2 text-xs font-bold border rounded-md cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50">
// //         Bulk Upload
// //         <input
// //           type="file"
// //           hidden
// //           accept=".xlsx, .xls"
// //           onChange={handleUpload}
// //         />
// //       </label>
// //     </div>
// //   );
// // };

// // export default ExcelActions;
// "use client";

// import React, { useState } from "react";
// import { FileSpreadsheet, X, Upload, Download } from "lucide-react";
// import { toast } from "react-toastify";
// import * as XLSX from "xlsx";

// //Export data TO Excel
// const exportToExcel = (data: any[], fileName: string) => {
//   if (!data || data.length === 0) {
//     toast.error("No data available to export");
//     return;
//   }

//   try {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, `${fileName}.xlsx`);
//     toast.success(`Excel file exported successfully: ${fileName}.xlsx`);
//   } catch (error) {
//     toast.error("Failed to export Excel file");
//   }
// };

// //Read excel file(upload)
// const readExcelFile = (file: File): Promise<any[]> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.readAsArrayBuffer(file);

//     reader.onload = (e: any) => {
//       try {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });

//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         const jsonData = XLSX.utils.sheet_to_json(sheet);

//         resolve(jsonData);
//       } catch (error) {
//         reject(error);
//       }
//     };

//     reader.onerror = (error) => reject(error);
//   });
// };

// //Download template
// const downloadTemplate = (headers: string[], fileName: string) => {
//   try {
//     const worksheet = XLSX.utils.json_to_sheet([]);

//     // Add headers manually
//     XLSX.utils.sheet_add_aoa(worksheet, [headers]);

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

//     XLSX.writeFile(workbook, `${fileName}_template.xlsx`);
//     toast.success(
//       `Template downloaded successfully: ${fileName}_template.xlsx`,
//     );
//   } catch (error) {
//     toast.error("Failed to download template");
//   }
// };

// type Props = {
//   data: any[];
//   fileName: string;
//   headers: string[];
//   onUpload: (data: any[]) => void;
// };

// const ExcelActions = ({ data, fileName, headers, onUpload }: Props) => {
//   const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewData, setPreviewData] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleExport = () => {
//     exportToExcel(data, fileName);
//   };

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setSelectedFile(file);
//     setIsLoading(true);

//     try {
//       const result = await readExcelFile(file);

//       if (result.length === 0) {
//         toast.warning("The uploaded file is empty");
//         setPreviewData([]);
//         return;
//       }

//       // Show preview of first 5 rows
//       setPreviewData(result.slice(0, 5));
//       toast.success(`File loaded: ${result.length} rows found`);
//     } catch (err) {
//       toast.error("Error reading Excel file");
//       console.error("Excel read error:", err);
//       setSelectedFile(null);
//       setPreviewData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUploadConfirm = async () => {
//     if (!selectedFile) {
//       toast.error("Please select a file first");
//       return;
//     }

//     setIsLoading(true);
//     const loadingToast = toast.loading("Uploading data...");

//     try {
//       const result = await readExcelFile(selectedFile);
//       onUpload(result);
//       toast.dismiss(loadingToast);

//       // Reset and close
//       setSelectedFile(null);
//       setPreviewData([]);
//       setOpenBulkUploadModal(false);
//     } catch (err) {
//       toast.dismiss(loadingToast);
//       toast.error("Failed to upload data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDownloadTemplate = () => {
//     downloadTemplate(headers, fileName);
//   };

//   const handleCloseModal = () => {
//     setSelectedFile(null);
//     setPreviewData([]);
//     setOpenBulkUploadModal(false);
//   };

//   return (
//     <>
//       <div className="flex items-center gap-2">
//         <button
//           onClick={handleExport}
//           className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
//         >
//           <FileSpreadsheet size={16} />
//           Export Excel
//         </button>

//         <button
//           onClick={() => setOpenBulkUploadModal(true)}
//           className="px-3 py-2 text-xs font-bold border rounded-md cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50"
//         >
//           Bulk Upload
//         </button>
//       </div>

//       {/* Bulk Upload Modal */}
//       {openBulkUploadModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b">
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Bulk Upload Asset Categories
//               </h2>
//               <button
//                 onClick={handleCloseModal}
//                 className="p-1 hover:bg-gray-100 rounded-md transition"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
//               {/* Download Template Section */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h3 className="text-sm font-semibold text-blue-900 mb-1">
//                       Step 1: Download Template
//                     </h3>
//                     <p className="text-xs text-blue-700">
//                       Download the Excel template and fill in your asset
//                       category data
//                     </p>
//                   </div>
//                   <button
//                     onClick={handleDownloadTemplate}
//                     className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                   >
//                     <Download size={16} />
//                     Download Template
//                   </button>
//                 </div>
//               </div>

//               {/* Upload Section */}
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
//                 <div className="text-center">
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <h3 className="mt-2 text-sm font-semibold text-gray-900">
//                     Step 2: Upload Excel File
//                   </h3>
//                   <p className="mt-1 text-xs text-gray-500">
//                     Select the filled Excel file to upload
//                   </p>

//                   <div className="mt-4">
//                     <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-800 cursor-pointer transition">
//                       <FileSpreadsheet size={16} />
//                       {selectedFile ? "Change File" : "Select File"}
//                       <input
//                         type="file"
//                         hidden
//                         accept=".xlsx, .xls"
//                         onChange={handleFileSelect}
//                         disabled={isLoading}
//                       />
//                     </label>
//                   </div>

//                   {selectedFile && (
//                     <div className="mt-3 text-sm text-gray-600">
//                       Selected:{" "}
//                       <span className="font-semibold">{selectedFile.name}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Preview Section */}
//               {previewData.length > 0 && (
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <div className="bg-gray-50 px-4 py-2 border-b">
//                     <h3 className="text-sm font-semibold text-gray-900">
//                       Preview (First 5 rows)
//                     </h3>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           {Object.keys(previewData[0])
//                             .filter((key) => key !== "__rowNum__")
//                             .map((key) => (
//                               <th
//                                 key={key}
//                                 className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase"
//                               >
//                                 {key}
//                               </th>
//                             ))}
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {previewData.map((row, idx) => (
//                           <tr key={idx} className="hover:bg-gray-50">
//                             {Object.entries(row)
//                               .filter(([key]) => key !== "__rowNum__")
//                               .map(([key, value], i) => (
//                                 <td
//                                   key={i}
//                                   className="px-4 py-2 text-xs text-gray-900"
//                                 >
//                                   {String(value)}
//                                 </td>
//                               ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
//               <button
//                 onClick={handleCloseModal}
//                 className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUploadConfirm}
//                 disabled={!selectedFile || isLoading}
//                 className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//               >
//                 {isLoading ? "Uploading..." : "Upload Data"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ExcelActions;

"use client";

import React, { useState } from "react";
import { FileSpreadsheet, X, Upload, Download } from "lucide-react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

// Support both string[] and object[] formats
type HeaderConfig = string | { label: string; key: string };

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

//Read excel file(upload)
const readExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

//Download template
const downloadTemplate = (headers: HeaderConfig[], fileName: string) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Extract header labels
    const headerLabels = headers.map((h) =>
      typeof h === "string" ? h : h.label,
    );

    // Add headers manually
    XLSX.utils.sheet_add_aoa(worksheet, [headerLabels]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    XLSX.writeFile(workbook, `${fileName}_template.xlsx`);
    toast.success(
      `Template downloaded successfully: ${fileName}_template.xlsx`,
    );
  } catch (error) {
    toast.error("Failed to download template");
  }
};

type Props = {
  data: any[];
  fileName: string;
  headers: HeaderConfig[];
  onUpload: (data: any[]) => void;
};

const ExcelActions = ({ data, fileName, headers, onUpload }: Props) => {
  const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = () => {
    exportToExcel(data, fileName, headers);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsLoading(true);

    try {
      const result = await readExcelFile(file);
      if (result.length === 0) {
        toast.warning("The uploaded file is empty");
        setPreviewData([]);
        return;
      }

      // Show preview of first 5 rows
      setPreviewData(result.slice(0, 5));
      toast.success(`File loaded: ${result.length} rows found`);
    } catch (err) {
      toast.error("Error reading Excel file");
      console.error("Excel read error:", err);
      setSelectedFile(null);
      setPreviewData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadConfirm = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    setIsLoading(true);
    const loadingToast = toast.loading("Uploading data...");

    try {
      const result = await readExcelFile(selectedFile);

      // Map the uploaded data back to the original keys if headers with keys are provided
      let mappedResult = result;
      if (headers.length > 0 && typeof headers[0] === "object") {
        const headerConfigs = headers as { label: string; key: string }[];
        mappedResult = result.map((row) => {
          const mappedRow: any = {};
          headerConfigs.forEach((header) => {
            if (row[header.label] !== undefined) {
              mappedRow[header.key] = row[header.label];
            }
          });
          return mappedRow;
        });
      }

      onUpload(mappedResult);
      toast.dismiss(loadingToast);
      toast.success("Data uploaded successfully!");

      // Reset and close
      setSelectedFile(null);
      setPreviewData([]);
      setOpenBulkUploadModal(false);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to upload data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    downloadTemplate(headers, fileName);
  };

  const handleCloseModal = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setOpenBulkUploadModal(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <FileSpreadsheet size={16} />
          Export Excel
        </button>

        <button
          onClick={() => setOpenBulkUploadModal(true)}
          className="px-3 py-2 text-xs font-bold border rounded-md cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Bulk Upload
        </button>
      </div>

      {/* Bulk Upload Modal */}
      {openBulkUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Bulk Upload
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 rounded-md transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Download Template Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                      Step 1: Download Template
                    </h3>
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

              {/* Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    Step 2: Upload Excel File
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Select the filled Excel file to upload
                  </p>

                  <div className="mt-4">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-800 cursor-pointer transition">
                      <FileSpreadsheet size={16} />
                      {selectedFile ? "Change File" : "Select File"}
                      <input
                        type="file"
                        hidden
                        accept=".xlsx, .xls"
                        onChange={handleFileSelect}
                        disabled={isLoading}
                      />
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="mt-3 text-sm text-gray-600">
                      Selected:{" "}
                      <span className="font-semibold">{selectedFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Section */}
              {previewData.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Preview (First 5 rows)
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(previewData[0])
                            .filter((key) => key !== "__rowNum__")
                            .map((key) => (
                              <th
                                key={key}
                                className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase"
                              >
                                {key}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {previewData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            {Object.entries(row)
                              .filter(([key]) => key !== "__rowNum__")
                              .map(([key, value], i) => (
                                <td
                                  key={i}
                                  className="px-4 py-2 text-xs text-gray-900"
                                >
                                  {String(value)}
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleUploadConfirm}
                disabled={!selectedFile || isLoading}
                className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {isLoading ? "Uploading..." : "Upload Data"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExcelActions;
