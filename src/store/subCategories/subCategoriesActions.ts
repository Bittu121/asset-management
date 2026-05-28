import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const SUB_CATEGORIES_LOADING = "SUB_CATEGORIES_LOADING";
export const SUB_CATEGORIES_SUCCESS = "SUB_CATEGORIES_SUCCESS";
export const SUB_CATEGORIES_ERROR = "SUB_CATEGORIES_ERROR";
export const CREATE_SUB_CATEGORY_LOADING = "CREATE_SUB_CATEGORY_LOADING";
export const CREATE_SUB_CATEGORY_SUCCESS = "CREATE_SUB_CATEGORY_SUCCESS";
export const UPDATE_SUB_CATEGORY_LOADING = "UPDATE_SUB_CATEGORY_LOADING";
export const UPDATE_SUB_CATEGORY_SUCCESS = "UPDATE_SUB_CATEGORY_SUCCESS";
export const DELETE_SUB_CATEGORY_LOADING = "DELETE_SUB_CATEGORY_LOADING";
export const DELETE_SUB_CATEGORY_SUCCESS = "DELETE_SUB_CATEGORY_SUCCESS";
export const SET_SELECTED_SUB_CATEGORY = "SET_SELECTED_SUB_CATEGORY";
export const CLEAR_SUB_CATEGORIES_ERROR = "CLEAR_SUB_CATEGORIES_ERROR";

export const fetchSubCategories = () => async (dispatch: Dispatch) => {
  dispatch({ type: SUB_CATEGORIES_LOADING });
  try {
    const res = await fetch("/api/admin/sub-categories", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: SUB_CATEGORIES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch sub categories");
      return;
    }

    dispatch({ type: SUB_CATEGORIES_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: SUB_CATEGORIES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createSubCategoryAction =
  (subCategoryData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_SUB_CATEGORY_LOADING });
    try {
      const res = await fetch("/api/admin/sub-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subCategoryData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: SUB_CATEGORIES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create sub category");
        return;
      }

      dispatch({ type: CREATE_SUB_CATEGORY_SUCCESS, payload: data.data });
      toast.success(data.message || "Sub category created successfully");
      onSuccess?.();

      await dispatch(fetchSubCategories() as any);
    } catch {
      dispatch({ type: SUB_CATEGORIES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const updateSubCategoryAction =
  (id: string, subCategoryData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_SUB_CATEGORY_LOADING });
    try {
      const res = await fetch(`/api/admin/sub-categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subCategoryData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: SUB_CATEGORIES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update sub category");
        return;
      }

      dispatch({ type: UPDATE_SUB_CATEGORY_SUCCESS, payload: data.data });
      toast.success(data.message || "Sub category updated successfully");
      onSuccess?.();

      await dispatch(fetchSubCategories() as any);
    } catch {
      dispatch({ type: SUB_CATEGORIES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const deleteSubCategoryAction = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_SUB_CATEGORY_LOADING });
  try {
    const res = await fetch(`/api/admin/sub-categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: SUB_CATEGORIES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to delete sub category");
      return;
    }

    dispatch({ type: DELETE_SUB_CATEGORY_SUCCESS, payload: id });
    toast.success(data.message || "Sub category deleted successfully");

    await dispatch(fetchSubCategories() as any);
  } catch {
    dispatch({ type: SUB_CATEGORIES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const setSelectedSubCategory = (subCategory: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_SUB_CATEGORY, payload: subCategory });
};

export const clearSubCategoriesError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_SUB_CATEGORIES_ERROR });
};
