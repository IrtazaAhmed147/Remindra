import api from "../../utils/common.js";
import { handleApiError } from "../../utils/HelperFunctions.js";
import {
    fetchResourcesStart,
    fetchResourcesSuccess,
    fetchResourcesFailure,
    fetchSingleResourceStart,
    fetchSingleResourceSuccess,
    fetchSingleResourceFailure,
    createResourceStart,
    createResourceSuccess,
    createResourceFailure,
    deleteResourceStart,
    deleteResourceSuccess,
    deleteResourceFailure
} from "../slices/resourceSlice";

// UPLOAD RESOURCE
export const uploadResourceAction = (courseId, data) => async (dispatch) => {
    try {
        dispatch(createResourceStart());
        const token = localStorage.getItem("token");

        const res = await api.post(`/resource/course/${courseId}/`, data, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(createResourceSuccess(res.data.data));
        return res.data.message;
    } catch (error) {
        handleApiError(error, dispatch, createResourceFailure);
    }
};

// GET ALL RESOURCES (Admin)
export const getAllResourcesAction = () => async (dispatch) => {
    try {
        dispatch(fetchResourcesStart());
        const token = localStorage.getItem("token");

        const res = await api.get("/resource/all", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchResourcesSuccess(res.data.data));
        return res.data.data;
    } catch (error) {
        handleApiError(error, dispatch, fetchResourcesFailure);
    }
};

// GET RESOURCES OF A COURSE
export const getCourseResourcesAction = (courseId, type) => async (dispatch) => {
    try {
        dispatch(fetchResourcesStart());
        const token = localStorage.getItem("token");

        const res = await api.get(`/resource/courses/${courseId}/`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            params: { type }
        });

        dispatch(fetchResourcesSuccess(res.data.data));
        return res.data.data;
    } catch (error) {
        handleApiError(error, dispatch, fetchResourcesFailure);
    }
};

// GET SINGLE RESOURCE
export const getSingleResourceAction = (id) => async (dispatch) => {
    try {
        dispatch(fetchSingleResourceStart());
        const token = localStorage.getItem("token");

        const res = await api.get(`/resource/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchSingleResourceSuccess(res.data.data));
        return res.data.data;
    } catch (error) {
        handleApiError(error, dispatch, fetchSingleResourceFailure);
    }
};

// DELETE RESOURCE
export const deleteResourceAction = (id, courseId, type) => async (dispatch) => {

    try {
        dispatch(deleteResourceStart());
        const token = localStorage.getItem("token");

        const res = await api.delete(`/resource/${id}/course/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            params: { type }
        });

        dispatch(deleteResourceSuccess(id));
        return res.data.message;
    } catch (error) {
        handleApiError(error, dispatch, deleteResourceFailure);
    }
};
export const deleteAllResourceAction = (courseId) => async (dispatch) => {
    try {
        dispatch(deleteResourceStart());
        const token = localStorage.getItem("token");

        const res = await api.delete(`/resource/course/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(deleteResourceSuccess());
        return res.data.message;
    } catch (error) {
        handleApiError(error, dispatch, deleteResourceFailure);
    }
};
