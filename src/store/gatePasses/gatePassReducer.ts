import {
  GATE_PASSES_LOADING,
  GATE_PASSES_SUCCESS,
  GATE_PASSES_ERROR,
  CREATE_GATE_PASS_LOADING,
  CREATE_GATE_PASS_SUCCESS,
  UPDATE_GATE_PASS_LOADING,
  UPDATE_GATE_PASS_SUCCESS,
} from "./gatePassActions";
import { GatePassState } from "./gatePassTypes";

const initialState: GatePassState = {
  gatePasses: [],
  loading: false,
  createLoading: false,
  updateLoading: false,
  error: null,
};

export default function gatePassReducer(
  state = initialState,
  action: { type: string; payload?: any }
): GatePassState {
  switch (action.type) {
    case GATE_PASSES_LOADING:
      return { ...state, loading: true, error: null };
    case GATE_PASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        gatePasses: action.payload,
        error: null,
      };
    case GATE_PASSES_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        error: action.payload,
      };

    // Creating a new gate pass
    case CREATE_GATE_PASS_LOADING:
      return { ...state, createLoading: true, error: null };
    case CREATE_GATE_PASS_SUCCESS:
      return { ...state, createLoading: false, error: null };

    // Updating gate pass status (approve / reject / issue / return)
    case UPDATE_GATE_PASS_LOADING:
      return { ...state, updateLoading: true, error: null };
    case UPDATE_GATE_PASS_SUCCESS:
      return { ...state, updateLoading: false, error: null };

    default:
      return state;
  }
}
