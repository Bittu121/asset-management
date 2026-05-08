"use client";

import { useEffect, useState } from "react";
import AllocateAssetModal from "./AllocateAssetModal";
import ReturnAssetModal from "./ReturnAssetModal";
import DragDropArea from "./DragDropArea";
import ActiveAllocations from "./ActiveAllocations";
import OverdueAllocations from "./OverdueAllocations";
import ReturnHistory from "./ReturnHistory";

type User = {
  id: number;
  name: string;
  email: string;
  employeeCode: string;
};

type Asset = {
  id: number;
  assetTag: string;
  assetName: string;
  status: "AVAILABLE" | "ALLOCATED";
};

type Allocation = {
  id: number;
  assetId: number;
  assetTag: string;
  assetName: string;
  allocatedToId: number;
  allocatedTo: string;
  allocationDate: string;
  expectedReturn: string;
  status: "ACTIVE" | "OVERDUE" | "RETURNED";
};

type Audit = {
  id: number;
  type: "assign" | "return";
  assetTag: string;
  assetName: string;
  userName: string;
  date: string;
  message: string;
};

const STORAGE_KEY = "assetAllocations";

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    employeeCode: "EMP001",
  },
  {
    id: 2,
    name: "Danish Naseem",
    email: "danish.n@company.com",
    employeeCode: "EMP002",
  },
  {
    id: 3,
    name: "Zeeshan Ahmed",
    email: "zeeshan.a@company.com",
    employeeCode: "EMP003",
  },
  {
    id: 4,
    name: "Bittu Kumar",
    email: "bittu.k@company.com",
    employeeCode: "EMP004",
  },
  {
    id: 5,
    name: "Zayed Saifi",
    email: "zayed.s@company.com",
    employeeCode: "EMP005",
  },
];

const initialAssets: Asset[] = [
  {
    id: 1,
    assetTag: "TABLET-2025-001",
    assetName: "iPad Pro 12.9",
    status: "AVAILABLE",
  },
  {
    id: 2,
    assetTag: "SWITCH-2025-001",
    assetName: "Cisco Catalyst 9300",
    status: "AVAILABLE",
  },
  {
    id: 3,
    assetTag: "UPS-2025-001",
    assetName: "APC Smart-UPS",
    status: "AVAILABLE",
  },
  {
    id: 4,
    assetTag: "PROJECTOR-2025-001",
    assetName: "Epson Projector",
    status: "AVAILABLE",
  },
  {
    id: 5,
    assetTag: "CAMERA-2025-001",
    assetName: "Sony Alpha",
    status: "AVAILABLE",
  },
];

const initialAllocations: Allocation[] = [
  {
    id: 1,
    assetId: 2,
    assetTag: "SWITCH-2025-001",
    assetName: "Cisco Catalyst 9300",
    allocatedToId: 1,
    allocatedTo: "John Doe",
    allocationDate: "2026-02-06",
    expectedReturn: "2026-02-28",
    status: "ACTIVE",
  },
  {
    id: 2,
    assetId: 3,
    assetTag: "UPS-2025-001",
    assetName: "APC Smart-UPS",
    allocatedToId: 2,
    allocatedTo: "Danish Naseem",
    allocationDate: "2026-02-06",
    expectedReturn: "2026-02-26",
    status: "ACTIVE",
  },
  {
    id: 3,
    assetId: 4,
    assetTag: "PROJECTOR-2025-001",
    assetName: "Epson Projector",
    allocatedToId: 3,
    allocatedTo: "Zeeshan Ahmed",
    allocationDate: "2026-02-04",
    expectedReturn: "2026-02-10",
    status: "OVERDUE",
  },
];

function Page() {
  const [activeTab, setActiveTab] = useState<
    "active" | "overdue" | "dragdrop" | "return"
  >("active");
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] =
    useState<Allocation | null>(null);
  const [draggingAssetId, setDraggingAssetId] = useState<number | null>(null);

  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [allocations, setAllocations] =
    useState<Allocation[]>(initialAllocations);
  const [auditTrail, setAuditTrail] = useState<Audit[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Allocation[];
      setAllocations(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allocations));
    setAssets((prev) =>
      prev.map((asset) =>
        allocations.some(
          (a) => a.assetId === asset.id && a.status !== "RETURNED",
        )
          ? { ...asset, status: "ALLOCATED" }
          : { ...asset, status: "AVAILABLE" },
      ),
    );
  }, [allocations]);

  const addAudit = (entry: Audit) => setAuditTrail((prev) => [entry, ...prev]);

  const handleAssign = (assetId: number, userId: number) => {
    const asset = assets.find((a) => a.id === assetId);
    const user = initialUsers.find((u) => u.id === userId);
    if (!asset || !user) return;
    if (
      allocations.some((a) => a.assetId === assetId && a.status !== "RETURNED")
    )
      return;

    const allocationDate = new Date().toISOString().split("T")[0];
    const expectedReturn = new Date(
      new Date().setDate(new Date().getDate() + 30),
    )
      .toISOString()
      .split("T")[0];

    const allocation: Allocation = {
      id: Date.now(),
      assetId: asset.id,
      assetTag: asset.assetTag,
      assetName: asset.assetName,
      allocatedToId: user.id,
      allocatedTo: user.name,
      allocationDate,
      expectedReturn,
      status: "ACTIVE",
    };

    setAllocations((prev) => [allocation, ...prev]);
    addAudit({
      id: Date.now(),
      type: "assign",
      assetTag: asset.assetTag,
      assetName: asset.assetName,
      userName: user.name,
      date: allocationDate,
      message: `${asset.assetTag} assigned to ${user.name}`,
    });
  };

  const handleReturn = () => {
    if (!selectedAllocation) return;

    const returnDate = new Date().toISOString().split("T")[0];

    setAllocations((prev) =>
      prev.map((item) =>
        item.id === selectedAllocation.id
          ? { ...item, status: "RETURNED" }
          : item,
      ),
    );

    addAudit({
      id: Date.now(),
      type: "return",
      assetTag: selectedAllocation.assetTag,
      assetName: selectedAllocation.assetName,
      userName: selectedAllocation.allocatedTo,
      date: returnDate,
      message: `${selectedAllocation.assetTag} returned by ${selectedAllocation.allocatedTo}`,
    });

    setReturnOpen(false);
    setSelectedAllocation(null);
  };

  const handleReturnClick = (allocation: Allocation) => {
    setSelectedAllocation(allocation);
    setReturnOpen(true);
  };

  const totalAssigned = allocations.filter(
    (a) => a.status !== "RETURNED",
  ).length;

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <h1 className="text-xl font-semibold text-gray-900">
          Asset Allocation
        </h1>
        <button
          onClick={() => setAllocateOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Allocate Asset
        </button>
      </div>

      <div className="mb-6">
        <div className="inline-flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === "active"
                ? "bg-white text-blue-600 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setActiveTab("overdue")}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === "overdue"
                ? "bg-white text-blue-600 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overdue
          </button>

          <button
            onClick={() => setActiveTab("dragdrop")}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === "dragdrop"
                ? "bg-white text-blue-600 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Drag & Drop
          </button>

          <button
            onClick={() => setActiveTab("return")}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === "return"
                ? "bg-white text-blue-600 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Return History
          </button>
        </div>
      </div>

      <div className="mb-4 text-xs text-gray-600">
        Total assigned assets: {totalAssigned}
      </div>

      {activeTab === "dragdrop" ? (
        <DragDropArea
          assets={assets}
          users={initialUsers}
          allocations={allocations}
          draggingAssetId={draggingAssetId}
          setDraggingAssetId={setDraggingAssetId}
          onAssign={handleAssign}
        />
      ) : activeTab === "return" ? (
        <ReturnHistory auditTrail={auditTrail} />
      ) : activeTab === "active" ? (
        <ActiveAllocations
          allocations={allocations}
          onReturn={handleReturnClick}
        />
      ) : (
        <OverdueAllocations
          allocations={allocations}
          onReturn={handleReturnClick}
        />
      )}

      <AllocateAssetModal
        isOpen={allocateOpen}
        onClose={() => setAllocateOpen(false)}
        assets={assets}
        users={initialUsers}
        onSubmit={(payload) => {
          handleAssign(payload.assetId, payload.userId);
          setAllocateOpen(false);
        }}
      />

      <ReturnAssetModal
        isOpen={returnOpen}
        onClose={() => setReturnOpen(false)}
        onSubmit={handleReturn}
        assetName={selectedAllocation?.assetTag || ""}
      />
    </div>
  );
}

export default Page;
