import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],        // all Notifications
    notificationLoading: false,
    notificationFetchLoading: false,
    notificationError: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

        fetchNotificationStart: (state) => {
            state.notificationFetchLoading = true;
            state.notificationError = null;
        },
        fetchNotificationSuccess: (state, { payload }) => {
            state.notificationFetchLoading = false;
            state.notifications = payload;
        },
        fetchNotificationFailure: (state, action) => {
            state.notificationFetchLoading = false;
            state.notificationError = action.payload;
        },

      

        // CLEAR Notification STATE
       
    }
});

export const {
    fetchNotificationStart,
    fetchNotificationSuccess,
    fetchNotificationFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;
