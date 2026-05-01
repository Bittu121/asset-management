export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  employeeCode: string;
};

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  otpEmail: string;
  forgotLoading: boolean;
  otpLoading: boolean;
  resetLoading: boolean;
};
