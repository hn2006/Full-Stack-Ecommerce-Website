import { USER_REQUEST, USER_SUCCESS, USER_FAIL, CLEAR_USER_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, ADMIN_USERS_FAIL, ADMIN_USER_ROLE_UPDATE } from '../constants/userConstants'
import { ADMIN_ORDERS_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS, CLEAR_ERRORS, USER_ORDERS_FAIL, USER_ORDERS_REQUEST, USER_ORDERS_SUCCESS } from '../constants/userOrdersConstants';

const defaultStage = {};

export const userReducer = (state = defaultStage, actions) => {

    switch (actions.type) {

        case USER_REQUEST: {

            return {
                loading: true,
                isauthenticated: false,
            }
        }
        case USER_SUCCESS: {

            return {

                loading: false,
                isauthenticated: true,
                user: actions.payload.user,
                message: 'logged in successfully'
            }
        }
        case USER_FAIL: {

            return {
                loading: false,
                isauthenticated: false,
                error: actions.payload
            }
        }

        case REGISTER_USER_REQUEST: {

            return {
                loading: true,
                isauthenticated: false,
            }
        }
        case REGISTER_USER_SUCCESS: {

            return {

                loading: false,
                isauthenticated: true,
                user: actions.payload.user
            }
        }
        case REGISTER_USER_FAIL: {

            return {
                loading: false,
                isauthenticated: false,
                error: actions.payload
            }
        }

        case LOAD_USER_REQUEST: {

            return {
                loading: true,
                isauthenticated: false,
            }
        }
        case LOAD_USER_SUCCESS: {

            return {
                loading: false,
                isauthenticated: true,
                user: actions.payload.user
            }
        }
        case LOAD_USER_FAIL: {

            return {
                loading: false,
                isauthenticated: false,
                error: actions.payload
            }
        }
        case LOGOUT_USER_SUCCESS: {

            return {

                isauthenticated: false,
                user: undefined,
                message: 'logout successful'
            }
        }
        case LOGOUT_USER_FAIL: {

            return {

                isauthenticated: true,
                error: 'logout failed'
            }
        }

        case UPDATE_USER_REQUEST: {

            return {
                loading: true,
                isauthenticated: false,
            }
        }
        case UPDATE_USER_SUCCESS: {

            return {

                loading: false,
                isauthenticated: true,
                user: actions.payload.user,
                message: 'updated user successfully'
            }
        }
        case UPDATE_USER_FAIL: {

            return {
                loading: false,
                isauthenticated: false,
                error: actions.payload
            }
        }

        case CHANGE_PASSWORD_REQUEST: {

            return {
                ...state,
                loading: true,
            }
        }
        case CHANGE_PASSWORD_SUCCESS: {

            return {

                ...state,
                loading: false,
                message: 'password updated successfully',
            }
        }
        case CHANGE_PASSWORD_FAIL: {

            return {
                ...state,
                loading: false,
                error: actions.payload
            }
        }


        case CLEAR_USER_ERRORS: {

            return {

                ...state,
                error: undefined,
                message: undefined

            }
        }


        default: {

            console.log('default is called')

            return { ...state };
        }
    }


};

export const userOrdersReducer = (state = {}, actions) => {

    switch (actions.type) {

        case USER_ORDERS_REQUEST: {

            return {

                ...state,
                loading: true

            }
        }
        case USER_ORDERS_SUCCESS: {

            return {

                ...state,
                loading: false,
                orders: actions.payload.order

            }
        }
        case USER_ORDERS_FAIL: {

            return {

                ...state,
                loading: false,
                error: actions.payload

            }
        }

        case ADMIN_ORDERS_REQUEST: {

            return {

                ...state,
                loading: true

            }
        }
        case ADMIN_ORDERS_SUCCESS: {

            return {

                ...state,
                loading: false,
                orders: actions.payload.order

            }
        }
        case ADMIN_ORDERS_FAIL: {

            return {

                ...state,
                loading: false,
                error: actions.payload

            }
        }




        case CLEAR_ERRORS: {

            return {

                ...state,
                error: undefined,

            }
        }


        default: {

            console.log('default is called')

            return { ...state };
        }
    }


};

export const adminUsersReducer = (state = {}, actions) => {

    switch (actions.type) {

        case ADMIN_USERS_REQUEST: {

            return {

                ...state,
                loading: true

            }
        }
        case ADMIN_USERS_SUCCESS: {

            return {

                ...state,
                loading: false,
                users: actions.payload.users

            }
        }
        case ADMIN_USERS_FAIL: {

            return {

                ...state,
                loading: false,
                error: actions.payload

            }
        }
        case ADMIN_USER_ROLE_UPDATE: {

            const newUsers=[...state.users].map((user)=>{

                if(user._id===actions.id){

                    return {...user,role:'admin'}
                }

                return user;

            })

            return {

                ...state,
                loading: false,
                users: newUsers

            }
        }

        case CLEAR_ERRORS: {

            return {

                ...state,
                error: undefined,

            }
        }
        default: {

            console.log('default is called')

            return { ...state };
        }
    }


};