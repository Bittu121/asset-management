"use client";

import AdminProfile from "./AdminProfile";
import TechnicianProfile from "./TechnicianProfile";
import UserProfile from "./UserProfile";

export type ProfileUser = {
  role: "admin" | "technician" | "user";
  name: string;
  employeeCode: string;
  email: string;
  phone: string;
  designation: string;
  reportingTo: string;
  department: string;
  subDepartment: string;
  location: string;
  subLocation: string;
  joinDate: string;
  status: string;
  // admin only
  teamSize?: number;
  systemRole?: string;
  lastLogin?: string;
  // technician only
  assignedTickets?: number;
  resolvedThisMonth?: number;
};

const currentUser: ProfileUser = {
  role: "user", // change to "admin" | "technician" | "user"
  name: "John Doe",
  employeeCode: "EMP001",
  email: "john.doe@company.com",
  phone: "+91 98765 43210",
  designation: "Senior Software Engineer",
  reportingTo: "Sarah Wilson",
  department: "Engineering",
  subDepartment: "Frontend Development",
  location: "Bangalore",
  subLocation: "HSR Layout, Sector 2",
  joinDate: "15 Jan 2023",
  status: "Active",
  teamSize: 12,
  systemRole: "Super Admin",
  lastLogin: "Today, 9:42 AM",
  assignedTickets: 8,
  resolvedThisMonth: 24,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser.role === "admin" && <AdminProfile user={currentUser} />}
      {currentUser.role === "technician" && (
        <TechnicianProfile user={currentUser} />
      )}
      {currentUser.role === "user" && <UserProfile user={currentUser} />}
    </div>
  );
}
