import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_RESET, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_RESET, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET } from '../constants/productConstants'

const defaultStage = {};

export const productReducer = (state = defaultStage, actions) => {

    switch (actions.type) {

        case ALL_PRODUCT_REQUEST: {

            return {
                ...state,
                loading: true,
            }
        }
        case ALL_PRODUCT_SUCCESS: {

            return {
                ...state,
                loading: false,
                product: actions.payload.product,
                productCount: actions.payload.count
            }
        }
        case ALL_PRODUCT_FAIL: {

            return {
                ...state,
                loading: false,
                error: actions.payload
            }
        }

        case ADMIN_PRODUCT_REQUEST: {

            return {
                ...state,
                loading: true,
            }
        }
        case ADMIN_PRODUCT_SUCCESS: {

            return {
                ...state,
                loading: false,
                product: actions.payload.products,
            }
        }
        case ADMIN_PRODUCT_FAIL: {

            return {

                loading: false,
                error: actions.payload
            }
        }

        case ADMIN_PRODUCT_DELETE_REQUEST: {

            return {
                ...state,
                loading: true,
            }
        }
        case ADMIN_PRODUCT_DELETE_SUCCESS: {

            return {
                ...state,
                isdeleted:true,
                loading: false,
                message:'product deleted successfully'
            }
        }
        case ADMIN_PRODUCT_DELETE_FAIL: {

            return {
                ...state,
                loading: false,
                error: actions.payload
            }
        }
        case ADMIN_PRODUCT_RESET:{

            return{

                ...state,
                isdeleted:undefined,
                message:undefined

            }
        }

        case CLEAR_ERRORS: {

            return {

                ...state,
                error: null

            }
        }

        default: {

            console.log('default is called')

            return { ...state };
        }
    }


};

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
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



export const adminproductReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          updateError: action.payload,
        };
      case UPDATE_PRODUCT_RESET:
        return {
          ...state,
          isUpdated: false,
          product:undefined
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          updateError: null,
        };
      default:
        return state;
    }
  };
  