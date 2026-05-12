// ─── Types for the Asset Allocation section ──────────────────────────────────
// These match the populated API response from /api/allocations

// A user returned by the user-accounts API
export type User = {
  _id: string;
  name: string;
  email: string;
  employeeCode: string;
};

// An asset returned by the assets API
export type Asset = {
  _id: string;
  assetTag: string;
  device: string;      // display name of the device
  isActive: boolean;
  status?: "AVAILABLE" | "ALLOCATED"; // computed on the frontend
};

// A full allocation record (asset + allocatedTo are populated objects from the DB)
export type Allocation = {
  _id: string;
  asset: {
    _id: string;
    assetTag: string;
    device: string;
  };
  allocatedTo: {
    _id: string;
    name: string;
    email: string;
    employeeCode: string;
  };
  allocationDate:  string; // "YYYY-MM-DD"
  expectedReturn:  string; // "YYYY-MM-DD"
  status:          "ACTIVE" | "RETURNED";
  returnCondition: string;
  returnNotes:     string;
  returnDate:      string;
  createdAt:       string;
};

// ─── Helper functions ─────────────────────────────────────────────────────────

// Returns today's date as "YYYY-MM-DD"
export function today(): string {
  return new Date().toISOString().split("T")[0];
}

// Returns a date 30 days from now as "YYYY-MM-DD"
export function thirtyDaysFromNow(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split("T")[0];
}

// True if the allocation is past its expected return date and not yet returned
export function isOverdue(allocation: Allocation): boolean {
  if (allocation.status === "RETURNED") return false;
  return new Date(allocation.expectedReturn) < new Date();
}

// Formats "2026-01-15" → "Jan 15, 2026"
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// "John Doe" → "JD"
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
