import {
  VENDORS_LOADING,
  VENDORS_SUCCESS,
  VENDORS_ERROR,
  CREATE_VENDOR_LOADING,
  CREATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_LOADING,
  UPDATE_VENDOR_SUCCESS,
  DELETE_VENDOR_LOADING,
  DELETE_VENDOR_SUCCESS,
} from "./vendorActions";
import { VendorState } from "./vendorTypes";

const initialState: VendorState = {
  vendors: [],
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

type Action = { type: string; payload?: any };

const vendorReducer = (state = initialState, action: Action): VendorState => {
  switch (action.type) {
    case VENDORS_LOADING:
      return { ...state, loading: true, error: null };

    case VENDORS_SUCCESS:
      return { ...state, loading: false, vendors: action.payload };

    case VENDORS_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case CREATE_VENDOR_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_VENDOR_SUCCESS:
      return {
        ...state,
        createLoading: false,
        vendors: [action.payload, ...state.vendors],
      };

    case UPDATE_VENDOR_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_VENDOR_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        vendors: state.vendors.map((v) =>
          v._id === action.payload._id ? action.payload : v,
        ),
      };

    case DELETE_VENDOR_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        vendors: state.vendors.filter((v) => v._id !== action.payload),
      };

    default:
      return state;
  }
};

export default vendorReducer;
