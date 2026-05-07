import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { AuthUser } from "./authTypes";

export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const FORGOT_LOADING = "FORGOT_LOADING";
export const FORGOT_SUCCESS = "FORGOT_SUCCESS";
export const OTP_LOADING = "OTP_LOADING";
export const OTP_SUCCESS = "OTP_SUCCESS";
export const RESET_LOADING = "RESET_LOADING";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const SET_OTP_EMAIL = "SET_OTP_EMAIL";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const CHECK_SESSION = "CHECK_SESSION";

const normalizeUser = (user: any): AuthUser => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: typeof user.role === "string" ? user.role : user.role?.name || "",
    employeeCode: user.employeeCode,
    permissions: user.permissions || user.role?.permissions || [],
  };
};

export const loginAction =
  (email: string, password: string, router: any) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: AUTH_LOADING });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({
          type: AUTH_ERROR,
          payload: data.message || "Login failed",
        });
        toast.error(data.message || "Login failed");
        return;
      }

      const user = normalizeUser(data.data.user);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user },
      });

      toast.success(data.message || "Login successful");

      const role = user.role.toLowerCase();

      if (role === "admin" || role === "manager") {
        await router.push("/admin");
      } else if (role === "technician") {
        await router.push("/technician");
      } else {
        await router.push("/end-user");
      }
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Something went wrong",
      });
      toast.error("Something went wrong");
    }
  };

export const checkSession = () => async (dispatch: Dispatch) => {
  dispatch({ type: CHECK_SESSION });

  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: LOGOUT });
      return;
    }

    const rawUser = data.user || data.data?.user;

    if (!rawUser) {
      dispatch({ type: LOGOUT });
      return;
    }

    const user = normalizeUser(rawUser);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    dispatch({ type: LOGOUT });
  }
};

export const logoutAction = (router: any) => async (dispatch: Dispatch) => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    dispatch({ type: LOGOUT });
    toast.success("Logged out successfully");
    await router.push("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};

export const forgotPasswordAction =
  (email: string, router: any) => async (dispatch: Dispatch) => {
    dispatch({ type: FORGOT_LOADING });

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({
          type: AUTH_ERROR,
          payload: data.message || "Email not found",
        });
        toast.error(data.message || "Email not found");
        return;
      }

      dispatch({
        type: SET_OTP_EMAIL,
        payload: email,
      });

      dispatch({ type: FORGOT_SUCCESS });

      toast.success(data.message || "OTP sent to your email");
      router.push("/verify-otp");
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Something went wrong",
      });
      toast.error("Something went wrong");
    }
  };

export const verifyOtpAction =
  (email: string, otp: string, router: any) => async (dispatch: Dispatch) => {
    dispatch({ type: OTP_LOADING });

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({
          type: AUTH_ERROR,
          payload: data.message || "Invalid OTP",
        });
        toast.error(data.message || "Invalid OTP");
        return;
      }

      dispatch({ type: OTP_SUCCESS });

      toast.success(data.message || "OTP verified successfully");
      router.push("/reset-password");
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Something went wrong",
      });
      toast.error("Something went wrong");
    }
  };

export const resetPasswordAction =
  (email: string, password: string, router: any) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: RESET_LOADING });

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({
          type: AUTH_ERROR,
          payload: data.message || "Reset failed",
        });
        toast.error(data.message || "Reset failed");
        return;
      }

      dispatch({ type: RESET_SUCCESS });

      toast.success(data.message || "Password reset successfully");
      router.push("/login");
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Something went wrong",
      });
      toast.error("Something went wrong");
    }
  };

export const resendOtpAction =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to resend OTP");
        return;
      }

      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

export const clearError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
