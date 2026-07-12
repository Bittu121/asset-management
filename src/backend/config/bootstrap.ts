import Role from "../modules/admin/roles/schema";
import UserAccount from "../modules/admin/user-account/schema";
import { hashPassword } from "../utils/password";
import { env } from "./env";

/**
 * System roles the application depends on. These are config/reference data —
 * role names must stay exact because the sidebar and access checks read them.
 * Only the ADMIN account is bootstrapped; the admin creates all other users.
 */
const ROLE_DEFINITIONS = [
  {
    name: "ADMIN",
    description: "System Administrator with full access",
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
  },
  {
    name: "MANAGER",
    description: "Department Manager with limited admin access",
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
  },
  {
    name: "TECHNICIAN",
    description: "Technical support staff",
    permissions: ["Create Incident", "Edit Incident", "View Inventory", "View Notifications"],
  },
  {
    name: "USER",
    description: "End user with basic access",
    permissions: ["Create Incident", "View Notifications"],
  },
];

// Cache the promise so the bootstrap runs only once per server process.
let bootstrapPromise: Promise<void> | null = null;

const runBootstrap = async (): Promise<void> => {
  // 1. Ensure system roles exist. $setOnInsert = create if missing, never
  //    overwrite roles an admin may have edited later. Fully idempotent.
  for (const def of ROLE_DEFINITIONS) {
    await Role.updateOne(
      { name: def.name },
      {
        $setOnInsert: {
          name: def.name,
          description: def.description,
          permissions: def.permissions,
          isActive: true,
        },
      },
      { upsert: true }
    );
  }

  // 2. Ensure an admin account exists. If any ADMIN-role user is already
  //    present, do nothing — the admin manages everyone else from the app.
  const adminRole = await Role.findOne({ name: "ADMIN" });
  if (!adminRole) return;

  const existingAdmin = await UserAccount.findOne({ role: adminRole._id });
  if (existingAdmin) return;

  const password = await hashPassword(env.ADMIN_PASSWORD);
  await UserAccount.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password,
    employeeCode: env.ADMIN_EMPLOYEE_CODE,
    designation: "System Administrator",
    role: adminRole._id,
    reportingManager: null,
    isVerified: true,
  });

  console.log(`✅ Bootstrap: admin account created (${env.ADMIN_EMAIL})`);
};

/**
 * Idempotent first-run setup: ensures the 4 system roles and a single admin
 * account exist. Safe to call on every startup — it self-guards against
 * re-running and never destroys existing data.
 */
export const ensureBootstrap = async (): Promise<void> => {
  if (!bootstrapPromise) {
    bootstrapPromise = runBootstrap().catch((err) => {
      // Reset so a transient failure can retry on the next call.
      bootstrapPromise = null;
      console.error("Bootstrap error:", err);
      throw err;
    });
  }
  return bootstrapPromise;
};
