import api from "../../utils/common.js";
import { handleApiError } from "../../utils/HelperFunctions.js";
import {
    fetchQuizsStart,
    fetchQuizsSuccess,
    fetchQuizsFailure,
    fetchSingleQuizStart,
    fetchSingleQuizSuccess,
    fetchSingleQuizFailure,
    createQuizStart,
    createQuizSuccess,
    createQuizFailure,
} from "../slices/quizSlice.js";

// CREATE Quiz
export const createQuizAction = (courseId, QuizData) => async (dispatch) => {

    try {
        dispatch(createQuizStart());

        const token = localStorage.getItem("token");

        const res = await api.post(`/quiz/create/course/${courseId}`, QuizData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });

        dispatch(createQuizSuccess(res.data.data));
        return res.data.message;

    } catch (error) {
        handleApiError(error, dispatch, createQuizFailure);
    }
};

// GET USER QuizS
export const getUserQuizsAction = (query) => async (dispatch) => {
    try {
        dispatch(fetchQuizsStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/quiz`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            params: query
        });

        dispatch(fetchQuizsSuccess(res.data.data));
        return res.data.data;

    } catch (error) {
        handleApiError(error, dispatch, fetchQuizsFailure);
    }
};

// GET SINGLE Quiz
export const getSingleQuizAction = (id) => async (dispatch) => {
    try {
        dispatch(fetchSingleQuizStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/quiz/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchSingleQuizSuccess(res.data.data));
        return res.data.data;

    } catch (error) {
        handleApiError(error, dispatch, fetchSingleQuizFailure);
    }
};

// DELETE Quiz
export const deleteQuizAction = (id, courseId) => async (dispatch) => {
    try {
        dispatch(fetchQuizsStart());

        const token = localStorage.getItem("token");

        const res = await api.delete(`/quiz/${id}/course/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        // Remove deleted Quiz from state manually
        dispatch(getUserQuizsAction({}));

        return res.data.message;

    } catch (error) {
        handleApiError(error, dispatch, fetchQuizsFailure);
    }
};

// UPDATE Quiz
export const updateQuizAction = (id, QuizData) => async (dispatch) => {

    try {
        dispatch(createQuizStart());

        const token = localStorage.getItem("token");

        const res = await api.put(`/quiz/${id}`, QuizData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });

        dispatch(createQuizSuccess(res.data.data));
        return res.data.message;

    } catch (error) {
        handleApiError(error, dispatch, createQuizFailure);
    }
};
