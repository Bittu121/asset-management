import {
  DASHBOARD_LOADING,
  DASHBOARD_SUCCESS,
  DASHBOARD_ERROR,
} from "./dashboardActions";
import { DashboardState } from "./dashboardTypes";

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

type Action = { type: string; payload?: any };

export default function dashboardReducer(
  state = initialState,
  action: Action,
): DashboardState {
  switch (action.type) {
    case DASHBOARD_LOADING:
      return { ...state, loading: true, error: null };
    case DASHBOARD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DASHBOARD_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
