import { restaurantFetchFailure, restaurantFetchStart, restaurantFetchSuccess, singleRestaurantFetchSuccess } from "../slices/restaurantSlice";
import api from '../../utils/common.js'

export const getAllrestaurants = (query) => async (dispatch) => {

    try {

        dispatch(restaurantFetchStart())
        const res = await api.get('/restaurant', {
            params: {
                name: query?.name
            }
        }, {
            withCredentials: true
        })
        console.log(res.data.data);
        dispatch(restaurantFetchSuccess(res.data.data))


    } catch (error) {
        console.log(error);
        dispatch(restaurantFetchFailure())
    }
}

export const getSingleRestaurant = (id)=> async (dispatch) => {
    try {
        dispatch(restaurantFetchStart())
        const res = await api.get(`/restaurant/single/${id}`, {
            withCredentials: true
        })
        console.log(res.data.data);
        dispatch(singleRestaurantFetchSuccess(res.data.data))

    } catch (error) {
        dispatch(restaurantFetchFailure())
    }
}