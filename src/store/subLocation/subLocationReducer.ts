import {
  SUBLOCATION_LOADING,
  SUBLOCATION_ERROR,
  GET_SUBLOCATIONS_SUCCESS,
  CREATE_SUBLOCATION_SUCCESS,
  UPDATE_SUBLOCATION_SUCCESS,
  DELETE_SUBLOCATION_SUCCESS,
} from "./subLocationActions";

export type SubLocation = {};

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
    default:
      return state;
  }
};

export default subLocationReducer;
