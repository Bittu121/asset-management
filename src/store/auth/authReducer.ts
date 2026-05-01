import {
  AUTH_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  FORGOT_LOADING,
  FORGOT_SUCCESS,
  OTP_LOADING,
  OTP_SUCCESS,
  RESET_LOADING,
  RESET_SUCCESS,
  SET_OTP_EMAIL,
  CLEAR_ERROR,
  CHECK_SESSION,
} from "./authActions";
import { AuthState } from "./authTypes";

type Action = {
  type: string;
  payload?: any;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  otpEmail: "",
  forgotLoading: false,
  otpLoading: false,
  resetLoading: false,
};

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case CHECK_SESSION:
      return { ...state, loading: true };

    case AUTH_LOADING:
      return { ...state, loading: true, error: null };

    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        forgotLoading: false,
        otpLoading: false,
        resetLoading: false,
        error: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        error: null,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    case SET_OTP_EMAIL:
      return { ...state, otpEmail: action.payload };

    case FORGOT_LOADING:
      return { ...state, forgotLoading: true, error: null };

    case FORGOT_SUCCESS:
      return { ...state, forgotLoading: false };

    case OTP_LOADING:
      return { ...state, otpLoading: true, error: null };

    case OTP_SUCCESS:
      return { ...state, otpLoading: false };

    case RESET_LOADING:
      return { ...state, resetLoading: true, error: null };

    case RESET_SUCCESS:
      return { ...state, resetLoading: false, otpEmail: "" };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default authReducer;
