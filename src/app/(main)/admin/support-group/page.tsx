"use client";
import React, { useState } from "react";
import AddSupportGroup from "./AddSupportGroup";
import UpdateSupportGroup from "./UpdateSupportGroup";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

const levels = [
  "L1 - First Line Support",
  "L2 - Second Line Support",
  "L3 - Third Line Support",
];

const managers = [
  "Admin",
  "Danish Naseem",
  "Zeeshan Ahmed",
  "Bittu Kumar",
  "Zayed Saifi",
];

type SupportGroup = {
  id: number;
  name: string;
  code: string;
  level: string;
  manager: string;
  maxTickets: number;
  description: string;
  services: string;
  isActive: boolean;
  createdAt: string;
};

function SupportGroup() {
  const [supportGroup, setSupportGroup] = useState<SupportGroup[]>([
    {
      id: 1,
      name: "Application Support",
      code: "APP01",
      level: "L2",
      manager: "Admin",
      maxTickets: 12,
      description: "Enterprise application support",
      services: "None",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
    {
      id: 2,
      name: "Backup Operations",
      code: "BACKUP01",
      level: "L2",
      manager: "Admin",
      maxTickets: 8,
      description: "Backup and restore operations",
      services: "None",
      isActive: true,
      createdAt: new Date().toDateString(),
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedSupportGroup, setSelectedSupportGroup] =
    useState<SupportGroup | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(supportGroup.length / itemsPerPage);

  const paginatedSupportGroup = supportGroup.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddSupportGroup = (
    data: Omit<SupportGroup, "id" | "createdAt">,
  ) => {
    const newGroup: SupportGroup = {
      ...data,
      id: supportGroup.length + 1,
      createdAt: new Date().toDateString(),
    };

    setSupportGroup((prev) => [newGroup, ...prev]);
    toast.success("Support group added successfully");
  };

  const handleEdit = (supportGroups: SupportGroup) => {
    setSelectedSupportGroup(supportGroups);
    setIsUpdateOpen(true);
  };

  const handleUpdateSupportGroup = (updatedData: any) => {
    setSupportGroup((prev) =>
      prev.map((g) =>
        g.id === selectedSupportGroup?.id ? { ...g, ...updatedData } : g,
      ),
    );
    toast.success("Support group updated successfully");
  };

  const handleDelete = (id: number) => {
    setSupportGroup((prev) => prev.filter((g) => g.id !== id));
    toast.success("Support group deleted successfully");
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">Support Group</h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            + Support Group
          </button>
        </div>
        {/* Row 2: Search + Filter (LEFT ALIGNED) */}
        <div className="flex items-center gap-4">
          <input
            placeholder="Search..."
            className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Filter */}
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Support Group</option>
            <option>Assigned</option>
            <option>Unassigned</option>
          </select>
          <button
            onClick={() => console.log("Bulk Upload Clicked")}
            className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Bulk Upload
          </button>
        </div>
      </div>
      {/* Table */}

      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1300px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Group Name</th>
              <th className="px-6 py-4 text-left">Code</th>
              <th className="px-6 py-4 text-left">Level</th>
              <th className="px-6 py-4 text-left">Manager</th>
              <th className="px-6 py-4 text-left">Services</th>
              <th className="px-6 py-4 text-left">Max Tickets</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedSupportGroup?.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No Support Group Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any Support Group yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + Add Support Group
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedSupportGroup?.map((group) => (
                <tr
                  key={group.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {group.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {group.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {group.code}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {group.level}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {group.manager}{" "}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {group.services || "None"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {group.maxTickets}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          group.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {group.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(group)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>

                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(group.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <AddSupportGroup
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddSupportGroup}
        levels={levels}
        managers={managers}
      />
      <UpdateSupportGroup
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSupportGroup={selectedSupportGroup}
        onUpdate={handleUpdateSupportGroup}
        levels={levels}
        managers={managers}
      />
      <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default SupportGroup;
