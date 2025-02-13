import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERRORS, ADD_REVIEW, DASHBOARD_DETAILS_REQUEST, DASHBOARD_DETAILS_SUCCESS, DASHBOARD_DETAILS_FAIL, RESET_PRODUCT_DETAILS } from '../constants/productDetailsConstants'

const defaultStage = { product: {} };

export const productDetailsReducer = (state = defaultStage, actions) => {

    switch (actions.type) {

        case PRODUCT_DETAILS_REQUEST: {

            return {
                loading: true
            }
        }
        case PRODUCT_DETAILS_SUCCESS: {

            return {

                loading: false,
                product: actions.payload.product,
            }
        }
        case PRODUCT_DETAILS_FAIL: {

            return {

                loading: false,
                error: actions.payload
            }
        }
        case RESET_PRODUCT_DETAILS: {

            return {

                loading: false,
                product:undefined
            }
        }
        case ADD_REVIEW: {

            return {

                ...state,
                product: actions.payload

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

export const dashboardDetailsReducer = (state = {}, actions) => {

    switch (actions.type) {

        case DASHBOARD_DETAILS_REQUEST: {

            return {
                loading: true
            }
        }
        case DASHBOARD_DETAILS_SUCCESS: {

            return {

                loading: false,
                dashboardData: actions.payload.dashboardData,
            }
        }
        case DASHBOARD_DETAILS_FAIL: {

            return {

                loading: false,
                error: actions.payload
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