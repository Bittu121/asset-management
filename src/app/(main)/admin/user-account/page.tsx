"use client";
import React, { useState } from "react";
import CreateUserAccount from "./CreateUserAccount";
import UpdateUserAccount from "./UpdateUserAccount";
import Pagination from "../../../components/common/Pagination";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HiPencilSquare } from "react-icons/hi2";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(userAccount.length / itemsPerPage);

  const paginatedUserAccount = userAccount.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddUserAccount = (
    data: Omit<UserAccount, "id" | "createdAt">,
  ) => {
    //api call
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

  const handleUpdateUserAccount = (updatedData: any) => {
    //api call
    setUserAccount((prev) =>
      prev.map((u) =>
        u.id === selectedUserAccount?.id ? { ...u, ...updatedData } : u,
      ),
    );
    toast.success("User updated successfully");
  };

  const handleDelete = (id: number) => {
    //api call
    setUserAccount((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted successfully");
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">User Account</h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            + User Account
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
            <option>All User Account</option>
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
              <></>
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
