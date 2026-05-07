// "use client";
// import React, { useState } from "react";
// import CreateUserAccount from "./CreateUserAccount";
// import UpdateUserAccount from "./UpdateUserAccount";
// import Pagination from "../../../components/common/Pagination";
// import { FileSpreadsheet, Trash2 } from "lucide-react";
// import { toast } from "react-toastify";
// import { HiPencilSquare } from "react-icons/hi2";
// import ExcelActions from "@/app/components/common/ExcelActions";
// import { GoPlusCircle } from "react-icons/go";
// import { FiUser } from "react-icons/fi";

// const roles = ["Admin", "Manager", "User"];

// const departments = ["IT", "HR", "Finance"];
// const subDepartments = ["Development", "Testing", "Support"];

// const locations = ["Noida", "Delhi", "Bangalore"];
// const subLocations = ["Noida HO", "Delhi Office", "BLR Tech Park"];

// const managers = ["Admin", "Bittu Kumar", "Zeeshan Ahmed"];

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
//   const bulkUploadHandler = () => {};

//   return (
//     <div className="p-4 bg-[#f8fafc] min-h-screen">
//       <div className="mb-4 space-y-3">
//         <div className="flex items-center justify-between">
//           <h1 className="text-lg font-semibold text-gray-900">User Account</h1>
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
//               value={userAccountFilter}
//               onChange={(e) => setUserAccountFilter(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
//             >
//               <option value="">Select User Account</option>
//               {userAccount.map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-2">
//             <ExcelActions
//               data={filteredUserAccount}
//               fileName="user-account"
//               headers={[
//                 { label: "ID", key: "id" },
//                 { label: "Name", key: "name" },
//                 { label: "Email", key: "email" },
//                 { label: "Role", key: "role" },
//                 { label: "Employee Code", key: "employeeCode" },
//                 { label: "Department", key: "department" },
//                 { label: "Created At", key: "createdAt" },
//               ]}
//               onUpload={(uploadedData: any[]) => {
//                 const formattedData: UserAccount[] = uploadedData.map(
//                   (item, index) => ({
//                     id: Date.now() + index,
//                     role: item.Role || item.role || "User",
//                     name: item.Name || item.name || "",
//                     employeeCode:
//                       item["Employee Code"] || item.employeeCode || "",
//                     email: item.Email || item.email || "",
//                     phone: item.Phone || item.phone || "",
//                     designation: item.Designation || item.designation || "",
//                     reportingTo: item["Reporting To"] || item.reportingTo || "",
//                     department: item.Department || item.department || "",
//                     subDepartment:
//                       item["Sub Department"] || item.subDepartment || "",
//                     location: item.Location || item.location || "",
//                     subLocation: item["Sub Location"] || item.subLocation || "",
//                     password: item.Password || "123456",
//                     createdAt: new Date().toDateString(),
//                   }),
//                 );
//                 setUserAccount((prev) => [...formattedData, ...prev]);
//                 toast.success("User accounts uploaded successfully");
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
//               <th className="px-6 py-4 text-left">Name</th>
//               <th className="px-6 py-4 text-left">Email</th>
//               <th className="px-6 py-4 text-left">Role</th>
//               <th className="px-6 py-4 text-left">Empolyee Code</th>
//               <th className="px-6 py-4 text-left">Department</th>
//               <th className="px-6 py-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {paginatedUserAccount?.length === 0 ? (
//               <>
//                 <tr>
//                   <td colSpan={6} className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center justify-center gap-3">
//                       <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
//                         <FiUser size={18} />
//                       </div>

//                       <h3 className="text-sm font-semibold text-gray-700">
//                         No User Account Found
//                       </h3>

//                       <p className="text-xs text-gray-500">
//                         You haven’t added any User Account yet.
//                       </p>

//                       <button
//                         onClick={() => setIsAddOpen(true)}
//                         className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
//                       >
//                         Add User Account
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               </>
//             ) : (
//               paginatedUserAccount.map((users) => (
//                 <tr
//                   key={users.id}
//                   className="hover:bg-gray-50 transition-all duration-150"
//                 >
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {users.id}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {users.name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {users.email}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {users.role}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {users.employeeCode}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-medium text-gray-900">
//                       {users.department || "-"}
//                     </div>
//                   </td>

//                   <td className="px-6 py-5">
//                     <div className="flex justify-end items-center gap-3">
//                       <button
//                         onClick={() => handleEdit(users)}
//                         className="text-sm font-medium text-blue-600 hover:text-blue-700"
//                       >
//                         <HiPencilSquare size={19} />
//                       </button>

//                       <div className="w-px h-4 bg-gray-200"></div>
//                       <button
//                         onClick={() => handleDelete(users.id)}
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
//       />
//       <div className="bg-white border border-gray-200 rounded-b-2xl px-6 py-3">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserAccount;

"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateUserAccount from "./CreateUserAccount";
import UpdateUserAccount from "./UpdateUserAccount";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { HiPencilSquare } from "react-icons/hi2";
import ExcelActions from "@/app/components/common/ExcelActions";
import { GoPlusCircle } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  createUserAccountAction,
  deleteUserAccountAction,
  fetchUserAccounts,
  updateUserAccountAction,
} from "@/store/userAccounts/userAccountsActions";
import { fetchRoles } from "@/store/roles/rolesActions";

function UserAccount() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, createLoading, updateLoading, deleteLoading } =
    useSelector((state: RootState) => state.userAccounts);
  const { roles } = useSelector((state: RootState) => state.roles);
  console.log("roles", roles);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedUserAccount, setSelectedUserAccount] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    dispatch(fetchUserAccounts());
    dispatch(fetchRoles());
  }, [dispatch]);

  // Get unique values for filters
  const managers = users.filter((u) =>
    ["ADMIN", "MANAGER"].includes(u.role.name),
  );

  const departments = Array.from(
    new Set(users.map((u) => u.department).filter(Boolean)),
  );

  const subDepartments = Array.from(
    new Set(users.map((u) => u.subDepartment).filter(Boolean)),
  );

  const locations = Array.from(
    new Set(users.map((u) => u.location).filter(Boolean)),
  );

  const subLocations = Array.from(
    new Set(users.map((u) => u.subLocation).filter(Boolean)),
  );

  const filteredUserAccount = users.filter((u) => {
    const matchesSearch =
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.employeeCode.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "" || u.role.name === roleFilter;

    const matchesDepartment =
      departmentFilter === "" || u.department === departmentFilter;

    const matchesLocation =
      locationFilter === "" || u.location === locationFilter;

    return matchesSearch && matchesRole && matchesDepartment && matchesLocation;
  });

  const totalPages = Math.ceil(filteredUserAccount.length / itemsPerPage);
  const paginatedUserAccount = filteredUserAccount.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddUserAccount = (data: any) => {
    dispatch(createUserAccountAction(data, () => setIsAddOpen(false)));
  };

  const handleEdit = (user: any) => {
    setSelectedUserAccount(user);
    setIsUpdateOpen(true);
  };

  const handleUpdateUserAccount = (updatedData: any) => {
    if (selectedUserAccount) {
      dispatch(
        updateUserAccountAction(selectedUserAccount._id, updatedData, () =>
          setIsUpdateOpen(false),
        ),
      );
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteUserAccountAction(id));
  };

  const handleBulkUpload = (uploadedData: any[]) => {
    uploadedData.forEach((item) => {
      const roleId = roles.find((r) => r.name === item.Role)?._id;
      const managerId = users.find((u) => u.name === item["Reporting To"])?._id;

      if (roleId) {
        const userData = {
          name: item.Name || item.name || "",
          email: item.Email || item.email || "",
          password: item.Password || "123456",
          employeeCode: item["Employee Code"] || item.employeeCode || "",
          phone: item.Phone || item.phone || "",
          designation: item.Designation || item.designation || "",
          role: roleId,
          reportingManager: managerId || undefined,
          department: item.Department || item.department || "",
          subDepartment: item["Sub Department"] || item.subDepartment || "",
          location: item.Location || item.location || "",
          subLocation: item["Sub Location"] || item.subLocation || "",
        };

        dispatch(createUserAccountAction(userData));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">User Account</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email, or code..."
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role._id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-0.9 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ExcelActions
              data={filteredUserAccount.map((u) => ({
                Name: u.name,
                Email: u.email,
                "Employee Code": u.employeeCode,
                Phone: u.phone || "-",
                Designation: u.designation || "-",
                Role: u.role.name,
                Department: u.department || "-",
                "Sub Department": u.subDepartment || "-",
                Location: u.location || "-",
                "Sub Location": u.subLocation || "-",
                "Reporting To": u.reportingManager?.name || "-",
                "Created At": new Date(u.createdAt).toLocaleDateString(),
              }))}
              fileName="user-accounts"
              headers={[
                { label: "Name", key: "Name" },
                { label: "Email", key: "Email" },
                { label: "Employee Code", key: "Employee Code" },
                { label: "Phone", key: "Phone" },
                { label: "Designation", key: "Designation" },
                { label: "Role", key: "Role" },
                { label: "Department", key: "Department" },
                { label: "Sub Department", key: "Sub Department" },
                { label: "Location", key: "Location" },
                { label: "Sub Location", key: "Sub Location" },
                { label: "Reporting To", key: "Reporting To" },
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
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Employee Code</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Reporting To</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedUserAccount?.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FiUser size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      No User Account Found
                    </h3>
                    <p className="text-xs text-gray-500">
                      You haven't added any User Account yet.
                    </p>
                    <button
                      onClick={() => setIsAddOpen(true)}
                      className="mt-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add User Account
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUserAccount.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {user._id.slice(-6)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">{user.email}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                      {user.role.name}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">
                      {user.employeeCode}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">
                      {user.department || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">
                      {user.location || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-700">
                      {user.reportingManager?.name || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        disabled={updateLoading}
                      >
                        <HiPencilSquare size={19} />
                      </button>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <button
                        onClick={() => handleDelete(user._id)}
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

      <CreateUserAccount
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddUserAccount}
        roles={roles.map((r) => ({ _id: r._id, name: r.name }))}
        departments={departments}
        subDepartments={subDepartments}
        locations={locations}
        subLocations={subLocations}
        managers={managers.map((m) => ({
          _id: m._id,
          name: m.name,
          employeeCode: m.employeeCode,
        }))}
        loading={createLoading}
      />

      <UpdateUserAccount
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        selectedUserAccount={selectedUserAccount}
        onUpdate={handleUpdateUserAccount}
        roles={roles.map((r) => ({ _id: r._id, name: r.name }))}
        departments={departments}
        subDepartments={subDepartments}
        locations={locations}
        subLocations={subLocations}
        managers={managers.map((m) => ({
          _id: m._id,
          name: m.name,
          employeeCode: m.employeeCode,
        }))}
        loading={updateLoading}
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
