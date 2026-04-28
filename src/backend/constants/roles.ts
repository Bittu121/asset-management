export const roles = {
  ADMIN: "admin",
  USER: "user",
  TECHNICIAN: "technician",
  MANAGER: "manager",
} as const;

export type RoleType = (typeof roles)[keyof typeof roles];
