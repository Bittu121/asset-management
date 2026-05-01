import { Dispatch } from "redux";
import { toast } from "react-toastify";

// Action Types
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

// Login
export const loginAction =
  (email: string, password: string, router: any) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: AUTH_LOADING });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: AUTH_ERROR, payload: data.message });
        toast.error(data.message || "Login failed");
        return;
      }

      dispatch({ type: LOGIN_SUCCESS, payload: data.data });
      toast.success(data.message || "Login successful");

      // Redirect based on role
      const role = data.data.user.role.toLowerCase();
      if (role === "admin" || role === "manager") {
        router.push("/admin");
      } else if (role === "technician") {
        router.push("/technician");
      } else {
        router.push("/end-user");
      }
    } catch {
      dispatch({ type: AUTH_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Logout
export const logoutAction = (router: any) => async (dispatch: Dispatch) => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    dispatch({ type: LOGOUT });
    toast.success("Logged out successfully");
    router.push("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};

// Forgot password
export const forgotPasswordAction =
  (email: string, router: any) => async (dispatch: Dispatch) => {
    dispatch({ type: FORGOT_LOADING });
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: AUTH_ERROR, payload: data.message });
        toast.error(data.message || "Email not found");
        return;
      }

      // Save email for OTP verification
      dispatch({ type: SET_OTP_EMAIL, payload: email });
      dispatch({ type: FORGOT_SUCCESS });
      toast.success(data.message || "OTP sent to your email");
      router.push("/verify-otp");
    } catch {
      dispatch({ type: AUTH_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Verify OTP
export const verifyOtpAction =
  (email: string, otp: string, router: any) => async (dispatch: Dispatch) => {
    dispatch({ type: OTP_LOADING });
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: AUTH_ERROR, payload: data.message });
        toast.error(data.message || "Invalid OTP");
        return;
      }

      dispatch({ type: OTP_SUCCESS });
      toast.success(data.message || "OTP verified successfully");
      router.push("/reset-password");
    } catch {
      dispatch({ type: AUTH_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Reset password
export const resetPasswordAction =
  (email: string, password: string, router: any) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: RESET_LOADING });
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: AUTH_ERROR, payload: data.message });
        toast.error(data.message || "Reset failed");
        return;
      }

      dispatch({ type: RESET_SUCCESS });
      toast.success(data.message || "Password reset successfully");
      router.push("/login");
    } catch {
      dispatch({ type: AUTH_ERROR, payload: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

// Resend OTP
export const resendOtpAction =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to resend OTP");
        return;
      }

      toast.success("OTP resent successfully");
    } catch {
      toast.error("Something went wrong");
    }
  };

// Clear Error
export const clearError = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
