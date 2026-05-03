import {
  SUBDEPARTMENT_LOADING,
  SUBDEPARTMENT_ERROR,
  GET_SUBDEPARTMENTS_SUCCESS,
  CREATE_SUBDEPARTMENT_SUCCESS,
  UPDATE_SUBDEPARTMENT_SUCCESS,
  DELETE_SUBDEPARTMENT_SUCCESS,
} from "./subDepartmentActions";

export type SubDepartment = {
  _id: string;
  subDepartmentName: string;
  departmentId: string;
  departmentName: string;
  manager?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
};

type SubDepartmentState = {
  subDepartments: SubDepartment[];
  loading: boolean;
  error: string | null;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: SubDepartmentState = {
  subDepartments: [],
  loading: false,
  error: null,
};

const subDepartmentReducer = (
  state = initialState,
  action: Action,
): SubDepartmentState => {
  switch (action.type) {
    case SUBDEPARTMENT_LOADING:
      return { ...state, loading: true, error: null };

    case SUBDEPARTMENT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_SUBDEPARTMENTS_SUCCESS:
      return { ...state, loading: false, subDepartments: action.payload };

    case CREATE_SUBDEPARTMENT_SUCCESS:
      return {
        ...state,
        subDepartments: [action.payload, ...state.subDepartments],
      };

    case UPDATE_SUBDEPARTMENT_SUCCESS:
      return {
        ...state,
        subDepartments: state.subDepartments.map((dept) =>
          dept._id === action.payload._id ? action.payload : dept,
        ),
      };

    case DELETE_SUBDEPARTMENT_SUCCESS:
      return {
        ...state,
        subDepartments: state.subDepartments.filter(
          (dept) => dept._id !== action.payload,
        ),
      };

    default:
      return state;
  }
};

export default subDepartmentReducer;
