import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const ASSET_CATEGORIES_LOADING = "ASSET_CATEGORIES_LOADING";
export const ASSET_CATEGORIES_SUCCESS = "ASSET_CATEGORIES_SUCCESS";
export const ASSET_CATEGORIES_ERROR = "ASSET_CATEGORIES_ERROR";
export const CREATE_ASSET_CATEGORY_LOADING = "CREATE_ASSET_CATEGORY_LOADING";
export const CREATE_ASSET_CATEGORY_SUCCESS = "CREATE_ASSET_CATEGORY_SUCCESS";
export const UPDATE_ASSET_CATEGORY_LOADING = "UPDATE_ASSET_CATEGORY_LOADING";
export const UPDATE_ASSET_CATEGORY_SUCCESS = "UPDATE_ASSET_CATEGORY_SUCCESS";
export const DELETE_ASSET_CATEGORY_LOADING = "DELETE_ASSET_CATEGORY_LOADING";
export const DELETE_ASSET_CATEGORY_SUCCESS = "DELETE_ASSET_CATEGORY_SUCCESS";
export const SET_SELECTED_ASSET_CATEGORY = "SET_SELECTED_ASSET_CATEGORY";
export const CLEAR_ASSET_CATEGORIES_ERROR = "CLEAR_ASSET_CATEGORIES_ERROR";

export const fetchAssetCategories = () => async (dispatch: Dispatch) => {
  dispatch({ type: ASSET_CATEGORIES_LOADING });
  try {
    const res = await fetch("/api/admin/asset-categories", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ASSET_CATEGORIES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch asset categories");
      return;
    }

    dispatch({ type: ASSET_CATEGORIES_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: ASSET_CATEGORIES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createAssetCategoryAction =
  (categoryData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_ASSET_CATEGORY_LOADING });
    try {
      const res = await fetch("/api/admin/asset-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ASSET_CATEGORIES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create asset category");
        return;
      }

      dispatch({ type: CREATE_ASSET_CATEGORY_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset category created successfully");
      onSuccess?.();

      await dispatch(fetchAssetCategories() as any);
    } catch {
      dispatch({ type: ASSET_CATEGORIES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const updateAssetCategoryAction =
  (id: string, categoryData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_ASSET_CATEGORY_LOADING });
    try {
      const res = await fetch(`/api/admin/asset-categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ASSET_CATEGORIES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update asset category");
        return;
      }

      dispatch({ type: UPDATE_ASSET_CATEGORY_SUCCESS, payload: data.data });
      toast.success(data.message || "Asset category updated successfully");
      onSuccess?.();

      await dispatch(fetchAssetCategories() as any);
    } catch {
      dispatch({ type: ASSET_CATEGORIES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const deleteAssetCategoryAction = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_ASSET_CATEGORY_LOADING });
  try {
    const res = await fetch(`/api/admin/asset-categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ASSET_CATEGORIES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to delete asset category");
      return;
    }

    dispatch({ type: DELETE_ASSET_CATEGORY_SUCCESS, payload: id });
    toast.success(data.message || "Asset category deleted successfully");

    await dispatch(fetchAssetCategories() as any);
  } catch {
    dispatch({ type: ASSET_CATEGORIES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const setSelectedAssetCategory = (category: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_ASSET_CATEGORY, payload: category });
};

export const clearAssetCategoriesError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ASSET_CATEGORIES_ERROR });
};
