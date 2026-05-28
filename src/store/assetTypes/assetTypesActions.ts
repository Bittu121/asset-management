import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const ASSET_TYPES_LOADING = "ASSET_TYPES_LOADING";
export const ASSET_TYPES_SUCCESS = "ASSET_TYPES_SUCCESS";
export const ASSET_TYPES_ERROR = "ASSET_TYPES_ERROR";
export const CREATE_ASSET_TYPE_LOADING = "CREATE_ASSET_TYPE_LOADING";
export const CREATE_ASSET_TYPE_SUCCESS = "CREATE_ASSET_TYPE_SUCCESS";
export const UPDATE_ASSET_TYPE_LOADING = "UPDATE_ASSET_TYPE_LOADING";
export const UPDATE_ASSET_TYPE_SUCCESS = "UPDATE_ASSET_TYPE_SUCCESS";
export const DELETE_ASSET_TYPE_LOADING = "DELETE_ASSET_TYPE_LOADING";
export const DELETE_ASSET_TYPE_SUCCESS = "DELETE_ASSET_TYPE_SUCCESS";
export const SET_SELECTED_ASSET_TYPE = "SET_SELECTED_ASSET_TYPE";
export const CLEAR_ASSET_TYPES_ERROR = "CLEAR_ASSET_TYPES_ERROR";

export const fetchAssetTypes = () => async (dispatch: Dispatch) => {
  dispatch({ type: ASSET_TYPES_LOADING });
  try {
    const res = await fetch("/api/admin/asset-types", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ASSET_TYPES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch asset types");
      return;
    }

    dispatch({ type: ASSET_TYPES_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: ASSET_TYPES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createAssetTypeAction =
  (assetTypeData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_ASSET_TYPE_LOADING });
    try {
      const res = await fetch("/api/admin/asset-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetTypeData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ASSET_TYPES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create asset type");
        return;
      }

      dispatch({ type: CREATE_ASSET_TYPE_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset type created successfully");
      onSuccess?.();

      await dispatch(fetchAssetTypes() as any);
    } catch {
      dispatch({ type: ASSET_TYPES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const updateAssetTypeAction =
  (id: string, assetTypeData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_ASSET_TYPE_LOADING });
    try {
      const res = await fetch(`/api/admin/asset-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetTypeData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ASSET_TYPES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update asset type");
        return;
      }

      dispatch({ type: UPDATE_ASSET_TYPE_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset type updated successfully");
      onSuccess?.();

      await dispatch(fetchAssetTypes() as any);
    } catch {
      dispatch({ type: ASSET_TYPES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const deleteAssetTypeAction = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_ASSET_TYPE_LOADING });
  try {
    const res = await fetch(`/api/admin/asset-types/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ASSET_TYPES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to delete asset type");
      return;
    }

    dispatch({ type: DELETE_ASSET_TYPE_SUCCESS, payload: id });
    toast.success(data.message || "Asset type deleted successfully");

    await dispatch(fetchAssetTypes() as any);
  } catch {
    dispatch({ type: ASSET_TYPES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const setSelectedAssetType = (assetType: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_ASSET_TYPE, payload: assetType });
};

export const clearAssetTypesError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ASSET_TYPES_ERROR });
};
