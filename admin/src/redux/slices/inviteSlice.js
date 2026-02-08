import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invitations: [],        // all Invites
    singleInvite: null, // single Invite detail
    invitationLoading: false,
    invitationFetchLoading: false,
    invitationError: null,
};

const inviteSlice = createSlice({
    name: "invite",
    initialState,
    reducers: {

        fetchInviteStart: (state) => {
            state.invitationFetchLoading = true;
            state.invitationError = null;
        },
        fetchInviteSuccess: (state, { payload }) => {
            state.invitationFetchLoading = false;
            state.invitations = payload;
        },
        fetchInviteFailure: (state, action) => {
            state.invitationFetchLoading = false;
            state.invitationError = action.payload;
        },

        // FETCH SINGLE Invite
        updateInviteStart: (state) => {
            state.invitationLoading = true;
            state.invitationError = null;
        },
        updateInviteSuccess: (state, { payload }) => {
            state.invitationLoading = false;
            // state.singleInvite = payload;
        },
        updateInviteFailure: (state, action) => {
            state.invitationLoading = false;
            state.invitationError = action.payload;
        },

        // CREATE Invite
        createInvitetart: (state) => {
            state.invitationFetchLoading = true;
            state.invitationError = null;
        },
        createInviteuccess: (state, { payload }) => {
            state.invitationFetchLoading = false;
            state.invitations.push(payload);
        },
        createInviteFailure: (state, action) => {
            state.invitationFetchLoading = false;
            state.invitationError = action.payload;
        },

        // CLEAR Invite STATE
        clearInvitesetate: (state) => {
            state.singleInvite = null;
            state.invitationError = null;
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
