"use client";

import { useEffect, useMemo, useState } from "react";
import AllocateAssetModal from "./AllocateAssetModal";
import ReturnAssetModal from "./ReturnAssetModal";
import DragDropArea from "./DragDropArea";

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

  const getComputedStatus = (item: Allocation) => {
    if (item.status === "RETURNED") return "RETURNED";
    const expected = new Date(item.expectedReturn);
    const today = new Date();
    if (!isNaN(expected.getTime()) && expected < today) return "OVERDUE";
    return item.status;
  };

  const filteredAllocations = useMemo(
    () =>
      allocations.filter((item) => {
        const status = getComputedStatus(item);
        if (activeTab === "active") return status === "ACTIVE";
        if (activeTab === "overdue") return status === "OVERDUE";
        if (activeTab === "return") return status === "RETURNED";
        return true;
      }),
    [allocations, activeTab],
  );

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

      <div className="flex gap-4 border-b mb-4 text-sm">
        <button
          onClick={() => setActiveTab("active")}
          className={`pb-2 ${activeTab === "active" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("overdue")}
          className={`pb-2 ${activeTab === "overdue" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Overdue
        </button>
        <button
          onClick={() => setActiveTab("dragdrop")}
          className={`pb-2 ${activeTab === "dragdrop" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Drag & Drop
        </button>
        <button
          onClick={() => setActiveTab("return")}
          className={`pb-2 ${activeTab === "return" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Return History
        </button>
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
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-sm font-semibold mb-3">Return Audit Trail</h2>
          {auditTrail.filter((entry) => entry.type === "return").length ===
          0 ? (
            <p className="text-xs text-gray-500">No returns logged yet.</p>
          ) : (
            <ul className="space-y-2">
              {auditTrail
                .filter((entry) => entry.type === "return")
                .map((entry) => (
                  <li key={entry.id} className="border p-3 rounded-lg">
                    <div className="text-sm font-medium">
                      {entry.assetTag} returned
                    </div>
                    <div className="text-xs text-gray-500">
                      {entry.date}: {entry.message}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="min-w-225 w-full">
            <thead>
              <tr className="text-xs text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-4 text-left">Asset Tag</th>
                <th className="px-6 py-4 text-left">Asset Name</th>
                <th className="px-6 py-4 text-left">Allocated To</th>
                <th className="px-6 py-4 text-left">Allocation Date</th>
                <th className="px-6 py-4 text-left">Expected Return</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAllocations.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No allocations in this tab.
                  </td>
                </tr>
              ) : (
                filteredAllocations.map((item) => {
                  const status = getComputedStatus(item);
                  return (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{item.assetTag}</td>
                      <td className="px-6 py-4">{item.assetName}</td>
                      <td className="px-6 py-4">{item.allocatedTo}</td>
                      <td className="px-6 py-4">{item.allocationDate}</td>
                      <td className="px-6 py-4">{item.expectedReturn}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            status === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : status === "OVERDUE"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {status !== "RETURNED" && (
                          <button
                            onClick={() => {
                              setSelectedAllocation(item);
                              setReturnOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Return
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
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

export default Page