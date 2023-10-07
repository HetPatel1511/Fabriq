import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../constants/orderConstatnts';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders/add/`, order, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message,
        });
    }
}
