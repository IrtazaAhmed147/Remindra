import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  authChecked: false,
  authLoading: false,
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // LOGIN
    loginStart: (state) => {
      state.authLoading = true;
      state.authError = null;
    },

    loginSuccess: (state, { payload }) => {
      state.authLoading = false;
      state.user = payload;
      state.isAuthenticated = true;
      state.authError = null;
    },

    loginFailure: (state, action) => {
      state.authLoading = false;
      state.authError = action.payload;
    },

    // LOAD USER (token valid)
    loadUserStart: (state) => {
      state.authLoading = true;
    },

    loadUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.authLoading = false;
      state.authChecked = true;
    },

    loadUserFailure: (state) => {
      state.authLoading = false;
      state.isAuthenticated = false;
      state.authChecked = true;
    },

    // LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    // OTP / SIGNUP
    otpSuccess: (state) => {
      state.authLoading = false;
      state.authError = null;
    },

    signupStart: (state) => {
      state.authLoading = true;
      state.authError = null;
    },

    signupSuccess: (state) => {
      state.authLoading = false;
    },

    signupFailure: (state, action) => {
      state.authLoading = false;
      state.authError = action.payload;
    },
    userReset: (state, action) => {
      state.authLoading = false;
      state.user = null
      state.token = null
      state.isAuthenticated = false

    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  otpSuccess,
  loadUserStart,
  loadUserSuccess,
  loadUserFailure,
  logout,
  userReset
} = authSlice.actions;

export default authSlice.reducer;
