import api from "../../utils/common.js";
import { handleApiError } from "../../utils/HelperFunctions.js";
import {
    fetchInviteStart,
    fetchInviteSuccess,
    fetchInviteFailure,
    updateInviteStart,
    updateInviteSuccess,
    updateInviteFailure,
    createInvitetart,
    createInviteuccess,
    createInviteFailure,
} from "../slices/inviteSlice.js";

export const sendInviteAction = (receiverId, courseId) => async (dispatch) => {

    try {
        dispatch(createInvitetart());

        const token = localStorage.getItem("token");

        const res = await api.post(
            `/invite/send/${receiverId}/course/${courseId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );

        dispatch(createInviteuccess(res.data.data));
        return res.data.message;

    } catch (error) {

        handleApiError(error, dispatch, createInviteFailure);
    }
};


export const getAllInvitesAction = () => async (dispatch) => {
    try {
        dispatch(fetchInviteStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/invite/all`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchInviteSuccess(res.data.data));
        return res.data.data;

    } catch (error) {

        handleApiError(error, dispatch, fetchInviteFailure);
    }
};

export const getUserInvitesAction = () => async (dispatch) => {
    try {
        dispatch(fetchInviteStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/invite/`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchInviteSuccess(res.data.data));
        return res.data.data;

    } catch (error) {

        handleApiError(error, dispatch, fetchInviteFailure);
    }
};


export const updateInviteAction = (inviteId, status) => async (dispatch) => {
    try {
        dispatch(updateInviteStart());

        const token = localStorage.getItem("token");

        const res = await api.put(
            `/invite/${inviteId}`,
            status,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        dispatch(updateInviteSuccess());
        dispatch(getAllInvitesAction());

        return res.data.message;

    } catch (error) {

        handleApiError(error, dispatch, updateInviteFailure);
    }
};
