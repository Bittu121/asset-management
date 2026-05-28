import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const GATE_PASSES_LOADING = "GATE_PASSES_LOADING";
export const GATE_PASSES_SUCCESS = "GATE_PASSES_SUCCESS";
export const GATE_PASSES_ERROR = "GATE_PASSES_ERROR";
export const CREATE_GATE_PASS_LOADING = "CREATE_GATE_PASS_LOADING";
export const CREATE_GATE_PASS_SUCCESS = "CREATE_GATE_PASS_SUCCESS";
export const UPDATE_GATE_PASS_LOADING = "UPDATE_GATE_PASS_LOADING";
export const UPDATE_GATE_PASS_SUCCESS = "UPDATE_GATE_PASS_SUCCESS";

export const fetchGatePasses = () => async (dispatch: Dispatch) => {
  dispatch({ type: GATE_PASSES_LOADING });
  try {
    const res = await fetch("/api/gate-passes", { credentials: "include" });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: GATE_PASSES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch gate passes");
      return;
    }

    dispatch({ type: GATE_PASSES_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: GATE_PASSES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createGatePassAction =
  (
    formData: {
      asset: string;
      type: string;
      purpose: string;
      from: string;
      to: string;
      expectedReturn: string;
      carrierName: string;
      carrierContact: string;
      carrierIdProof: string;
    },
    onSuccess?: () => void
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_GATE_PASS_LOADING });
    try {
      const res = await fetch("/api/gate-passes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: GATE_PASSES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create gate pass");
        return;
      }

      dispatch({ type: CREATE_GATE_PASS_SUCCESS });
      toast.success(data.message || "Gate pass created successfully");
      onSuccess?.();

      // Refresh the list so the new entry appears immediately
      await (dispatch as any)(fetchGatePasses());
    } catch {
      dispatch({ type: GATE_PASSES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Sends a PUT request to approve, reject, issue, or return a gate pass
export const updateGatePassStatusAction =
  (id: string, updateData: { status: string; notes?: string }, onSuccess?: () => void) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_GATE_PASS_LOADING });
    try {
      const res = await fetch(`/api/gate-passes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: GATE_PASSES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update gate pass");
        return;
      }

      dispatch({ type: UPDATE_GATE_PASS_SUCCESS });
      toast.success(data.message || "Gate pass updated successfully");
      onSuccess?.();
      await (dispatch as any)(fetchGatePasses());
    } catch {
      dispatch({ type: GATE_PASSES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };
