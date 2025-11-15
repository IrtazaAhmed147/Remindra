import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import restaurantSlice from './slices/restaurantSlice'
import foodSlice from './slices/foodSlice'
import cartSlice from './slices/cartSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        restaurant: restaurantSlice,
        food: foodSlice,
        cart: cartSlice,
    }
})

export default store