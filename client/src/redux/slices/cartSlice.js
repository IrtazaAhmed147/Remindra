import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    carts: [],
    singlecart: {},
    cartLoading: false,
    cartError: false,
}
const cartSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        cartFetchStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        cartFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.carts = payload
        },
        singlecartFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.singlecart = payload
        },
        cartFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export const { cartFetchStart,
    cartFetchSuccess,
    cartFetchFailure,
    singlecartFetchSuccess,
} = cartSlice.actions
export default cartSlice.reducer