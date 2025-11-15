import api from '../../utils/common.js'
import { cartFetchFailure, cartFetchStart, cartFetchSuccess, singlecartFetchSuccess } from '../slices/cartSlice.js';


export const addDishToCart = (quantity, dishId) => async (dispatch) => {

    try {
        console.log(quantity);
        console.log(dishId);

        dispatch(cartFetchStart())
        const res = await api.post(
            `/cart/add/`,
            { quantity, dishId }, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                withCredentials: true
            }
        );
        console.log(res.data.data);
        dispatch(cartFetchSuccess(res.data.data))


    } catch (error) {
        console.log(error);
        dispatch(cartFetchFailure())
    }
}
export const getCart = (id) => async (dispatch) => {
    console.log(id);

    try {

        dispatch(cartFetchStart())
        const res = await api.get(`/cart/single/${id}`, {
            withCredentials: true
        })
        console.log(res.data.data);
        dispatch(singlecartFetchSuccess(res.data.data))


    } catch (error) {
        console.log(error);
        dispatch(cartFetchFailure())
    }
}