import { fetchPermissionFailure, fetchPermissionStart, fetchPermissionSuccess } from "../slices/settingSlice";
import api from "../../utils/common.js";
import { handleApiError } from "../../utils/HelperFunctions.js";


export const subscribe = (userId,data) => async (dispatch) => {
    try {
        dispatch(fetchPermissionStart());

        const token = localStorage.getItem("token");

        const res = await api.post(
            `/notification/subscribe`,
            { subscription: data ,userId},
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );


        dispatch(fetchPermissionSuccess(res?.data?.data));
        return res.data.message;
    } catch (error) {
        handleApiError(error, dispatch, fetchPermissionFailure);

    }
}