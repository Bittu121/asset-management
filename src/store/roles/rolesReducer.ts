import {
  ROLES_LOADING,
  ROLES_SUCCESS,
  ROLES_ERROR,
  CREATE_ROLE_LOADING,
  CREATE_ROLE_SUCCESS,
  UPDATE_ROLE_LOADING,
  UPDATE_ROLE_SUCCESS,
  DELETE_ROLE_LOADING,
  DELETE_ROLE_SUCCESS,
  SET_SELECTED_ROLE,
  CLEAR_ROLES_ERROR,
} from "./rolesActions";
import { RolesState } from "./rolesTypes";

const initialState: RolesState = {
  roles: [],
  selectedRole: null,
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

const rolesReducer = (state = initialState, action: Action): RolesState => {
  switch (action.type) {
    case ROLES_LOADING:
      return { ...state, loading: true, error: null };

    case ROLES_SUCCESS:
      return { ...state, loading: false, roles: action.payload };

    case ROLES_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case CREATE_ROLE_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        roles: [action.payload, ...state.roles],
      };

    case UPDATE_ROLE_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        roles: state.roles.map((role) => (role._id === action.payload._id ? action.payload : role)),
      };

    case DELETE_ROLE_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        roles: state.roles.filter((role) => role._id !== action.payload),
      };

    case SET_SELECTED_ROLE:
      return { ...state, selectedRole: action.payload };

    case CLEAR_ROLES_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default rolesReducer;
