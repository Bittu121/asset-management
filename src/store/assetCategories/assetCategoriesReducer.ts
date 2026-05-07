import {
  ASSET_CATEGORIES_LOADING,
  ASSET_CATEGORIES_SUCCESS,
  ASSET_CATEGORIES_ERROR,
  CREATE_ASSET_CATEGORY_LOADING,
  CREATE_ASSET_CATEGORY_SUCCESS,
  UPDATE_ASSET_CATEGORY_LOADING,
  UPDATE_ASSET_CATEGORY_SUCCESS,
  DELETE_ASSET_CATEGORY_LOADING,
  DELETE_ASSET_CATEGORY_SUCCESS,
  SET_SELECTED_ASSET_CATEGORY,
  CLEAR_ASSET_CATEGORIES_ERROR,
} from "./assetCategoriesActions";
import { AssetCategoriesState } from "./assetCategoriesTypes";

const initialState: AssetCategoriesState = {
  assetCategories: [],
  selectedAssetCategory: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

type Action = {
  type: string;
  payload?: any;
};

const assetCategoriesReducer = (
  state = initialState,
  action: Action,
): AssetCategoriesState => {
  switch (action.type) {
    case ASSET_CATEGORIES_LOADING:
      return { ...state, loading: true, error: null };

    case ASSET_CATEGORIES_SUCCESS:
      return { ...state, loading: false, assetCategories: action.payload };

    case ASSET_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case CREATE_ASSET_CATEGORY_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_ASSET_CATEGORY_SUCCESS:
      return {
        ...state,
        createLoading: false,
        assetCategories: [action.payload, ...state.assetCategories],
      };

    case UPDATE_ASSET_CATEGORY_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_ASSET_CATEGORY_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        assetCategories: state.assetCategories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat,
        ),
      };

    case DELETE_ASSET_CATEGORY_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_ASSET_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        assetCategories: state.assetCategories.filter(
          (cat) => cat._id !== action.payload,
        ),
      };

    case SET_SELECTED_ASSET_CATEGORY:
      return { ...state, selectedAssetCategory: action.payload };

    case CLEAR_ASSET_CATEGORIES_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default assetCategoriesReducer;
