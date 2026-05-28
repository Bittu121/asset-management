import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const SUPPORT_GROUPS_LOADING = "SUPPORT_GROUPS_LOADING";
export const SUPPORT_GROUPS_SUCCESS = "SUPPORT_GROUPS_SUCCESS";
export const SUPPORT_GROUPS_ERROR = "SUPPORT_GROUPS_ERROR";
export const CREATE_SUPPORT_GROUP_LOADING = "CREATE_SUPPORT_GROUP_LOADING";
export const CREATE_SUPPORT_GROUP_SUCCESS = "CREATE_SUPPORT_GROUP_SUCCESS";
export const UPDATE_SUPPORT_GROUP_LOADING = "UPDATE_SUPPORT_GROUP_LOADING";
export const UPDATE_SUPPORT_GROUP_SUCCESS = "UPDATE_SUPPORT_GROUP_SUCCESS";
export const DELETE_SUPPORT_GROUP_LOADING = "DELETE_SUPPORT_GROUP_LOADING";
export const DELETE_SUPPORT_GROUP_SUCCESS = "DELETE_SUPPORT_GROUP_SUCCESS";
export const SET_SELECTED_SUPPORT_GROUP = "SET_SELECTED_SUPPORT_GROUP";
export const CLEAR_SUPPORT_GROUPS_ERROR = "CLEAR_SUPPORT_GROUPS_ERROR";
export const ADD_MEMBER_LOADING = "ADD_MEMBER_LOADING";
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";
export const REMOVE_MEMBER_LOADING = "REMOVE_MEMBER_LOADING";
export const REMOVE_MEMBER_SUCCESS = "REMOVE_MEMBER_SUCCESS";

export const fetchSupportGroups = () => async (dispatch: Dispatch) => {
  dispatch({ type: SUPPORT_GROUPS_LOADING });
  try {
    const res = await fetch("/api/admin/support-groups", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: SUPPORT_GROUPS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch support groups");
      return;
    }

    dispatch({ type: SUPPORT_GROUPS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: SUPPORT_GROUPS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const createSupportGroupAction =
  (groupData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_SUPPORT_GROUP_LOADING });
    try {
      const res = await fetch("/api/admin/support-groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: SUPPORT_GROUPS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to create support group");
        return;
      }

      dispatch({ type: CREATE_SUPPORT_GROUP_SUCCESS, payload: data.data });
      toast.success(data.message || "Support group created successfully");
      onSuccess?.();

      await dispatch(fetchSupportGroups() as any);
    } catch (error) {
      dispatch({ type: SUPPORT_GROUPS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const updateSupportGroupAction =
  (id: string, groupData: any, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_SUPPORT_GROUP_LOADING });
    try {
      const res = await fetch(`/api/admin/support-groups/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: SUPPORT_GROUPS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to update support group");
        return;
      }

      dispatch({ type: UPDATE_SUPPORT_GROUP_SUCCESS, payload: data.data });
      toast.success(data.message || "Support group updated successfully");
      onSuccess?.();

      await dispatch(fetchSupportGroups() as any);
    } catch (error) {
      dispatch({ type: SUPPORT_GROUPS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const deleteSupportGroupAction = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_SUPPORT_GROUP_LOADING });
  try {
    const res = await fetch(`/api/admin/support-groups/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: SUPPORT_GROUPS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to delete support group");
      return;
    }

    dispatch({ type: DELETE_SUPPORT_GROUP_SUCCESS, payload: id });
    toast.success(data.message || "Support group deleted successfully");

    await dispatch(fetchSupportGroups() as any);
  } catch (error) {
    dispatch({ type: SUPPORT_GROUPS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};

export const addMemberAction =
  (groupId: string, userId: string, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_MEMBER_LOADING });
    try {
      const res = await fetch(`/api/admin/support-groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: SUPPORT_GROUPS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to add member");
        return;
      }

      dispatch({ type: ADD_MEMBER_SUCCESS, payload: { groupId, userId } });
      toast.success("Member added successfully");
      onSuccess?.();
    } catch (error) {
      dispatch({ type: SUPPORT_GROUPS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const removeMemberAction =
  (groupId: string, userId: string, onSuccess?: () => void) => async (dispatch: Dispatch) => {
    dispatch({ type: REMOVE_MEMBER_LOADING, payload: userId });
    try {
      const res = await fetch(`/api/admin/support-groups/${groupId}/members/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: SUPPORT_GROUPS_ERROR, payload: data.message });
        toast.error(data.message || "Failed to remove member");
        return;
      }

      dispatch({ type: REMOVE_MEMBER_SUCCESS, payload: { groupId, userId } });
      toast.success("Member removed successfully");
      onSuccess?.();
    } catch (error) {
      dispatch({ type: SUPPORT_GROUPS_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

export const setSelectedSupportGroup = (group: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_SUPPORT_GROUP, payload: group });
};

export const clearSupportGroupsError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_SUPPORT_GROUPS_ERROR });
};
