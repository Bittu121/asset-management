import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const USERS_LOADING = "USERS_LOADING";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_ERROR = "USERS_ERROR";
export const CREATE_USER_LOADING = "CREATE_USER_LOADING";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const UPDATE_USER_LOADING = "UPDATE_USER_LOADING";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const DELETE_USER_LOADING = "DELETE_USER_LOADING";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const CLEAR_USERS_ERROR = "CLEAR_USERS_ERROR";

export const fetchUserAccounts = () => async (dispatch: Dispatch) => {
  dispatch({ type: USERS_LOADING });
  try {
    const res = await fetch("/api/admin/user-account", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: USERS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch users");
      return;
    }

    dispatch({ type: USERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USERS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createUserAccountAction =
  (userData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_USER_LOADING });
    try {
      const res = await fetch("/api/admin/user-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: USERS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create user");
        return;
      }

      dispatch({ type: CREATE_USER_SUCCESS, payload: data.data });
      toast.success(data.message || "User created successfully");
      onSuccess?.();

      await dispatch(fetchUserAccounts() as any);
    } catch (error) {
      dispatch({ type: USERS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const updateUserAccountAction =
  (id: string, userData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING });
    try {
      const res = await fetch(`/api/admin/user-account/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: USERS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update user");
        return;
      }

      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.data });
      toast.success(data.message || "User updated successfully");
      onSuccess?.();

      await dispatch(fetchUserAccounts() as any);
    } catch (error) {
      dispatch({ type: USERS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const deleteUserAccountAction = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_USER_LOADING });
  try {
    const res = await fetch(`/api/admin/user-account/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: USERS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to delete user");
      return;
    }

    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    toast.success(data.message || "User deleted successfully");

    await dispatch(fetchUserAccounts() as any);
  } catch (error) {
    dispatch({ type: USERS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const setSelectedUser = (user: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_USER, payload: user });
};

export const clearUsersError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_USERS_ERROR });
};
