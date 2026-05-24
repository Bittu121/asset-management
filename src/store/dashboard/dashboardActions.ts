import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const DASHBOARD_LOADING = "DASHBOARD_LOADING";
export const DASHBOARD_SUCCESS = "DASHBOARD_SUCCESS";
export const DASHBOARD_ERROR = "DASHBOARD_ERROR";

export const fetchDashboard = () => async (dispatch: Dispatch) => {
  dispatch({ type: DASHBOARD_LOADING });
  try {
    const res = await fetch("/api/dashboard", { credentials: "include" });
    const data = await res.json();
    if (!res.ok) {
      dispatch({ type: DASHBOARD_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch dashboard data");
      return;
    }
    dispatch({ type: DASHBOARD_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: DASHBOARD_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong fetching dashboard");
  }
};
