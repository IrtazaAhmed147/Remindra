import { dashboardStatsFailure, dashboardStatsStart, dashboardStatsSuccess } from "../slices/dashboardSlice";
import api from "../../utils/common.js";
import { handleApiError } from "../../utils/HelperFunctions.js";

export const getStats = () => async (dispatch) => {
    try {
        dispatch(dashboardStatsStart());

        const token = localStorage.getItem("token");

        const res = await api.get(
            `/admin/stats/all`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );


        dispatch(dashboardStatsSuccess(res?.data?.data));
        return res.data.message;
    } catch (error) {

        handleApiError(error, dispatch, dashboardStatsFailure);
    }
}