export const permissionModules = [
  {
    name: "Incident Management",
    permissions: [
      "Create Incident",
      "Edit Incident",
      "Delete Incident",
      "Assign Incident",
      "Close Incident",
    ],
  },
  {
    name: "Asset Management",
    permissions: [
      "Create Asset",
      "Edit Asset",
      "Delete Asset",
      "Assign Asset",
      "View Inventory",
    ],
  },
  {
    name: "User Management",
    permissions: ["Create User", "Edit User", "Delete User", "Assign Role"],
  },
  {
    name: "Notification",
    permissions: ["Send Notification", "View Notifications"],
  },
  {
    name: "Reports & Analytics",
    permissions: ["View Reports", "View Analytics", "Export Reports"],
  },
  {
    name: "System Settings",
    permissions: ["Manage Settings", "View Audit Log", "Manage Integrations"],
  },
];
