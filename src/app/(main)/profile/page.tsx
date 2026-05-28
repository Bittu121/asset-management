"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/auth/store";
import AdminProfile from "./AdminProfile";
import TechnicianProfile from "./TechnicianProfile";
import UserProfile from "./UserProfile";

export type ProfileUser = {
  name: string;
  email: string;
  phone: string;
  employeeCode: string;
  designation: string;
  role: string;
  reportingTo: string;
  department: string;
  subDepartment: string;
  location: string;
  subLocation: string;
  joinDate: string;
  status: string;
};

export type ProfileAllocation = {
  _id: string;
  asset: {
    assetTag: string;
    device: string;
    manufacturer?: string;
    model?: string;
    warrantyExpiry?: string;
  };
  allocationDate: string;
  expectedReturn: string;
  status: "ACTIVE" | "RETURNED";
};

export type ProfileData = {
  user: ProfileUser;
  allocations: ProfileAllocation[];
  // admin / manager
  teamSize?: number;
  recentUsers?: {
    name: string;
    employeeCode: string;
    role: string;
    joinedAt: string;
  }[];
  // technician
  activeCount?: number;
  returnedCount?: number;
  recentActivity?: { action: string; detail: string; date: string }[];
  // end user
  gatePasses?: {
    gatePassId: string;
    type: string;
    purpose: string;
    status: string;
    createdAt: string;
  }[];
};

export default function ProfilePage() {
  const { user } = useSelector((s: RootState) => s.auth);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/profile", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data?.data) setProfile(data.data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">
          Could not load profile. Please try again.
        </p>
      </div>
    );
  }

  const role = (user?.role ?? profile.user.role).toUpperCase();
  const isAdmin =
    role === "ADMIN" || role === "MANAGER" || role === "SUPERADMIN";
  const isTechnician = role === "TECHNICIAN";

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdmin && <AdminProfile profile={profile} />}
      {isTechnician && <TechnicianProfile profile={profile} />}
      {!isAdmin && !isTechnician && <UserProfile profile={profile} />}
    </div>
  );
}
