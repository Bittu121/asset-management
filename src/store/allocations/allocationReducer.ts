import {
  ALLOCATIONS_LOADING,
  ALLOCATIONS_SUCCESS,
  ALLOCATIONS_ERROR,
  CREATE_ALLOCATION_LOADING,
  CREATE_ALLOCATION_SUCCESS,
  RETURN_ALLOCATION_LOADING,
  RETURN_ALLOCATION_SUCCESS,
} from "./allocationActions";
import { AllocationState } from "./allocationTypes";

const initialState: AllocationState = {
  allocations: [],
  loading: false,
  createLoading: false,
  returnLoading: false,
  error: null,
};

type Action = { type: string; payload?: any };

export default function allocationReducer(
  state = initialState,
  action: Action,
): AllocationState {
  switch (action.type) {
    case ALLOCATIONS_LOADING:
      return { ...state, loading: true, error: null };

    case ALLOCATIONS_SUCCESS:
      return { ...state, loading: false, allocations: action.payload };

    case ALLOCATIONS_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        returnLoading: false,
        error: action.payload,
      };

    case CREATE_ALLOCATION_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_ALLOCATION_SUCCESS:
      return {
        ...state,
        createLoading: false,
        allocations: [action.payload, ...state.allocations],
      };

    case RETURN_ALLOCATION_LOADING:
      return { ...state, returnLoading: true, error: null };

    case RETURN_ALLOCATION_SUCCESS:
      return {
        ...state,
        returnLoading: false,
        // Replace the updated allocation in the list
        allocations: state.allocations.map((a) =>
          a._id === action.payload._id ? action.payload : a,
        ),
      };

    default:
      return state;
  }
}
