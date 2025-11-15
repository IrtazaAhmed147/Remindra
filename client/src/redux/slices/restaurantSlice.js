import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    restaurant: [],
    singleRestaurant: {},
    isLoading: false,
    error: false,
}
const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        restaurantFetchStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        restaurantFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.restaurant = payload
        },
        singleRestaurantFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.singleRestaurant = payload
        },
        restaurantFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export const { restaurantFetchStart,
    restaurantFetchSuccess,
    restaurantFetchFailure,
    singleRestaurantFetchSuccess,
} = restaurantSlice.actions
export default restaurantSlice.reducer