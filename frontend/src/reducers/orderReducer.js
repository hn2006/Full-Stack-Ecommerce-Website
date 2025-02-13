import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_DETAILS_FAIL, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case CREATE_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const getOrderDetails = (state = {}, action) => {
    switch (action.type) {
      case GET_ORDER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_ORDER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          orderDetails: action.payload.order,
        };
  
      case GET_ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };