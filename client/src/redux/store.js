import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import courseSlice from './slices/courseSlice'
import assignmentsSlice from './slices/assignmentsSlice'
import quizsSlice from './slices/quizSlice'
import resourceSlice from './slices/resourceSlice'
import inviteSlice from './slices/inviteSlice'
import dashboardSlice from './slices/dashboardSlice'
import settingSlice from './slices/settingSlice'
import notificationSlice from './slices/notificationSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        course: courseSlice,
        assignments: assignmentsSlice,
        resource: resourceSlice,
        quizs: quizsSlice,
        invite: inviteSlice,
        dashboard: dashboardSlice,
        setting: settingSlice,
        notification: notificationSlice,

    }
})

export default store