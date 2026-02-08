import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizs: [],        // all Quizs
    singleQuiz: null, // single Quiz detail
    quizLoading: false,
    error: null,
};

const QuizsSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {

        // FETCH ALL USER QuizS
        fetchQuizsStart: (state) => {
            state.quizLoading = true;
            state.error = null;
        },
        fetchQuizsSuccess: (state, { payload }) => {
            state.quizLoading = false;
            state.quizs = payload;
        },
        fetchQuizsFailure: (state, action) => {
            state.quizLoading = false;
            state.error = action.payload;
        },

        // FETCH SINGLE Quiz
        fetchSingleQuizStart: (state) => {
            state.quizLoading = true;
            state.error = null;
        },
        fetchSingleQuizSuccess: (state, { payload }) => {
            state.quizLoading = false;
            state.singleQuiz = payload;
        },
        fetchSingleQuizFailure: (state, action) => {
            state.quizLoading = false;
            state.error = action.payload;
        },

        // CREATE Quiz
        createQuizStart: (state) => {
            state.quizLoading = true;
            state.error = null;
        },
        createQuizSuccess: (state, { payload }) => {
            state.quizLoading = false;
            state.quizs.push(payload);
        },
        createQuizFailure: (state, action) => {
            state.quizLoading = false;
            state.error = action.payload;
        },

        // CLEAR Quiz STATE
        clearQuizState: (state) => {
            state.singleQuiz = null;
            state.error = null;
        }
    }
});

export const {
    fetchQuizsStart,
    fetchQuizsSuccess,
    fetchQuizsFailure,
    fetchSingleQuizStart,
    fetchSingleQuizSuccess,
    fetchSingleQuizFailure,
    createQuizStart,
    createQuizSuccess,
    createQuizFailure,
    clearQuizState
} = QuizsSlice.actions;

export default QuizsSlice.reducer;
