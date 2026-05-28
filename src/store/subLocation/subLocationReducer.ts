import {
  SUBLOCATION_LOADING,
  SUBLOCATION_ERROR,
  GET_SUBLOCATIONS_SUCCESS,
  CREATE_SUBLOCATION_SUCCESS,
  UPDATE_SUBLOCATION_SUCCESS,
  DELETE_SUBLOCATION_SUCCESS,
} from "./subLocationActions";

export type SubLocation = {
  _id: string;
  subLocationName: string;
  locationId: string;
  locationName: string;
  floor?: string;
  isActive: boolean;
  createdAt: string;
};

type SubLocationState = {
  subLocations: SubLocation[];
  loading: boolean;
  error: string | null;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: SubLocationState = {
  subLocations: [],
  loading: false,
  error: null,
};

const subLocationReducer = (state = initialState, action: Action): SubLocationState => {
  switch (action.type) {
    case SUBLOCATION_LOADING:
      return { ...state, loading: true, error: null };

    case SUBLOCATION_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_SUBLOCATIONS_SUCCESS:
      return { ...state, loading: false, subLocations: action.payload };

    case CREATE_SUBLOCATION_SUCCESS:
      return {
        ...state,
        subLocations: [action.payload, ...state.subLocations],
      };

    case UPDATE_SUBLOCATION_SUCCESS:
      return {
        ...state,
        subLocations: state.subLocations.map((loc) =>
          loc._id === action.payload._id ? action.payload : loc
        ),
      };

    case DELETE_SUBLOCATION_SUCCESS:
      return {
        ...state,
        subLocations: state.subLocations.filter((loc) => loc._id !== action.payload),
      };

    default:
      return state;
  }
};

export default subLocationReducer;
