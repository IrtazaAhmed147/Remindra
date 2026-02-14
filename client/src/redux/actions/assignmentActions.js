import api from "../../utils/common.js";
import { handleApiError } from "../../utils/HelperFunctions.js";
import {
    fetchAssignmentsStart,
    fetchAssignmentsSuccess,
    fetchAssignmentsFailure,
    fetchSingleAssignmentStart,
    fetchSingleAssignmentSuccess,
    fetchSingleAssignmentFailure,
    createAssignmentStart,
    createAssignmentSuccess,
    createAssignmentFailure,
} from "../slices/assignmentsSlice.js";

// CREATE ASSIGNMENT
export const createAssignmentAction = ( assignmentData) => async (dispatch) => {
    try {
        dispatch(createAssignmentStart());

        const token = localStorage.getItem("token");

        const res = await api.post(`/assignment/create`, assignmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });

        dispatch(createAssignmentSuccess(res.data.data));
        return res.data.message;

    } catch (error) {
         handleApiError(error, dispatch, createAssignmentFailure);
    }
};

// GET USER ASSIGNMENTS
export const getUserAssignmentsAction = (query) => async (dispatch) => {
    try {
        dispatch(fetchAssignmentsStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/assignment`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            params: query
        });
        
        dispatch(fetchAssignmentsSuccess(res?.data?.data));
        return res?.data?.data;

    } catch (error) {
         handleApiError(error, dispatch, fetchAssignmentsFailure);
    }
};

// GET SINGLE ASSIGNMENT
export const getSingleAssignmentAction = (id) => async (dispatch) => {
    try {
        dispatch(fetchSingleAssignmentStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/assignment/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchSingleAssignmentSuccess(res.data.data));
        return res.data.data;

    } catch (error) {
         handleApiError(error, dispatch, fetchSingleAssignmentFailure);
    }
};

// DELETE ASSIGNMENT
export const deleteAssignmentAction = (id, courseId) => async (dispatch) => {
    try {
        dispatch(fetchAssignmentsStart());

        const token = localStorage.getItem("token");

        const res = await api.delete(`/assignment/${id}/course/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        // Remove deleted assignment from state manually
        dispatch(getUserAssignmentsAction({}));

        return res.data.message;

    } catch (error) {
         handleApiError(error, dispatch, fetchAssignmentsFailure);
    }
};

// UPDATE ASSIGNMENT
export const updateAssignmentAction = (id, assignmentData) => async (dispatch) => {
    
    try {
        dispatch(createAssignmentStart());

        const token = localStorage.getItem("token");

        const res = await api.put(`/assignment/${id}`, assignmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });

        dispatch(createAssignmentSuccess(res.data.data));
        return res.data.message;

    } catch (error) {
         handleApiError(error, dispatch, createAssignmentFailure);
    }
};
