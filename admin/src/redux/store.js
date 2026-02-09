import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import dashboardSlice from './slices/dashboardSlice'
import userSlice from './slices/userSlice'
import courseSlice from './slices/courseSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
        users: userSlice,
        courses: courseSlice,
    }
})

export default store