import { Dispatch } from "redux";
import { toast } from "react-toastify";

// Action Types
export const SUBLOCATION_LOADING = "SUBLOCATION_LOADING";
export const SUBLOCATION_ERROR = "SUBLOCATION_ERROR";
export const GET_SUBLOCATIONS_SUCCESS = "GET_SUBLOCATIONS_SUCCESS";
export const CREATE_SUBLOCATION_SUCCESS = "CREATE_SUBLOCATION_SUCCESS";
export const UPDATE_SUBLOCATION_SUCCESS = "UPDATE_SUBLOCATION_SUCCESS";
export const DELETE_SUBLOCATION_SUCCESS = "DELETE_SUBLOCATION_SUCCESS";

// Get all sub locations
export const getSubLocationsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: SUBLOCATION_LOADING });
  try {
    const res = await fetch("/api/admin/sub-location", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: SUBLOCATION_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch sub locations");
      return;
    }

    dispatch({ type: GET_SUBLOCATIONS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: SUBLOCATION_ERROR, payload: "Something went wrong" });
    toast.error("Failed to fetch sub locations");
  }
};

// Create sub location
export const createSubLocationAction = (subLocationData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await fetch("/api/admin/sub-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(subLocationData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to create sub location");
      return;
    }

    dispatch({ type: CREATE_SUBLOCATION_SUCCESS, payload: data.data });
    toast.success(data.message || "Sub location created successfully");
  } catch (error) {
    toast.error("Failed to create sub location");
  }
};

// Update sub location
export const updateSubLocationAction =
  (id: string, subLocationData: any) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/api/admin/sub-location/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(subLocationData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update sub location");
        return;
      }

      dispatch({ type: UPDATE_SUBLOCATION_SUCCESS, payload: data.data });
      toast.success(data.message || "Sub location updated successfully");
    } catch (error) {
      toast.error("Failed to update sub location");
    }
  };

// Delete sub location
export const deleteSubLocationAction = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await fetch(`/api/admin/sub-location/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to delete sub location");
      return;
    }

    dispatch({ type: DELETE_SUBLOCATION_SUCCESS, payload: id });
    toast.success(data.message || "Sub location deleted successfully");
  } catch (error) {
    toast.error("Failed to delete sub location");
  }
};
