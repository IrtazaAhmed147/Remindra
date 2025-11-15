import { foodItemFetchFailure, foodItemFetchStart, foodItemFetchSuccess } from "../slices/foodSlice";
import api from '../../utils/common.js'

export const getAllfoodItems = (id) => async (dispatch) => {

    try {

        dispatch(foodItemFetchStart())
        const res = await api.get(`/restaurant/dishes/${id}`, {
            withCredentials: true
        })
        console.log(res.data.data);
        dispatch(foodItemFetchSuccess(res.data.data))


    } catch (error) {
        console.log(error);
        dispatch(foodItemFetchFailure())
    }
}