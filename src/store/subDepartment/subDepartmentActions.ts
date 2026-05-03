import { Dispatch } from "redux";
import { toast } from "react-toastify";

// Action Types
export const SUBDEPARTMENT_LOADING = "SUBDEPARTMENT_LOADING";
export const SUBDEPARTMENT_ERROR = "SUBDEPARTMENT_ERROR";
export const GET_SUBDEPARTMENTS_SUCCESS = "GET_SUBDEPARTMENTS_SUCCESS";
export const CREATE_SUBDEPARTMENT_SUCCESS = "CREATE_SUBDEPARTMENT_SUCCESS";
export const UPDATE_SUBDEPARTMENT_SUCCESS = "UPDATE_SUBDEPARTMENT_SUCCESS";
export const DELETE_SUBDEPARTMENT_SUCCESS = "DELETE_SUBDEPARTMENT_SUCCESS";

// Get all sub departments
export const getSubDepartmentsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: SUBDEPARTMENT_LOADING });
  try {
    const res = await fetch("/api/admin/sub-department", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: SUBDEPARTMENT_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch sub departments");
      return;
    }

    dispatch({ type: GET_SUBDEPARTMENTS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: SUBDEPARTMENT_ERROR, payload: "Something went wrong" });
    toast.error("Failed to fetch sub departments");
  }
};

// Create sub department
export const createSubDepartmentAction =
  (subDepartmentData: any) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/api/admin/sub-department", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(subDepartmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create sub department");
        return false;
      }

      dispatch({ type: CREATE_SUBDEPARTMENT_SUCCESS, payload: data.data });
      toast.success(data.message || "Sub department created successfully");
      return true;
    } catch (error) {
      toast.error("Failed to create sub department");
      return false;
    }
  };

// Update sub department
export const updateSubDepartmentAction =
  (id: string, subDepartmentData: any) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/api/admin/sub-department/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(subDepartmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update sub department");
        return false;
      }

      dispatch({ type: UPDATE_SUBDEPARTMENT_SUCCESS, payload: data.data });
      toast.success(data.message || "Sub department updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update sub department");
      return false;
    }
  };

// Delete sub department
export const deleteSubDepartmentAction =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/api/admin/sub-department/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete sub department");
        return;
      }

      dispatch({ type: DELETE_SUBDEPARTMENT_SUCCESS, payload: id });
      toast.success(data.message || "Sub department deleted successfully");
    } catch (error) {
      toast.error("Failed to delete sub department");
    }
  };
