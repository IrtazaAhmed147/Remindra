import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    foodItems: [],
    singleFoodItem: {},
    isLoading: false,
    error: false,
}
const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        foodItemFetchStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        foodItemFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.foodItems = payload
        },
        singlefoodItemFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.singleFoodItem = payload
        },
        foodItemFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export const { foodItemFetchStart,
    foodItemFetchSuccess,
    foodItemFetchFailure,
    singlefoodItemFetchSuccess,
} = foodSlice.actions
export default foodSlice.reducer