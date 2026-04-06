"use client";
import React, { useState } from "react";
import CreateUserAccount from "./CreateUserAccount";
import UpdateUserAccount from "./UpdateUserAccount";
import Pagination from "../../../components/common/Pagination";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";

const roles = ["Admin", "Manager", "User"];

const departments = ["IT", "HR", "Finance"];
const subDepartments = ["Development", "Testing", "Support"];

const locations = ["Noida", "Delhi", "Bangalore"];
const subLocations = ["Noida HO", "Delhi Office", "BLR Tech Park"];

const managers = ["Admin", "Bittu Kumar", "Zeeshan Ahmed"];

const supportGroups = [
  "Application Support",
  "Backup Operations",
  "Network Team",
];

type UserAccount = {
  id: number;
  role: string;
  name: string;
  employeeCode: string;
  email: string;
  phone?: string;
  designation?: string;
  reportingTo?: string;
  department?: string;
  subDepartment?: string;
  location?: string;
  subLocation?: string;
  supportGroup?: string;
  password: string;
  createdAt: string;
};

function UserAccount() {
  const [userAccount, setUserAccount] = useState<UserAccount[]>([
    {
      id: 1,
      role: "User",
      name: "Bittu Kumar",
      employeeCode: "EMP001",
      email: "bittu@gmail.com",
      phone: "9876543210",
      designation: "Frontend Developer",
      reportingTo: "Admin",
      department: "IT",
      subDepartment: "Development",
      location: "Noida",
      subLocation: "Noida HO",
      supportGroup: "Application Support",
      password: "123456",

      createdAt: new Date().toDateString(),
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedUserAccount, setSelectedUserAccount] =
    useState<UserAccount | null>(null);

  //pagination step-1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //filter step-1
  const [search, setSearch] = useState("");
  const [userAccountFilter, setUserAccountFilter] = useState("");

  //filter step-2
  const filteredUserAccount = userAccount.filter((u) => {
    const matchesSearch =
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      userAccountFilter === "" || u.name === userAccountFilter;
    return matchesSearch && matchesFilter;
  });

  //pagination step-2
  const totalPages = Math.ceil(filteredUserAccount.length / itemsPerPage);
  const paginatedUserAccount = filteredUserAccount.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //api call
  const handleAddUserAccount = (
    data: Omit<UserAccount, "id" | "createdAt">,
  ) => {
    const newUser: UserAccount = {
      ...data,
      id: userAccount.length + 1,
      createdAt: new Date().toDateString(),
    };
    setUserAccount((prev) => [newUser, ...prev]);
    toast.success("User account created successfully");
  };

  const handleEdit = (user: UserAccount) => {
    setSelectedUserAccount(user);
    setIsUpdateOpen(true);
  };

  //api call
  const handleUpdateUserAccount = (updatedData: any) => {
    setUserAccount((prev) =>
      prev.map((u) =>
        u.id === selectedUserAccount?.id ? { ...u, ...updatedData } : u,
      ),
    );
    toast.success("User updated successfully");
  };

  //api call
  const handleDelete = (id: number) => {
    setUserAccount((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted successfully");
  };
  const bulkUploadHandler = () => {};

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">User Account</h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <select
              value={userAccountFilter}
              onChange={(e) => setUserAccountFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white"
            >
              <option value="">Select User Account</option>
              {userAccount.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <ExcelActions
              data={userAccount}
              fileName="user-account"
              headers={[
                { label: "ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Role", key: "role" },
                { label: "Employee Code", key: "employeeCode" },
                { label: "Department", key: "department" },
                { label: "Support Group", key: "supportGroup" },
                { label: "Created At", key: "createdAt" },
              ]}
              onUpload={bulkUploadHandler}
            />

            <button
              onClick={() => setIsAddOpen(true)}
              className="px-3 py-2 text-xs font-bold rounded-md bg-black text-white hover:bg-gray-900"
            >
              + User Account
            </button>
          </div>
        </div>
      </div>
      {/* Table */}

      <div className="bg-white rounded-md w-full overflow-x-auto scroll-smooth table-scroll">
        <table className="min-w-[1300px] w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Empolyee Code</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Support Group</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedUserAccount?.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        📍
                      </div>

                      <h3 className="text-sm font-semibold text-gray-700">
                        No User Account Found
                      </h3>

                      <p className="text-xs text-gray-500">
                        You haven’t added any User Account yet.
                      </p>

                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                        + User Account
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              paginatedUserAccount.map((users) => (
                <tr
                  key={users.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {users.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {users.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {users.email}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {users.role}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {users.employeeCode}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {users.department || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {users.supportGroup || "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(users)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <HiPencilSquare size={19} />
                      </button>

                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(users.id)}
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

      <CreateUserAccount
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddUserAccount}
        roles={roles}
        departments={departments}
        subDepartments={subDepartments}
        locations={locations}
        subLocations={subLocations}
        managers={managers}
        supportGroups={supportGroups}
      />

      <UpdateUserAccount
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedUserAccount={selectedUserAccount}
        onUpdate={handleUpdateUserAccount}
        roles={roles}
        departments={departments}
        subDepartments={subDepartments}
        locations={locations}
        subLocations={subLocations}
        managers={managers}
        supportGroups={supportGroups}
      />
      <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default UserAccount;

// "use client";
// import React, { useState } from "react";
// import CreateUserAccount from "./CreateUserAccount";
// import UpdateUserAccount from "./UpdateUserAccount";
// import Pagination from "../../../components/common/Pagination";
// import { FileSpreadsheet, Trash2, Search, Filter, Upload, UserPlus, MoreVertical, Mail, Phone, Building2, Users } from "lucide-react";
// import { toast } from "react-toastify";
// import { HiPencilSquare } from "react-icons/hi2";

// const roles = ["Admin", "Manager", "User"];

// const departments = ["IT", "HR", "Finance"];
// const subDepartments = ["Development", "Testing", "Support"];

// const locations = ["Noida", "Delhi", "Bangalore"];
// const subLocations = ["Noida HO", "Delhi Office", "BLR Tech Park"];

// const managers = ["Admin", "Bittu Kumar", "Zeeshan Ahmed"];

// const supportGroups = [
//   "Application Support",
//   "Backup Operations",
//   "Network Team",
// ];

// type UserAccount = {
//   id: number;
//   role: string;
//   name: string;
//   employeeCode: string;
//   email: string;
//   phone?: string;
//   designation?: string;
//   reportingTo?: string;
//   department?: string;
//   subDepartment?: string;
//   location?: string;
//   subLocation?: string;
//   supportGroup?: string;
//   password: string;
//   createdAt: string;
// };

// function UserAccount() {
//   const [userAccount, setUserAccount] = useState<UserAccount[]>([
//     {
//       id: 1,
//       role: "User",
//       name: "Bittu Kumar",
//       employeeCode: "EMP001",
//       email: "bittu@gmail.com",
//       phone: "9876543210",
//       designation: "Frontend Developer",
//       reportingTo: "Admin",
//       department: "IT",
//       subDepartment: "Development",
//       location: "Noida",
//       subLocation: "Noida HO",
//       supportGroup: "Application Support",
//       password: "123456",
//       createdAt: new Date().toDateString(),
//     },
//   ]);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [isUpdateOpen, setIsUpdateOpen] = useState(false);
//   const [selectedUserAccount, setSelectedUserAccount] =
//     useState<UserAccount | null>(null);

//   //pagination step-1
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   //filter step-1
//   const [search, setSearch] = useState("");
//   const [userAccountFilter, setUserAccountFilter] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   //filter step-2
//   const filteredUserAccount = userAccount.filter((u) => {
//     const matchesSearch =
//       search === "" ||
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase());
//     const matchesFilter =
//       userAccountFilter === "" || u.name === userAccountFilter;
//     return matchesSearch && matchesFilter;
//   });

//   //pagination step-2
//   const totalPages = Math.ceil(filteredUserAccount.length / itemsPerPage);
//   const paginatedUserAccount = filteredUserAccount.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   //api call
//   const handleAddUserAccount = (
//     data: Omit<UserAccount, "id" | "createdAt">,
//   ) => {
//     const newUser: UserAccount = {
//       ...data,
//       id: userAccount.length + 1,
//       createdAt: new Date().toDateString(),
//     };
//     setUserAccount((prev) => [newUser, ...prev]);
//     toast.success("User account created successfully");
//   };

//   const handleEdit = (user: UserAccount) => {
//     setSelectedUserAccount(user);
//     setIsUpdateOpen(true);
//   };

//   //api call
//   const handleUpdateUserAccount = (updatedData: any) => {
//     setUserAccount((prev) =>
//       prev.map((u) =>
//         u.id === selectedUserAccount?.id ? { ...u, ...updatedData } : u,
//       ),
//     );
//     toast.success("User updated successfully");
//   };

//   //api call
//   const handleDelete = (id: number) => {
//     setUserAccount((prev) => prev.filter((u) => u.id !== id));
//     toast.success("User deleted successfully");
//   };
//   //export
//   const handleExport = () => {};

//   // Stats calculation
//   const stats = [
//     {
//       label: "Total Users",
//       value: userAccount.length,
//       icon: Users,
//       color: "bg-blue-50 text-blue-600",
//       trend: "+12%",
//     },
//     {
//       label: "Active Today",
//       value: userAccount.filter(u => u.role === "User").length,
//       icon: Building2,
//       color: "bg-green-50 text-green-600",
//       trend: "+8%",
//     },
//     {
//       label: "Departments",
//       value: new Set(userAccount.map(u => u.department)).size,
//       icon: Building2,
//       color: "bg-purple-50 text-purple-600",
//       trend: "3",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
//         <div className="px-6 py-5">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
//                 User Management
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Manage and organize your team members
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleExport}
//                 className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
//               >
//                 <FileSpreadsheet size={16} />
//                 Export
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm">
//                 <Upload size={16} />
//                 Bulk Upload
//               </button>
//               <button
//                 onClick={() => setIsAddOpen(true)}
//                 className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
//               >
//                 <UserPlus size={16} />
//                 Add User
//               </button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
//                       {stat.label}
//                     </p>
//                     <p className="text-2xl font-bold text-gray-900 mt-2">
//                       {stat.value}
//                     </p>
//                     <p className="text-xs text-green-600 font-medium mt-1">
//                       {stat.trend} from last month
//                     </p>
//                   </div>
//                   <div className={`${stat.color} p-3 rounded-lg`}>
//                     <stat.icon size={24} />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Search and Filters */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//             <div className="relative flex-1 max-w-md">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={18}
//               />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name, email, or employee code..."
//                 className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
//                   showFilters
//                     ? "bg-gray-900 text-white border-gray-900"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 <Filter size={16} />
//                 Filters
//                 {userAccountFilter && (
//                   <span className="ml-1 px-1.5 py-0.5 text-xs bg-white text-gray-900 rounded-full">
//                     1
//                   </span>
//                 )}
//               </button>

//               {showFilters && (
//                 <select
//                   value={userAccountFilter}
//                   onChange={(e) => setUserAccountFilter(e.target.value)}
//                   className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                 >
//                   <option value="">All Users</option>
//                   {userAccount.map((u) => (
//                     <option key={u.id} value={u.name}>
//                       {u.name}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="p-6">
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="px-6 py-4 text-left">
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
//                       />
//                       <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         User
//                       </span>
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Department
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Support Group
//                   </th>
//                   <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 bg-white">
//                 {paginatedUserAccount?.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-20 text-center">
//                       <div className="flex flex-col items-center justify-center gap-4">
//                         <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
//                           <Users size={32} />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-900">
//                             No Users Found
//                           </h3>
//                           <p className="text-sm text-gray-500 mt-1">
//                             Get started by adding your first team member
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => setIsAddOpen(true)}
//                           className="mt-2 flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
//                         >
//                           <UserPlus size={16} />
//                           Add User
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedUserAccount.map((user) => (
//                     <tr
//                       key={user.id}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <input
//                             type="checkbox"
//                             className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
//                           />
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
//                               {user.name.charAt(0)}
//                             </div>
//                             <div>
//                               <div className="text-sm font-semibold text-gray-900">
//                                 {user.name}
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 {user.employeeCode}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-2 text-sm text-gray-700">
//                             <Mail size={14} className="text-gray-400" />
//                             {user.email}
//                           </div>
//                           {user.phone && (
//                             <div className="flex items-center gap-2 text-xs text-gray-500">
//                               <Phone size={12} className="text-gray-400" />
//                               {user.phone}
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
//                             user.role === "Admin"
//                               ? "bg-purple-100 text-purple-700"
//                               : user.role === "Manager"
//                               ? "bg-blue-100 text-blue-700"
//                               : "bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {user.role}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-900">
//                           {user.department || "-"}
//                         </div>
//                         {user.subDepartment && (
//                           <div className="text-xs text-gray-500">
//                             {user.subDepartment}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-700">
//                           {user.supportGroup || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex justify-end items-center gap-2">
//                           <button
//                             onClick={() => handleEdit(user)}
//                             className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-all duration-200"
//                             title="Edit"
//                           >
//                             <HiPencilSquare size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(user.id)}
//                             className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-all duration-200"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                           <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200">
//                             <MoreVertical size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Footer */}
//           {paginatedUserAccount.length > 0 && (
//             <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-600">
//                   Showing{" "}
//                   <span className="font-medium text-gray-900">
//                     {(currentPage - 1) * itemsPerPage + 1}
//                   </span>{" "}
//                   to{" "}
//                   <span className="font-medium text-gray-900">
//                     {Math.min(
//                       currentPage * itemsPerPage,
//                       filteredUserAccount.length
//                     )}
//                   </span>{" "}
//                   of{" "}
//                   <span className="font-medium text-gray-900">
//                     {filteredUserAccount.length}
//                   </span>{" "}
//                   users
//                 </div>
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={setCurrentPage}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <CreateUserAccount
//         isOpen={isAddOpen}
//         onClose={() => setIsAddOpen(false)}
//         onAdd={handleAddUserAccount}
//         roles={roles}
//         departments={departments}
//         subDepartments={subDepartments}
//         locations={locations}
//         subLocations={subLocations}
//         managers={managers}
//         supportGroups={supportGroups}
//       />

//       <UpdateUserAccount
//         isOpen={isUpdateOpen}
//         onClose={() => setIsUpdateOpen(false)}
//         selectedUserAccount={selectedUserAccount}
//         onUpdate={handleUpdateUserAccount}
//         roles={roles}
//         departments={departments}
//         subDepartments={subDepartments}
//         locations={locations}
//         subLocations={subLocations}
//         managers={managers}
//         supportGroups={supportGroups}
//       />
//     </div>
//   );
// }

// export default UserAccount;
