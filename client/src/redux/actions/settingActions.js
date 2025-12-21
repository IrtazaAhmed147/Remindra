import { fetchPermissionFailure, fetchPermissionStart, fetchPermissionSuccess } from "../slices/settingSlice";
import api from "../../utils/common.js";


export const subscribe = (data) => async (dispatch) => {
    try {
        dispatch(fetchPermissionStart());

        const token = localStorage.getItem("token");

        const res = await api.post(
            `/notification/subscribe`,
            { subscription: data },
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        console.log(res);
        

        dispatch(fetchPermissionSuccess(res?.data?.data));
        return res.data.message;
    } catch (error) {
        console.log(error);

        dispatch(fetchPermissionFailure(error?.response?.data?.message));
        throw error?.response?.data?.message;
    }
}