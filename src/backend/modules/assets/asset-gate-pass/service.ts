import GatePass from "./schema";
import { nextSequence } from "../../../models/counter";

// Import Asset schema so Mongoose can resolve populate()
import "../schema";

// Fields to populate on every gate pass response
const POPULATE = [{ path: "asset", select: "assetTag device model manufacturer isActive" }];

// Get all gate passes (newest first)
export async function getAllGatePasses() {
  return await GatePass.find().populate(POPULATE).sort({ createdAt: -1 });
}

// Get a single gate pass by ID
export async function getGatePassById(id: string) {
  return await GatePass.findById(id).populate(POPULATE);
}

// Generate a unique gate pass ID atomically, e.g. "GP-2026-0001"
async function generateGatePassId(): Promise<string> {
  const year = new Date().getFullYear();
  const seq = await nextSequence(`gate-pass-${year}`);
  return `GP-${year}-${String(seq).padStart(4, "0")}`;
}

// Create a new gate pass
export async function createGatePass(data: {
  asset: string;
  type: string;
  purpose: string;
  from: string;
  to: string;
  expectedReturn: string;
  carrierName: string;
  carrierContact: string;
  carrierIdProof: string;
  requestedBy: string;
}) {
  const gatePassId = await generateGatePassId();
  const created = await GatePass.create({ ...data, gatePassId });
  return await GatePass.findById(created._id).populate(POPULATE);
}

// Update gate pass status (approve / reject / issue / return)
export async function updateGatePassStatus(
  id: string,
  data: {
    status: string;
    notes?: string;
    issuedAt?: string;
    returnedAt?: string;
    actualReturn?: string;
  }
) {
  return await GatePass.findByIdAndUpdate(id, data, { new: true }).populate(POPULATE);
}

// Delete a gate pass record
export async function deleteGatePass(id: string) {
  return await GatePass.findByIdAndDelete(id);
}
