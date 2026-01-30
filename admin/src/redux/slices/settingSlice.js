import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationPermission: null, // single setting detail
    notificationLoading: false,
    // invitationFetchLoading: false,
    error: null,
};

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {

        fetchPermissionStart: (state) => {
            state.notificationLoading = true;
            state.error = null;
        },
        fetchPermissionSuccess: (state, { payload }) => {
            state.notificationLoading = false;
            state.notificationPermission = payload;
        },
        fetchPermissionFailure: (state, action) => {
            state.notificationLoading = false;
            state.error = action.payload;
        },

    }
});

export const {
    fetchPermissionStart,
    fetchPermissionSuccess,
    fetchPermissionFailure,
} = settingSlice.actions;

export default settingSlice.reducer;
