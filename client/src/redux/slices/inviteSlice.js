import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invitations: [],        // all Invites
    singleInvite: null, // single Invite detail
    invitationLoading: false,
    invitationFetchLoading: false,
    error: null,
};

const inviteSlice = createSlice({
    name: "invite",
    initialState,
    reducers: {

        fetchInviteStart: (state) => {
            state.invitationFetchLoading = true;
            state.error = null;
        },
        fetchInviteSuccess: (state, { payload }) => {
            state.invitationFetchLoading = false;
            state.invitations = payload;
        },
        fetchInviteFailure: (state, action) => {
            state.invitationFetchLoading = false;
            state.error = action.payload;
        },

        // FETCH SINGLE Invite
        updateInviteStart: (state) => {
            state.invitationLoading = true;
            state.error = null;
        },
        updateInviteSuccess: (state, { payload }) => {
            state.invitationLoading = false;
            // state.singleInvite = payload;
        },
        updateInviteFailure: (state, action) => {
            state.invitationLoading = false;
            state.error = action.payload;
        },

        // CREATE Invite
        createInvitetart: (state) => {
            state.invitationFetchLoading = true;
            state.error = null;
        },
        createInviteuccess: (state, { payload }) => {
            state.invitationFetchLoading = false;
            state.invitations.push(payload);
        },
        createInviteFailure: (state, action) => {
            state.invitationFetchLoading = false;
            state.error = action.payload;
        },

        // CLEAR Invite STATE
        clearInvitesetate: (state) => {
            state.singleInvite = null;
            state.error = null;
        }
    }
});

export const {
    fetchInviteStart,
    fetchInviteSuccess,
    fetchInviteFailure,
    updateInviteStart,
    updateInviteSuccess,
    updateInviteFailure,
    createInvitetart,
    createInviteuccess,
    createInviteFailure,
    clearInvitetate
} = inviteSlice.actions;

export default inviteSlice.reducer;
