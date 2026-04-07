"use client";

import React, { useState } from "react";
import ExcelDownload from "./ExcelDownload";
import BulkUploadModal from "./BulkUploadModal";
import PdfDownload from "./PdfDownload";

// Support both string[] and object[] formats
type HeaderConfig = string | { label: string; key: string };

type Props = {
  data: any[];
  fileName: string;
  headers: HeaderConfig[];
  onUpload: (data: any[]) => void;
};

const ExcelActions = ({ data, fileName, headers, onUpload }: Props) => {
  const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <ExcelDownload data={data} fileName={fileName} headers={headers} />
        <PdfDownload data={data} fileName={fileName} headers={headers} />

        <button
          onClick={() => setOpenBulkUploadModal(true)}
          className="px-3 py-2 text-xs font-bold border rounded-md cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Bulk Upload
        </button>
      </div>

      <BulkUploadModal
        isOpen={openBulkUploadModal}
        onClose={() => setOpenBulkUploadModal(false)}
        headers={headers}
        fileName={fileName}
        onUpload={onUpload}
      />
    </>
  );
};

export default ExcelActions;
