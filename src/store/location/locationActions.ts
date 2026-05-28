import { Dispatch } from "redux";
import { toast } from "react-toastify";

// Action Types
export const LOCATION_LOADING = "LOCATION_LOADING";
export const LOCATION_ERROR = "LOCATION_ERROR";
export const GET_LOCATIONS_SUCCESS = "GET_LOCATIONS_SUCCESS";
export const CREATE_LOCATION_SUCCESS = "CREATE_LOCATION_SUCCESS";
export const UPDATE_LOCATION_SUCCESS = "UPDATE_LOCATION_SUCCESS";
export const DELETE_LOCATION_SUCCESS = "DELETE_LOCATION_SUCCESS";

// Get all locations
export const getLocationsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOCATION_LOADING });
  try {
    const res = await fetch("/api/admin/location", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: LOCATION_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch locations");
      return;
    }

    dispatch({ type: GET_LOCATIONS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOCATION_ERROR, payload: "Something went wrong" });
    toast.error("Failed to fetch locations");
  }
};

// Create location
export const createLocationAction = (locationData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await fetch("/api/admin/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(locationData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to create location");
      return;
    }

    dispatch({ type: CREATE_LOCATION_SUCCESS, payload: data.data });
    toast.success(data.message || "Location created successfully");
  } catch (error) {
    toast.error("Failed to create location");
  }
};

// Update location
export const updateLocationAction =
  (id: string, locationData: any) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/api/admin/location/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(locationData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update location");
        return;
      }

      dispatch({ type: UPDATE_LOCATION_SUCCESS, payload: data.data });
      toast.success(data.message || "Location updated successfully");
    } catch (error) {
      toast.error("Failed to update location");
    }
  };

// Delete location
export const deleteLocationAction = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await fetch(`/api/admin/location/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to delete location");
      return;
    }

    dispatch({ type: DELETE_LOCATION_SUCCESS, payload: id });
    toast.success(data.message || "Location deleted successfully");
  } catch (error) {
    toast.error("Failed to delete location");
  }
};
