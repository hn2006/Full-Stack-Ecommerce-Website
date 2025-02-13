import axios from "axios";
import { ADD_SHIPPING_INFO, ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, CLEAR_CART_ERRORS, REMOVE_ALL_ITEMS_FROM_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCart = (productId, quantity) => async (dispatch) => {

    try {

        const { data } = await axios.get(`/products/${productId}`);

        console.log(data);

        const item = {
            id: data.product._id,
            name: data.product.name,
            price: data.product.price,
            quantity: quantity,
            stock:data.product.stock
        }

        dispatch({

            type: ADD_TO_CART_SUCCESS,
            payload: item,
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: ADD_TO_CART_FAIL,
            payload: error.response.data.error.message

        })
    }
}
export const clearCartErrors = () => async (dispatch) => {


    dispatch({

        type: CLEAR_CART_ERRORS
    })

}

export const removeFromCart = (productId) => async (dispatch) => {


    dispatch({

        type: REMOVE_FROM_CART,
        payload: productId,
        message: 'Item removed from cart!!'
    })

}
export const removeallitemsFromCart = (productId) => async (dispatch) => {


    dispatch({

        type: REMOVE_ALL_ITEMS_FROM_CART,
    })

}
export const addshippinginfo = (shippingData) => async (dispatch) => {


    dispatch({

        type: ADD_SHIPPING_INFO,
        payload:shippingData
    })

}