import {
  SUB_CATEGORIES_LOADING,
  SUB_CATEGORIES_SUCCESS,
  SUB_CATEGORIES_ERROR,
  CREATE_SUB_CATEGORY_LOADING,
  CREATE_SUB_CATEGORY_SUCCESS,
  UPDATE_SUB_CATEGORY_LOADING,
  UPDATE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_LOADING,
  DELETE_SUB_CATEGORY_SUCCESS,
  SET_SELECTED_SUB_CATEGORY,
  CLEAR_SUB_CATEGORIES_ERROR,
} from "./subCategoriesActions";
import { SubCategoriesState } from "./subCategoriesTypes";

const initialState: SubCategoriesState = {
  subCategories: [],
  selectedSubCategory: null,
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

const subCategoriesReducer = (
  state = initialState,
  action: Action,
): SubCategoriesState => {
  switch (action.type) {
    case SUB_CATEGORIES_LOADING:
      return { ...state, loading: true, error: null };

    case SUB_CATEGORIES_SUCCESS:
      return { ...state, loading: false, subCategories: action.payload };

    case SUB_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case CREATE_SUB_CATEGORY_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        createLoading: false,
        subCategories: [action.payload, ...state.subCategories],
      };

    case UPDATE_SUB_CATEGORY_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        subCategories: state.subCategories.map((sc) =>
          sc._id === action.payload._id ? action.payload : sc,
        ),
      };

    case DELETE_SUB_CATEGORY_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        subCategories: state.subCategories.filter(
          (sc) => sc._id !== action.payload,
        ),
      };

    case SET_SELECTED_SUB_CATEGORY:
      return { ...state, selectedSubCategory: action.payload };

    case CLEAR_SUB_CATEGORIES_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default subCategoriesReducer;
