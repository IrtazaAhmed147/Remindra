import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: [],        // all assignments
    singleAssignment: null, // single assignment detail
    assignmentLoading: false,
    error: null,
};

const assignmentsSlice = createSlice({
    name: "assignment",
    initialState,
    reducers: {

        // FETCH ALL USER ASSIGNMENTS
        fetchAssignmentsStart: (state) => {
            state.assignmentLoading = true;
            state.error = null;
        },
        fetchAssignmentsSuccess: (state, { payload }) => {
            state.assignmentLoading = false;
            state.assignments = payload;
        },
        fetchAssignmentsFailure: (state, action) => {
            state.assignmentLoading = false;
            state.error = action.payload;
        },

        // FETCH SINGLE ASSIGNMENT
        fetchSingleAssignmentStart: (state) => {
            state.assignmentLoading = true;
            state.error = null;
        },
        fetchSingleAssignmentSuccess: (state, { payload }) => {
            state.assignmentLoading = false;
            state.singleAssignment = payload;
        },
        fetchSingleAssignmentFailure: (state, action) => {
            state.assignmentLoading = false;
            state.error = action.payload;
        },

        // CREATE ASSIGNMENT
        createAssignmentStart: (state) => {
            state.assignmentLoading = true;
            state.error = null;
        },
        createAssignmentSuccess: (state, { payload }) => {
            state.assignmentLoading = false;
            state.assignments.push(payload);
        },
        createAssignmentFailure: (state, action) => {
            state.assignmentLoading = false;
            state.error = action.payload;
        },

        // CLEAR ASSIGNMENT STATE
        clearAssignmentState: (state) => {
            state.singleAssignment = null;
            state.error = null;
        }
    }
});

export const {
    fetchAssignmentsStart,
    fetchAssignmentsSuccess,
    fetchAssignmentsFailure,
    fetchSingleAssignmentStart,
    fetchSingleAssignmentSuccess,
    fetchSingleAssignmentFailure,
    createAssignmentStart,
    createAssignmentSuccess,
    createAssignmentFailure,
    clearAssignmentState
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
