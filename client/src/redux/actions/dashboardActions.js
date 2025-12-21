import { dashboardStatsFailure, dashboardStatsStart, dashboardStatsSuccess } from "../slices/dashboardSlice";
import api from "../../utils/common.js";

export const getStats = () => async (dispatch) => {
    try {
        dispatch(dashboardStatsStart());

        const token = localStorage.getItem("token");

        const res = await api.get(
            `/dashboard/stats`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );

        dispatch(dashboardStatsSuccess(res?.data?.data));
        return res.data.message;
    } catch (error) {
        console.log(error);

        dispatch(dashboardStatsFailure(error?.response?.data?.message));
        throw error.response.data.message;
    }
}