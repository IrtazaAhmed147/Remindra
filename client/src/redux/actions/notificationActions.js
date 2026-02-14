import {  fetchNotificationFailure, fetchNotificationStart, fetchNotificationSuccess } from "../slices/notificationSlice";
import api from "../../utils/common.js";
import { handleApiError } from "../../utils/HelperFunctions.js";

export const getUserNotificationssAction = (userId) => async (dispatch) => {
    try {
        dispatch(fetchNotificationStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/notification/user`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        console.log(res);
        
        dispatch(fetchNotificationSuccess(res.data.data));
        return res.data.data;

    } catch (error) {

        handleApiError(error, dispatch, fetchNotificationFailure);
    }
};