import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_DETAILS_FAIL, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";


export const createOrder = (order) => async (dispatch) => {

    console.log(order);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.error.message,
    });
  }
};

export const getOrder = (orderID) => async (dispatch) => {
try {
  dispatch({ type: GET_ORDER_DETAILS_REQUEST });

  const { data } = await axios.get(`/order/getOrder/${orderID}`);

  dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: data });
} catch (error) {
  dispatch({
    type: GET_ORDER_DETAILS_FAIL,
    payload: error.response.data.error.message,
  });
}
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};