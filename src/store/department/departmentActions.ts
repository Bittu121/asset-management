import { Dispatch } from "redux";
import { toast } from "react-toastify";

// Action Types
export const DEPARTMENT_LOADING = "DEPARTMENT_LOADING";
export const DEPARTMENT_ERROR = "DEPARTMENT_ERROR";
export const GET_DEPARTMENTS_SUCCESS = "GET_DEPARTMENTS_SUCCESS";
export const CREATE_DEPARTMENT_SUCCESS = "CREATE_DEPARTMENT_SUCCESS";
export const UPDATE_DEPARTMENT_SUCCESS = "UPDATE_DEPARTMENT_SUCCESS";
export const DELETE_DEPARTMENT_SUCCESS = "DELETE_DEPARTMENT_SUCCESS";

// Get all departments
export const getDepartmentsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: DEPARTMENT_LOADING });
  try {
    const res = await fetch("/api/admin/department", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: DEPARTMENT_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch departments");
      return;
    }

    dispatch({ type: GET_DEPARTMENTS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: DEPARTMENT_ERROR, payload: "Something went wrong" });
    toast.error("Failed to fetch departments");
  }
};

// Create department
export const createDepartmentAction =
  (departmentData: any) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/api/admin/department", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(departmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create department");
        return false;
      }

      dispatch({ type: CREATE_DEPARTMENT_SUCCESS, payload: data.data });
      toast.success(data.message || "Department created successfully");
      return true;
    } catch (error) {
      toast.error("Failed to create department");
      return false;
    }
  };

// Update department
export const updateDepartmentAction =
  (id: string, departmentData: any) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/api/admin/department/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(departmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update department");
        return false;
      }

      dispatch({ type: UPDATE_DEPARTMENT_SUCCESS, payload: data.data });
      toast.success(data.message || "Department updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update department");
      return false;
    }
  };

// Delete department
export const deleteDepartmentAction =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/api/admin/department/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete department");
        return;
      }

      dispatch({ type: DELETE_DEPARTMENT_SUCCESS, payload: id });
      toast.success(data.message || "Department deleted successfully");
    } catch (error) {
      toast.error("Failed to delete department");
    }
  };
