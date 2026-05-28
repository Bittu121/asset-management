import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const ROLES_LOADING = "ROLES_LOADING";
export const ROLES_SUCCESS = "ROLES_SUCCESS";
export const ROLES_ERROR = "ROLES_ERROR";
export const CREATE_ROLE_LOADING = "CREATE_ROLE_LOADING";
export const CREATE_ROLE_SUCCESS = "CREATE_ROLE_SUCCESS";
export const UPDATE_ROLE_LOADING = "UPDATE_ROLE_LOADING";
export const UPDATE_ROLE_SUCCESS = "UPDATE_ROLE_SUCCESS";
export const DELETE_ROLE_LOADING = "DELETE_ROLE_LOADING";
export const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS";
export const SET_SELECTED_ROLE = "SET_SELECTED_ROLE";
export const CLEAR_ROLES_ERROR = "CLEAR_ROLES_ERROR";

// Fetch all roles
export const fetchRoles = () => async (dispatch: Dispatch) => {
  dispatch({ type: ROLES_LOADING });
  try {
    const res = await fetch("/api/admin/roles", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ROLES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch roles");
      return;
    }

    dispatch({ type: ROLES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ROLES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

// Create role
export const createRoleAction =
  (roleData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_ROLE_LOADING });
    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roleData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ROLES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create role");
        return;
      }

      dispatch({ type: CREATE_ROLE_SUCCESS, payload: data.data });
      toast.success(data.message || "Role created successfully");
      onSuccess?.();

      // Refresh roles list
      await dispatch(fetchRoles() as any);
    } catch (error) {
      dispatch({ type: ROLES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Update role
export const updateRoleAction =
  (id: string, roleData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_ROLE_LOADING });
    try {
      const res = await fetch(`/api/admin/roles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roleData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: ROLES_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update role");
        return;
      }

      dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data.data });
      toast.success(data.message || "Role updated successfully");
      onSuccess?.();

      // Refresh roles list
      await dispatch(fetchRoles() as any);
    } catch (error) {
      dispatch({ type: ROLES_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Delete role
export const deleteRoleAction = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_ROLE_LOADING });
  try {
    const res = await fetch(`/api/admin/roles/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: ROLES_ERROR, payload: data.message });
      toast.error(data.message || "Failed to delete role");
      return;
    }

    dispatch({ type: DELETE_ROLE_SUCCESS, payload: id });
    toast.success(data.message || "Role deleted successfully");

    // Refresh roles list
    await dispatch(fetchRoles() as any);
  } catch (error) {
    dispatch({ type: ROLES_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const setSelectedRole = (role: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_ROLE, payload: role });
};

export const clearRolesError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ROLES_ERROR });
};
