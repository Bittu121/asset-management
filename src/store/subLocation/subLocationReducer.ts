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

type SubLocationState = {};

type Action = {
  type: string;
  payload?: any;
};

const initialState: SubLocationState = {
  subLocations: [],
  loading: false,
  error: null,
};

const subLocationReducer = (
  state = initialState,
  action: Action,
): SubLocationState => {
  switch (action.type) {
    case SUBLOCATION_LOADING:
    case SUBLOCATION_ERROR:
    case GET_SUBLOCATIONS_SUCCESS:
    case CREATE_SUBLOCATION_SUCCESS:
    case UPDATE_SUBLOCATION_SUCCESS:
    case DELETE_SUBLOCATION_SUCCESS:
    default:
      return state;
  }
};

export default subLocationReducer;
