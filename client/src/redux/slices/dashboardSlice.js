import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: {},
  statsLoading: false,
  statsError: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {

    // LOGIN
    dashboardStatsStart: (state) => {
      state.statsLoading = true;
      state.statsError = null;
    },

    dashboardStatsSuccess: (state, { payload }) => {
      state.statsLoading = false;
      state.stats = payload;
      state.statsError = null;
    },

    dashboardStatsFailure: (state, action) => {
      state.statsLoading = false;
      state.statsError = action.payload;
    },

  },
});

export const {
  dashboardStatsStart,
  dashboardStatsSuccess,
  dashboardStatsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
