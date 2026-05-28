import {
  LOCATION_LOADING,
  LOCATION_ERROR,
  GET_LOCATIONS_SUCCESS,
  CREATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_SUCCESS,
  DELETE_LOCATION_SUCCESS,
} from "./locationActions";

export type Location = {
  _id: string;
  locationName: string;
  address: string;
  city: string;
  isActive: boolean;
  createdAt: string;
};

type LocationState = {
  locations: Location[];
  loading: boolean;
  error: string | null;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null,
};

const locationReducer = (state = initialState, action: Action): LocationState => {
  switch (action.type) {
    case LOCATION_LOADING:
      return { ...state, loading: true, error: null };

    case LOCATION_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_LOCATIONS_SUCCESS:
      return { ...state, loading: false, locations: action.payload };

    case CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: [action.payload, ...state.locations],
      };

    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: state.locations.map((loc) =>
          loc._id === action.payload._id ? action.payload : loc
        ),
      };

    case DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: state.locations.filter((loc) => loc._id !== action.payload),
      };

    default:
      return state;
  }
};

export default locationReducer;
