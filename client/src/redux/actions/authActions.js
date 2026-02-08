import api from '../../utils/common.js'
import { handleApiError, notify } from '../../utils/HelperFunctions.js'
import { loginFailure, loginStart, loginSuccess, signupStart, signupSuccess, signupFailure, otpSuccess, userReset } from "../slices/authSlice"


export const registerUser = (credentials) => async (dispatch) => {


    try {
        dispatch(signupStart())

        const res = await api.post('/auth/signup', credentials, {
            withCredentials: true
        })

        localStorage.setItem('tempToken', res.data.data.token)
        if (res.data.success) {
            dispatch(signupSuccess())
        }
        return res.data.message
    } catch (error) {
        handleApiError(error, dispatch, signupFailure);
    }
}

export const loginUser = (credentials) => async (dispatch) => {

    try {
        dispatch(loginStart())

        const res = await api.post('/auth/login', credentials, {
            withCredentials: true
        })

        if (res?.data?.data?.tempToken) {

            localStorage.setItem("tempToken", res?.data?.data?.tempToken)
            dispatch(otpSuccess())
            return { msg: res.data.message, url: "otp" }

        } else {

            localStorage.setItem("token", res?.data?.token)

            dispatch(loginSuccess(res?.data.data))
            return { msg: res.data.message, url: "dashboard" }
        }
    } catch (error) {
        console.log(error);
        
        handleApiError(error, dispatch, loginFailure);
    }
}

export const forgotPassAction = (email) => async (dispatch) => {

    try {
        dispatch(loginStart())

        const res = await api.post('/auth/forgotPassword', { email: email }, {

            withCredentials: true
        })



        // localStorage.setItem("token", res?.data?.token)
        dispatch(otpSuccess())
        return res.data.message

    } catch (error) {
        handleApiError(error, dispatch, loginFailure);
    }
}

export const resetPassAction = (ceredentials) => async (dispatch) => {

    try {
        dispatch(loginStart())
        const res = await api.post('/auth/resetPassword', ceredentials, {
            withCredentials: true
        })
        dispatch(otpSuccess())
        return res.data.message

    } catch (error) {
        handleApiError(error, dispatch, loginFailure);
    }
}
export const fetchLoggedInUser = () => async (dispatch) => {
    try {
        dispatch(loginStart());

        const token = localStorage.getItem("token");

        const res = await api.get("/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });


        dispatch(loginSuccess(res.data.data));

    } catch (error) {
        console.log(error);

        if (
            error.response &&
            (error.response.status === 401 ||
                error.response.data?.message === "Token expired or invalid")
        ) {
            localStorage.removeItem("token");
            dispatch(userReset());
            return;
        }
        notify("error", "Network Error");
        dispatch(loginFailure("Network error"));

    }
};
