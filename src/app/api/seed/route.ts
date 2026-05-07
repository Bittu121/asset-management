import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Role from "../../../backend/modules/admin/roles/schema";
import UserAccount from "../../../backend/modules/admin/user-account/schema";
import { hashPassword } from "../../../backend/utils/password";
import { env } from "../../../backend/config/env";

export async function POST(req: Request) {
  try {
    // Security: Only allow in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Seed endpoint disabled in production" },
        { status: 403 },
      );
    }

    await mongoose.connect(env.MONGODB_URI);
    console.log("📦 Connected to MongoDB");

    // Clear existing data
    await Role.deleteMany({});
    await UserAccount.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // 1. Create Roles
    const adminRole = await Role.create({
      name: "ADMIN",
      description: "System Administrator with full access",
      isActive: true,
      permissions: [
        "Create Incident",
        "Edit Incident",
        "Delete Incident",
        "Assign Incident",
        "Close Incident",
        "Create Asset",
        "Edit Asset",
        "Delete Asset",
        "Assign Asset",
        "View Inventory",
        "Create User",
        "Edit User",
        "Delete User",
        "Assign Role",
        "Send Notification",
        "View Notifications",
        "View Reports",
        "View Analytics",
        "Export Reports",
        "Manage Settings",
        "View Audit Log",
        "Manage Integrations",
      ],
    });

    const managerRole = await Role.create({
      name: "MANAGER",
      description: "Department Manager with limited admin access",
      isActive: true,
      permissions: [
        "Create Incident",
        "Edit Incident",
        "Assign Incident",
        "Close Incident",
        "View Inventory",
        "Create User",
        "Edit User",
        "View Reports",
        "View Analytics",
        "Export Reports",
      ],
    });

    const technicianRole = await Role.create({
      name: "TECHNICIAN",
      description: "Technical support staff",
      isActive: true,
      permissions: [
        "Create Incident",
        "Edit Incident",
        "View Inventory",
        "View Notifications",
      ],
    });

    const userRole = await Role.create({
      name: "USER",
      description: "End user with basic access",
      isActive: true,
      permissions: ["Create Incident", "View Notifications"],
    });

    // 2. Create Admin User
    const adminPassword = await hashPassword("Admin@123");
    const adminUser = await UserAccount.create({
      name: "Super Admin",
      email: "admin@assetmanagement.com",
      password: adminPassword,
      employeeCode: "EMP001",
      phone: "+1234567890",
      designation: "System Administrator",
      role: adminRole._id,
      reportingManager: null,
      department: "IT",
      subDepartment: "Administration",
      location: "Head Office",
      subLocation: "Main Building",
      isVerified: true,
    });

    // 3. Create Manager User
    const managerPassword = await hashPassword("Manager@123");
    const managerUser = await UserAccount.create({
      name: "John Manager",
      email: "manager@assetmanagement.com",
      password: managerPassword,
      employeeCode: "EMP002",
      phone: "+1234567891",
      designation: "Department Manager",
      role: managerRole._id,
      reportingManager: adminUser._id,
      department: "IT",
      subDepartment: "Support",
      location: "Head Office",
      subLocation: "Main Building",
      isVerified: true,
    });

    // 4. Create Technician User
    const techPassword = await hashPassword("Tech@123");
    await UserAccount.create({
      name: "Mike Technician",
      email: "tech@assetmanagement.com",
      password: techPassword,
      employeeCode: "EMP003",
      phone: "+1234567892",
      designation: "Support Technician",
      role: technicianRole._id,
      reportingManager: managerUser._id,
      department: "IT",
      subDepartment: "Support",
      location: "Head Office",
      subLocation: "Main Building",
      isVerified: true,
    });

    // 5. Create Regular User
    const userPassword = await hashPassword("User@123");
    await UserAccount.create({
      name: "Jane User",
      email: "user@assetmanagement.com",
      password: userPassword,
      employeeCode: "EMP004",
      phone: "+1234567893",
      designation: "Employee",
      role: userRole._id,
      reportingManager: managerUser._id,
      department: "HR",
      subDepartment: "Recruitment",
      location: "Branch Office",
      subLocation: "Floor 2",
      isVerified: true,
    });

    const credentials = {
      admin: {
        email: "admin@assetmanagement.com",
        password: "Admin@123",
      },
      manager: {
        email: "manager@assetmanagement.com",
        password: "Manager@123",
      },
      technician: {
        email: "tech@assetmanagement.com",
        password: "Tech@123",
      },
      user: {
        email: "user@assetmanagement.com",
        password: "User@123",
      },
    };

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      credentials,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//http://localhost:3000/api/seed  Note method post , body {}