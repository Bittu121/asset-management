import {
  USERS_LOADING,
  USERS_SUCCESS,
  USERS_ERROR,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  SET_SELECTED_USER,
  CLEAR_USERS_ERROR,
} from "./userAccountsActions";
import { UserAccountsState } from "./userAccountsTypes";

const initialState: UserAccountsState = {
  users: [],
  selectedUser: null,
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

const userAccountsReducer = (
  state = initialState,
  action: Action,
): UserAccountsState => {
  switch (action.type) {
    case USERS_LOADING:
      return { ...state, loading: true, error: null };

    case USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case USERS_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case CREATE_USER_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createLoading: false,
        users: [action.payload, ...state.users],
      };

    case UPDATE_USER_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        ),
      };

    case DELETE_USER_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload };

    case CLEAR_USERS_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default userAccountsReducer;
