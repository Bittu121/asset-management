export type GatePassStatus =
  | "PENDING"
  | "APPROVED"
  | "ISSUED"
  | "RETURNED"
  | "REJECTED";
export type MovementType = "OUT" | "IN";

// Shape of a gate pass returned from the API (asset field is populated)
export type GatePass = {
  _id: string;
  gatePassId: string;
  asset: {
    _id: string;
    assetTag: string;
    device: string;
    model: string;
    manufacturer: string;
  };
  type: MovementType;
  purpose: string;
  from: string;
  to: string;
  expectedReturn: string;
  actualReturn: string;
  carrierName: string;
  carrierContact: string;
  carrierIdProof: string;
  requestedBy: string;
  status: GatePassStatus;
  notes: string;
  issuedAt: string;
  returnedAt: string;
  createdAt: string;
};

export type GatePassState = {
  gatePasses: GatePass[];
  loading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  error: string | null;
};
