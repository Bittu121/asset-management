"use client";

import { useState } from "react";
import AddDepartmentModal from "./AddDepartmentModal";
import UpdateDepartmentModal from "./UpdateDepartmentModal";

type Department = {
  id: number;
  name: string;
  code: string;
  head: string;
  createdAt: string;
};

function Department() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Accounts",
      code: "CC-ACC",
      head: "admin@gmail.com",
      createdAt: "Dec 17, 2025",
    },
    {
      id: 2,
      name: "Administration",
      code: "CC-ADMIN",
      head: "",
      createdAt: "Dec 17, 2025",
    },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const handleAdd = (data: Omit<Department, "id" | "createdAt">) => {
    const newDept: Department = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toDateString(),
    };
    setDepartments((prev) => [newDept, ...prev]);
  };

  const handleEdit = (dept: Department) => {
    setSelectedDept(dept);
    setIsUpdateOpen(true);
  };

  const handleUpdate = (updatedData: any) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === selectedDept?.id ? { ...d, ...updatedData } : d,
      ),
    );
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Departments</h1>
            <p className="text-sm text-gray-500">
              {departments.length} departments total
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Add Department
          </button>
        </div>

        <div className="mb-4">
          <input
            placeholder="Search departments..."
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3">Department</th>
                <th>Code</th>
                <th>Head</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{dept.name}</td>
                  <td>{dept.code}</td>

                  <td>
                    {dept.head ? (
                      <span className="text-gray-700">{dept.head}</span>
                    ) : (
                      <span className="text-yellow-600 text-xs bg-yellow-100 px-2 py-1 rounded">
                        Unassigned
                      </span>
                    )}
                  </td>

                  <td className="text-gray-500">{dept.createdAt}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(dept)}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddDepartmentModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />

        <UpdateDepartmentModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          department={selectedDept}
          onUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

export default Department;
