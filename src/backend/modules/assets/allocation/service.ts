import Allocation from "./schema";

// Import referenced schemas so Mongoose can resolve populate()
import "../../admin/user-account/schema";
import "../schema"; // Asset schema

// Fields to populate for every allocation response
const POPULATE = [
  { path: "asset", select: "assetTag device manufacturer model isActive" },
  { path: "allocatedTo", select: "name email employeeCode" },
];

// Get all allocations (newest first)
export async function getAllAllocations() {
  return await Allocation.find().populate(POPULATE).sort({ createdAt: -1 });
}

// Get one allocation by its ID
export async function getAllocationById(id: string) {
  return await Allocation.findById(id).populate(POPULATE);
}

// Check if an asset already has an active allocation
export async function getActiveAllocationForAsset(assetId: string) {
  return await Allocation.findOne({ asset: assetId, status: "ACTIVE" });
}

// Create a new allocation
export async function createAllocation(data: {
  asset: string;
  allocatedTo: string;
  allocationDate: string;
  expectedReturn: string;
}) {
  const created = await Allocation.create(data);
  return await Allocation.findById(created._id).populate(POPULATE);
}

// Mark an allocation as returned
export async function returnAllocation(
  id: string,
  data: { returnCondition: string; returnNotes: string; returnDate: string },
) {
  return await Allocation.findByIdAndUpdate(
    id,
    { status: "RETURNED", ...data },
    { new: true },
  ).populate(POPULATE);
}

// Delete an allocation
export async function deleteAllocation(id: string) {
  return await Allocation.findByIdAndDelete(id);
}
