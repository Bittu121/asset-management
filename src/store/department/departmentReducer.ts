import {
  DEPARTMENT_LOADING,
  DEPARTMENT_ERROR,
  GET_DEPARTMENTS_SUCCESS,
  CREATE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_SUCCESS,
} from "./departmentActions";

export type Department = {
  _id: string;
  departmentName: string;
  code: string;
  createdAt: string;
};

type DepartmentState = {
  departments: Department[];
  loading: boolean;
  error: string | null;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
};

const departmentReducer = (state = initialState, action: Action): DepartmentState => {
  switch (action.type) {
    case DEPARTMENT_LOADING:
      return { ...state, loading: true, error: null };

    case DEPARTMENT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_DEPARTMENTS_SUCCESS:
      return { ...state, loading: false, departments: action.payload };

    case CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: [action.payload, ...state.departments],
      };

    case UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.map((dept) =>
          dept._id === action.payload._id ? action.payload : dept
        ),
      };

    case DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter((dept) => dept._id !== action.payload),
      };

    default:
      return state;
  }
};

export default departmentReducer;
