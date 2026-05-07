import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const VENDORS_LOADING = "VENDORS_LOADING";
export const VENDORS_SUCCESS = "VENDORS_SUCCESS";
export const VENDORS_ERROR = "VENDORS_ERROR";
export const CREATE_VENDOR_LOADING = "CREATE_VENDOR_LOADING";
export const CREATE_VENDOR_SUCCESS = "CREATE_VENDOR_SUCCESS";
export const UPDATE_VENDOR_LOADING = "UPDATE_VENDOR_LOADING";
export const UPDATE_VENDOR_SUCCESS = "UPDATE_VENDOR_SUCCESS";
export const DELETE_VENDOR_LOADING = "DELETE_VENDOR_LOADING";
export const DELETE_VENDOR_SUCCESS = "DELETE_VENDOR_SUCCESS";

export const fetchVendors = () => async (dispatch: Dispatch) => {
  dispatch({ type: VENDORS_LOADING });
  try {
    const res = await fetch("/api/admin/vendor", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: VENDORS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch vendors");
      return;
    }

    dispatch({ type: VENDORS_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: VENDORS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createVendorAction =
  (vendorData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_VENDOR_LOADING });
    try {
      const res = await fetch("/api/admin/vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: VENDORS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create vendor");
        return;
      }

      dispatch({ type: CREATE_VENDOR_SUCCESS, payload: data.data });
      toast.success(data.message || "Vendor created successfully");
      onSuccess?.();

      await dispatch(fetchVendors() as any);
    } catch {
      dispatch({ type: VENDORS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const updateVendorAction =
  (id: string, vendorData: any, onSuccess?: () => void) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_VENDOR_LOADING });
    try {
      const res = await fetch(`/api/admin/vendor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: VENDORS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update vendor");
        return;
      }

      dispatch({ type: UPDATE_VENDOR_SUCCESS, payload: data.data });
      toast.success(data.message || "Vendor updated successfully");
      onSuccess?.();

      await dispatch(fetchVendors() as any);
    } catch {
      dispatch({ type: VENDORS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const deleteVendorAction =
  (id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_VENDOR_LOADING });
    try {
      const res = await fetch(`/api/admin/vendor/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: VENDORS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to delete vendor");
        return;
      }

      dispatch({ type: DELETE_VENDOR_SUCCESS, payload: id });
      toast.success(data.message || "Vendor deleted successfully");

      await dispatch(fetchVendors() as any);
    } catch {
      dispatch({ type: VENDORS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };
