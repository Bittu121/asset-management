import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const ASSETS_LOADING = "ASSETS_LOADING";
export const ASSETS_SUCCESS = "ASSETS_SUCCESS";
export const ASSETS_ERROR = "ASSETS_ERROR";
export const CREATE_ASSET_LOADING = "CREATE_ASSET_LOADING";
export const CREATE_ASSET_SUCCESS = "CREATE_ASSET_SUCCESS";
export const UPDATE_ASSET_LOADING = "UPDATE_ASSET_LOADING";
export const UPDATE_ASSET_SUCCESS = "UPDATE_ASSET_SUCCESS";
export const DELETE_ASSET_LOADING = "DELETE_ASSET_LOADING";
export const DELETE_ASSET_SUCCESS = "DELETE_ASSET_SUCCESS";

export const fetchAssets = () => async (dispatch: Dispatch) => {
  dispatch({ type: ASSETS_LOADING });
  try {
    const res = await fetch("/api/assets", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ASSETS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch assets");
      return;
    }

    dispatch({ type: ASSETS_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: ASSETS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createAssetAction =
  (assetData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_ASSET_LOADING });
    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ASSETS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create asset");
        return;
      }

      dispatch({ type: CREATE_ASSET_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset created successfully");
      onSuccess?.();

      await dispatch(fetchAssets() as any);
    } catch {
      dispatch({ type: ASSETS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const updateAssetAction =
  (id: string, assetData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_ASSET_LOADING });
    try {
      const res = await fetch(`/api/assets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ASSETS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update asset");
        return;
      }

      dispatch({ type: UPDATE_ASSET_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset updated successfully");
      onSuccess?.();

      await dispatch(fetchAssets() as any);
    } catch {
      dispatch({ type: ASSETS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const deleteAssetAction = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_ASSET_LOADING });
  try {
    const res = await fetch(`/api/assets/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ASSETS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to delete asset");
      return;
    }

    dispatch({ type: DELETE_ASSET_SUCCESS, payload: id });
    toast.success(data.message || "Asset deleted successfully");

    await dispatch(fetchAssets() as any);
  } catch {
    dispatch({ type: ASSETS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};
