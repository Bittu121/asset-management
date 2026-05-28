import { REPORTS_LOADING, REPORTS_SUCCESS, REPORTS_ERROR } from "./reportActions";
import { ReportState } from "./reportTypes";

const initialState: ReportState = {
  data: null,
  loading: false,
  error: null,
};

type Action = { type: string; payload?: any };

export default function reportReducer(state = initialState, action: Action): ReportState {
  switch (action.type) {
    case REPORTS_LOADING:
      return { ...state, loading: true, error: null };

    case REPORTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case REPORTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
