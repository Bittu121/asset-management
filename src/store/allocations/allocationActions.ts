import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const ALLOCATIONS_LOADING = "ALLOCATIONS_LOADING";
export const ALLOCATIONS_SUCCESS = "ALLOCATIONS_SUCCESS";
export const ALLOCATIONS_ERROR = "ALLOCATIONS_ERROR";
export const CREATE_ALLOCATION_LOADING = "CREATE_ALLOCATION_LOADING";
export const CREATE_ALLOCATION_SUCCESS = "CREATE_ALLOCATION_SUCCESS";
export const RETURN_ALLOCATION_LOADING = "RETURN_ALLOCATION_LOADING";
export const RETURN_ALLOCATION_SUCCESS = "RETURN_ALLOCATION_SUCCESS";

// Fetch all allocations
export const fetchAllocations = () => async (dispatch: Dispatch) => {
  dispatch({ type: ALLOCATIONS_LOADING });
  try {
    const res = await fetch("/api/allocations", { credentials: "include" });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ALLOCATIONS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch allocations");
      return;
    }

    dispatch({ type: ALLOCATIONS_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: ALLOCATIONS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

// Create a new allocation (assign asset to user)
export const createAllocationAction =
  (
    allocationData: {
      asset: string;
      allocatedTo: string;
      allocationDate: string;
      expectedReturn: string;
    },
    onSuccess?: () => void,
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_ALLOCATION_LOADING });
    try {
      const res = await fetch("/api/allocations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allocationData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ALLOCATIONS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to allocate asset");
        return;
      }

      dispatch({ type: CREATE_ALLOCATION_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset allocated successfully");
      onSuccess?.();

      await dispatch(fetchAllocations() as any);
    } catch {
      dispatch({ type: ALLOCATIONS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Return an asset
export const returnAllocationAction =
  (
    id: string,
    returnData: { condition: string; notes: string },
    onSuccess?: () => void,
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: RETURN_ALLOCATION_LOADING });
    try {
      const res = await fetch(`/api/allocations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(returnData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ALLOCATIONS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to return asset");
        return;
      }

      dispatch({ type: RETURN_ALLOCATION_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset returned successfully");
      onSuccess?.();

      await dispatch(fetchAllocations() as any);
    } catch {
      dispatch({ type: ALLOCATIONS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };
