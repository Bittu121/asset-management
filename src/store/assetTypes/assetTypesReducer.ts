import {
  ASSET_TYPES_LOADING,
  ASSET_TYPES_SUCCESS,
  ASSET_TYPES_ERROR,
  CREATE_ASSET_TYPE_LOADING,
  CREATE_ASSET_TYPE_SUCCESS,
  UPDATE_ASSET_TYPE_LOADING,
  UPDATE_ASSET_TYPE_SUCCESS,
  DELETE_ASSET_TYPE_LOADING,
  DELETE_ASSET_TYPE_SUCCESS,
  SET_SELECTED_ASSET_TYPE,
  CLEAR_ASSET_TYPES_ERROR,
} from "./assetTypesActions";
import { AssetTypesState } from "./assetTypesTypes";

const initialState: AssetTypesState = {
  assetTypes: [],
  selectedAssetType: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

type Action = { type: string; payload?: any };

const assetTypesReducer = (
  state = initialState,
  action: Action,
): AssetTypesState => {
  switch (action.type) {
    case ASSET_TYPES_LOADING:
      return { ...state, loading: true, error: null };

    case ASSET_TYPES_SUCCESS:
      return { ...state, loading: false, assetTypes: action.payload };

    case ASSET_TYPES_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case CREATE_ASSET_TYPE_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_ASSET_TYPE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        assetTypes: [action.payload, ...state.assetTypes],
      };

    case UPDATE_ASSET_TYPE_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_ASSET_TYPE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        assetTypes: state.assetTypes.map((at) =>
          at._id === action.payload._id ? action.payload : at,
        ),
      };

    case DELETE_ASSET_TYPE_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_ASSET_TYPE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        assetTypes: state.assetTypes.filter((at) => at._id !== action.payload),
      };

    case SET_SELECTED_ASSET_TYPE:
      return { ...state, selectedAssetType: action.payload };

    case CLEAR_ASSET_TYPES_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default assetTypesReducer;
