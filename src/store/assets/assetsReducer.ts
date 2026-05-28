import {
  ASSETS_LOADING,
  ASSETS_SUCCESS,
  ASSETS_ERROR,
  CREATE_ASSET_LOADING,
  CREATE_ASSET_SUCCESS,
  UPDATE_ASSET_LOADING,
  UPDATE_ASSET_SUCCESS,
  DELETE_ASSET_LOADING,
  DELETE_ASSET_SUCCESS,
} from "./assetsActions";
import { AssetsState } from "./assetsTypes";

const initialState: AssetsState = {
  assets: [],
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

type Action = { type: string; payload?: any };

const assetsReducer = (state = initialState, action: Action): AssetsState => {
  switch (action.type) {
    case ASSETS_LOADING:
      return { ...state, loading: true, error: null };

    case ASSETS_SUCCESS:
      return { ...state, loading: false, assets: action.payload };

    case ASSETS_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case CREATE_ASSET_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_ASSET_SUCCESS:
      return {
        ...state,
        createLoading: false,
        assets: [action.payload, ...state.assets],
      };

    case UPDATE_ASSET_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_ASSET_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        assets: state.assets.map((a) => (a._id === action.payload._id ? action.payload : a)),
      };

    case DELETE_ASSET_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_ASSET_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        assets: state.assets.filter((a) => a._id !== action.payload),
      };

    default:
      return state;
  }
};

export default assetsReducer;
