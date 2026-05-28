// "use client";
// import React, { useState } from "react";
// import AddSupportGroup from "./AddSupportGroup";
// import UpdateSupportGroup from "./UpdateSupportGroup";
// import Pagination from "../../../components/common/Pagination";
// import { Trash2 } from "lucide-react";
// import { toast } from "react-toastify";
// import { HiPencilSquare } from "react-icons/hi2";
// import ExcelActions from "@/app/components/common/ExcelActions";
// import { GoPlusCircle } from "react-icons/go";
// import { FiUser } from "react-icons/fi";

// const levels = [
//   "L1 - First Line Support",
//   "L2 - Second Line Support",
//   "L3 - Third Line Support",
// ];

// const managers = [
//   "Admin",
//   "Danish Naseem",
//   "Zeeshan Ahmed",
//   "Bittu Kumar",
//   "Zayed Saifi",
// ];

// type SupportGroup = {
//   id: number;
//   name: string;
//   code: string;
//   level: string;
//   manager: string;
//   maxTickets: number;
//   description: string;
//   services: string;
//   isActive: boolean;
//   createdAt: string;
// };

// function SupportGroup() {
//   const [supportGroup, setSupportGroup] = useState<SupportGroup[]>([
//     {
//       id: 1,
//       name: "Application Support",
//       code: "APP01",
//       level: "L2",
//       manager: "Admin",
//       maxTickets: 12,
//       description: "Enterprise application support",
//       services: "None",
//       isActive: true,
//       createdAt: new Date().toDateString(),
//     },
//     {
//       id: 2,
//       name: "Backup Operations",
//       code: "BACKUP01",
//       level: "L2",
//       manager: "Admin",
//       maxTickets: 8,
//       description: "Backup and restore operations",
//       services: "None",
//       isActive: true,
//       createdAt: new Date().toDateString(),
//     },
//   ]);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [isUpdateOpen, setIsUpdateOpen] = useState(false);
//   const [selectedSupportGroup, setSelectedSupportGroup] =
//     useState<SupportGroup | null>(null);

//   //pagination step-1
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   //filter step-1
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [supportGroupFilter, setSupportGroupFilter] = useState("");

//   //filter step-2
//   const filteredSupportGroup = supportGroup.filter((sup) => {
//     const matchesSearch =
//       search === "" ||
//       sup.name.toLowerCase().includes(search.toLowerCase()) ||
//       sup.code.toLowerCase().includes(search.toLowerCase()) ||
//       sup.description.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus =
//       statusFilter === "All" ||
//       (statusFilter === "Active" && sup.isActive) ||
//       (statusFilter === "Inactive" && !sup.isActive);
//     const matchesGroup =
//       supportGroupFilter === "" || sup.name === supportGroupFilter;
//     return matchesSearch && matchesStatus && matchesGroup;
//   });

//   //pagination step-2
//   const totalPages = Math.ceil(filteredSupportGroup.length / itemsPerPage);
//   const paginatedSupportGroup = filteredSupportGroup.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   //api call
//   const handleAddSupportGroup = (
//     data: Omit<SupportGroup, "id" | "createdAt">,
//   ) => {
//     const newGroup: SupportGroup = {
//       ...data,
//       id: supportGroup.length + 1,
//       createdAt: new Date().toDateString(),
//     };
//     setSupportGroup((prev) => [newGroup, ...prev]);
//     toast.success("Support group added successfully");
//   };

//   const handleEdit = (supportGroups: SupportGroup) => {
//     setSelectedSupportGroup(supportGroups);
//     setIsUpdateOpen(true);
//   };

//   //api call
//   const handleUpdateSupportGroup = (updatedData: any) => {
//     setSupportGroup((prev) =>
//       prev.map((g) =>
//         g.id === selectedSupportGroup?.id ? { ...g, ...updatedData } : g,
//       ),
//     );
//     toast.success("Support group updated successfully");
//   };

//   //api call
//   const handleDelete = (id: number) => {
//     setSupportGroup((prev) => prev.filter((g) => g.id !== id));
//     toast.success("Support group deleted successfully");
//   };

//   return (
//     <div className="p-4 bg-[#f8fafc] min-h-screen">
//       <div className="mb-4 space-y-3">
//         {/* TITLE */}
//         <div className="flex items-center justify-between">
//           <h1 className="text-lg font-semibold text-gray-900">Support Group</h1>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search..."
//               className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400
//               focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
//             />
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
//             >
//               <option value="All">All</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//             <select
//               value={supportGroupFilter}
//               onChange={(e) => setSupportGroupFilter(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
//             >
//               <option value="">Select Support Group</option>
//               {supportGroup.map((supgroup) => (
//                 <option key={supgroup.id} value={supgroup.name}>
//                   {supgroup.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-2">
//             <ExcelActions
//               data={filteredSupportGroup}
//               fileName="support-Group"
//               headers={[
//                 { label: "ID", key: "id" },
//                 { label: "Group Name", key: "name" },
//                 { label: "Code", key: "code" },
//                 { label: "Level", key: "level" },
//                 { label: "Manager", key: "manager" },
//                 { label: "Services", key: "services" },
//                 { label: "Max Tickets", key: "maxTickets" },
//                 { label: "Status", key: "isActive" },
//                 { label: "Created At", key: "createdAt" },
//               ]}
//               onUpload={(uploadedData: any[]) => {
//                 const formattedData: SupportGroup[] = uploadedData.map(
//                   (item, index) => ({
//                     id: Date.now() + index,
//                     name: item["Group Name"] || item.name || "",
//                     code: item.Code || item.code || "",
//                     level: item.Level || item.level || "",
//                     manager: item.Manager || item.manager || "",
//                     services: item.Services || item.services || "",
//                     maxTickets: Number(
//                       item["Max Tickets"] || item.maxTickets || 0,
//                     ),
//                     description: item.Description || item.description || "",
//                     isActive:
//                       item.Status === "Active" ||
//                       item.status === "Active" ||
//                       item.isActive === true,
//                     createdAt: new Date().toDateString(),
//                   }),
//                 );
//                 setSupportGroup((prev) => [...formattedData, ...prev]);
//                 toast.success("Support groups uploaded successfully");
//               }}
//             />

//             <button
//               onClick={() => setIsAddOpen(true)}
//               className="flex items-center gap-1 px-3 py-2 text-sm font-normal rounded-md bg-black text-white hover:bg-gray-900"
//             >
//               <GoPlusCircle size={18} />
//               Create
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Table */}

//       <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
//         <table className="min-w-[1300px] w-full">
//           <thead>
//             <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
//               <th className="px-6 py-4 text-left">ID</th>
//               <th className="px-6 py-4 text-left">Group Name</th>
//               <th className="px-6 py-4 text-left">Code</th>
//               <th className="px-6 py-4 text-left">Level</th>
//               <th className="px-6 py-4 text-left">Manager</th>
//               <th className="px-6 py-4 text-left">Services</th>
//               <th className="px-6 py-4 text-left">Max Tickets</th>
//               <th className="px-6 py-4 text-left">Status</th>
//               <th className="px-6 py-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {paginatedSupportGroup?.length === 0 ? (
//               <>
//                 <tr>
//                   <td colSpan={6} className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center justify-center gap-3">
//                       <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
//                         <FiUser size={18}/>
//                       </div>

//                       <h3 className="text-sm font-semibold text-gray-700">
//                         No Support Group Found
//                       </h3>

//                       <p className="text-xs text-gray-500">
//                         You haven’t added any Support Group yet.
//                       </p>

//                       <button
//                         onClick={() => setIsAddOpen(true)}
//                         className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
//                       >
//                         Add Support Group
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               </>
//             ) : (
//               paginatedSupportGroup?.map((group) => (
//                 <tr
//                   key={group.id}
//                   className="hover:bg-gray-50 transition-all duration-150"
//                 >
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {group.id}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {group.name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {group.code}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {group.level}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {group.manager}{" "}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {group.services || "None"}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {group.maxTickets}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full ${
//                           group.isActive
//                             ? "bg-green-100 text-green-600"
//                             : "bg-gray-100 text-gray-500"
//                         }`}
//                       >
//                         {group.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="flex justify-end items-center gap-3">
//                       <button
//                         onClick={() => handleEdit(group)}
//                         className="text-sm font-medium text-blue-600 hover:text-blue-700"
//                       >
//                         <HiPencilSquare size={19} />
//                       </button>

//                       <div className="w-px h-4 bg-gray-200"></div>
//                       <button
//                         onClick={() => handleDelete(group.id)}
//                         className="p-1.5 rounded-md hover:bg-red-50 text-red-800 transition"
//                         title="Delete"
//                       >
//                         <Trash2 size={19} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <AddSupportGroup
//         isOpen={isAddOpen}
//         onClose={() => setIsAddOpen(false)}
//         onAdd={handleAddSupportGroup}
//         levels={levels}
//         managers={managers}
//       />
//       <UpdateSupportGroup
//         isOpen={isUpdateOpen}
//         onClose={() => setIsUpdateOpen(false)}
//         selectedSupportGroup={selectedSupportGroup}
//         onUpdate={handleUpdateSupportGroup}
//         levels={levels}
//         managers={managers}
//       />
//       <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-4">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// }

// export default SupportGroup;

"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSupportGroup from "./AddSupportGroup";
import UpdateSupportGroup from "./UpdateSupportGroup";
import SupportGroupMembersModal from "./SupportGroupMembersModal";
import Pagination from "../../../components/common/Pagination";
import { Trash2, Users } from "lucide-react";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  createSupportGroupAction,
  deleteSupportGroupAction,
  fetchSupportGroups,
  updateSupportGroupAction,
} from "@/store/supportGroups/supportGroupsActions";
import { fetchUserAccounts } from "@/store/userAccounts/userAccountsActions";

const levels = ["L1 - First Line Support", "L2 - Second Line Support", "L3 - Third Line Support"];

function SupportGroup() {
  const dispatch = useDispatch<AppDispatch>();
  const { supportGroups, loading, createLoading, updateLoading, deleteLoading } = useSelector(
    (state: RootState) => state.supportGroups
  );
  const { users } = useSelector((state: RootState) => state.userAccounts);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [selectedSupportGroup, setSelectedSupportGroup] = useState<any>(null);
  const [selectedMembersGroup, setSelectedMembersGroup] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("");

  useEffect(() => {
    dispatch(fetchSupportGroups());
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  const managers = users.filter((u) => ["ADMIN", "MANAGER"].includes(u.role.name));

  const filteredSupportGroup = supportGroups.filter((sup) => {
    const matchesSearch =
      search === "" ||
      sup.name.toLowerCase().includes(search.toLowerCase()) ||
      sup.code.toLowerCase().includes(search.toLowerCase()) ||
      sup.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && sup.isActive) ||
      (statusFilter === "Inactive" && !sup.isActive);

    const matchesLevel = levelFilter === "" || sup.level === levelFilter;

    return matchesSearch && matchesStatus && matchesLevel;
  });

  const totalPages = Math.ceil(filteredSupportGroup.length / itemsPerPage);
  const paginatedSupportGroup = filteredSupportGroup.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddSupportGroup = (data: any) => {
    dispatch(createSupportGroupAction(data, () => setIsAddOpen(false)));
  };

  const handleEdit = (supportGroups: any) => {
    setSelectedSupportGroup(supportGroups);
    setIsUpdateOpen(true);
  };

  const handleManageMembers = (group: any) => {
    setSelectedMembersGroup(group);
    setIsMembersOpen(true);
  };

  const handleUpdateSupportGroup = (updatedData: any) => {
    if (selectedSupportGroup) {
      dispatch(
        updateSupportGroupAction(selectedSupportGroup._id, updatedData, () =>
          setIsUpdateOpen(false)
        )
      );
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this support group?")) {
      dispatch(deleteSupportGroupAction(id));
    }
  };

  const handleBulkUpload = (uploadedData: any[]) => {
    uploadedData.forEach((item) => {
      const managerId = users.find((u) => u.name === item.Manager)?._id;

      const groupData = {
        name: item["Group Name"] || item.name || "",
        code: item.Code || item.code || "",
        level: item.Level || item.level || "",
        manager: managerId || undefined,
        services: item.Services || item.services || "",
        maxTickets: Number(item["Max Tickets"] || item.maxTickets || 10),
        description: item.Description || item.description || "",
        isActive: item.Status === "Active" || item.status === "Active" || item.isActive === true,
      };

      if (groupData.name && groupData.code) {
        dispatch(createSupportGroupAction(groupData));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading support groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Support Group</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={levelFilter}
              onChange={(e) => {
                setLevelFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">All Levels</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredSupportGroup.map((g: any) => ({
                "Group Name": g.name,
                Code: g.code,
                Level: g.level || "-",
                Manager: g.manager?.name || "-",
                Services: g.services,
                "Max Tickets": g.maxTickets,
                Description: g.description || "-",
                Status: g.isActive ? "Active" : "Inactive",
                "Created At": new Date(g.createdAt).toLocaleDateString(),
              }))}
              fileName="support-groups"
              headers={[
                { label: "Group Name", key: "Group Name" },
                { label: "Code", key: "Code" },
                { label: "Level", key: "Level" },
                { label: "Manager", key: "Manager" },
                { label: "Services", key: "Services" },
                { label: "Max Tickets", key: "Max Tickets" },
                { label: "Description", key: "Description" },
                { label: "Status", key: "Status" },
                { label: "Created At", key: "Created At" },
              ]}
              onUpload={handleBulkUpload}
            />

            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-normal rounded-md bg-black text-white hover:bg-gray-900"
            >
              <GoPlusCircle size={18} />
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1400px] w-full">
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
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FiUser size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">No Support Group Found</h3>
                    <p className="text-xs text-gray-500">
                      You haven't added any Support Group yet.
                    </p>
                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add Support Group
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedSupportGroup?.map((group) => (
                <tr key={group._id} className="hover:bg-gray-50 transition-all duration-150">
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">{group._id.slice(-6)}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">{group.name}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">{group.code}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                      {group.level || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">{group.manager?.name || "-"}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700 max-w-xs truncate">
                      {group.services || "None"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">{group.maxTickets}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        group.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {group.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleManageMembers(group)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        title="Manage Members"
                      >
                        <Users size={19} />
                      </button>

                      <div className="w-px h-4 bg-gray-200"></div>

                      <button
                        onClick={() => handleEdit(group)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        disabled={updateLoading}
                      >
                        <HiPencilSquare size={19} />
                      </button>

                      <div className="w-px h-4 bg-gray-200"></div>

                      <button
                        onClick={() => handleDelete(group._id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-800 transition"
                        title="Delete"
                        disabled={deleteLoading}
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
        managers={managers.map((m) => ({
          _id: m._id,
          name: m.name,
          employeeCode: m.employeeCode,
        }))}
        loading={createLoading}
      />

      <UpdateSupportGroup
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedSupportGroup={selectedSupportGroup}
        onUpdate={handleUpdateSupportGroup}
        levels={levels}
        managers={managers.map((m) => ({
          _id: m._id,
          name: m.name,
          employeeCode: m.employeeCode,
        }))}
        loading={updateLoading}
      />

      <SupportGroupMembersModal
        isOpen={isMembersOpen}
        onClose={() => {
          setIsMembersOpen(false);
          setSelectedMembersGroup(null);
        }}
        supportGroup={selectedMembersGroup}
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
