import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const REPORTS_LOADING = "REPORTS_LOADING";
export const REPORTS_SUCCESS = "REPORTS_SUCCESS";
export const REPORTS_ERROR = "REPORTS_ERROR";

export const fetchReports = () => async (dispatch: Dispatch) => {
  dispatch({ type: REPORTS_LOADING });
  try {
    const res = await fetch("/api/asset/reports", { credentials: "include" });
    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: REPORTS_ERROR, payload: data.message });
      toast.error(data.message || "Failed to fetch report data");
      return;
    }

    dispatch({ type: REPORTS_SUCCESS, payload: data.data });
  } catch {
    dispatch({ type: REPORTS_ERROR, payload: "Something went wrong" });
    toast.error("Something went wrong");
  }
};
